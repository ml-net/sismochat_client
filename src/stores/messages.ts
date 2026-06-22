import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchUnread, fetchMessage, sendMessage, ackMessage } from '../services/messages'
import type { Message } from '../services/messages'

const STORAGE_KEY = 'sismochat_messages'

export interface StoredMessage {
  id: number
  from: string
  to: string
  body: string
  type: string
  timestamp: string
  mine: boolean
}

export const useMessageStore = defineStore('messages', () => {
  // Map: contactId -> StoredMessage[]
  const conversations = ref<Record<string, StoredMessage[]>>({})

  const currentUserId = ref<string>('')

  function hydrate(userId: string) {
    currentUserId.value = userId
    const stored = localStorage.getItem(`${STORAGE_KEY}_${userId}`)
    if (stored) {
      try { conversations.value = JSON.parse(stored) as Record<string, StoredMessage[]> }
      catch { conversations.value = {} }
    } else {
      conversations.value = {}
    }
  }

  function persist() {
    if (!currentUserId.value) return
    localStorage.setItem(`${STORAGE_KEY}_${currentUserId.value}`, JSON.stringify(conversations.value))
  }

  function addMessage(contactId: string, msg: StoredMessage) {
    if (!conversations.value[contactId]) conversations.value[contactId] = []
    // Avoid duplicates
    if (conversations.value[contactId].some(m => m.id === msg.id)) return
    conversations.value[contactId].push(msg)
    conversations.value[contactId].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    persist()
  }

  function getMessages(contactId: string): StoredMessage[] {
    return conversations.value[contactId] || []
  }

  const lastMessageByContact = computed(() => {
    const result: Record<string, StoredMessage> = {}
    for (const [contactId, msgs] of Object.entries(conversations.value)) {
      if (msgs.length) result[contactId] = msgs[msgs.length - 1]
    }
    return result
  })

  async function send(to: string, body: string, type = 'user') {
    const res = await sendMessage(to, body, type)
    const msg: StoredMessage = {
      id: res.messageID,
      from: currentUserId.value,
      to,
      body,
      type,
      timestamp: new Date().toISOString(),
      mine: true,
    }
    addMessage(to, msg)
    return res
  }

  async function relay() {
    let items
    try { items = await fetchUnread() }
    catch { return }

    for (const item of items) {
      let full: Message
      try { full = await fetchMessage(item.msgID) }
      catch { continue }

      const contactId = full.from === currentUserId.value ? full.to : full.from
      const msg: StoredMessage = {
        id: full.id,
        from: full.from,
        to: full.to,
        body: full.body,
        type: full.type,
        timestamp: full.createdAt,
        mine: full.from === currentUserId.value,
      }
      addMessage(contactId, msg)

      try { await ackMessage(full.id) }
      catch { /* will retry next cycle */ }
    }
  }

  function removeMessage(contactId: string, msgId: number) {
    if (!conversations.value[contactId]) return
    conversations.value[contactId] = conversations.value[contactId].filter(m => m.id !== msgId)
    persist()
  }

  function clear() {
    conversations.value = {}
    if (currentUserId.value) localStorage.removeItem(`${STORAGE_KEY}_${currentUserId.value}`)
  }

  return { conversations, currentUserId, hydrate, send, relay, getMessages, lastMessageByContact, addMessage, removeMessage, clear }
})
