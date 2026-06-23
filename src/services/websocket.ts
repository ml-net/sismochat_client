import { ref } from 'vue'
import { API_BASE } from './api'

export type WsEvent = { type: string; [key: string]: unknown }
export type WsEventHandler = (event: WsEvent) => void

const MAX_RECONNECT_DELAY = 30000
const INITIAL_RECONNECT_DELAY = 1000

export const connected = ref(false)

let ws: WebSocket | null = null
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
let reconnectDelay = INITIAL_RECONNECT_DELAY
let token: string | null = null
let handlers: WsEventHandler[] = []
let intentionalClose = false

function getWsUrl(): string {
  const base = API_BASE.replace(/^http/, 'ws')
  return `${base}/ws?token=${token}`
}

export function onWsEvent(handler: WsEventHandler) {
  handlers.push(handler)
  return () => { handlers = handlers.filter(h => h !== handler) }
}

export function connectWs(jwt: string) {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return
  token = jwt
  intentionalClose = false
  open()
}

export function disconnectWs() {
  intentionalClose = true
  if (reconnectTimer) { clearTimeout(reconnectTimer); reconnectTimer = null }
  if (ws) { ws.close(); ws = null }
  connected.value = false
}

function open() {
  if (!token) return
  try { ws = new WebSocket(getWsUrl()) } catch { scheduleReconnect(); return }

  ws.onopen = () => {
    connected.value = true
    reconnectDelay = INITIAL_RECONNECT_DELAY
  }

  ws.onmessage = (ev) => {
    let data: WsEvent
    try { data = JSON.parse(ev.data as string) as WsEvent } catch { return }
    if (data.type === 'ping') return // server heartbeat, no action needed
    handlers.forEach(h => h(data))
  }

  ws.onclose = () => {
    connected.value = false
    ws = null
    if (!intentionalClose) scheduleReconnect()
  }

  ws.onerror = () => {
    // onclose will fire after onerror
  }
}

function scheduleReconnect() {
  if (reconnectTimer) return
  reconnectTimer = setTimeout(() => {
    reconnectTimer = null
    reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY)
    open()
  }, reconnectDelay)
}
