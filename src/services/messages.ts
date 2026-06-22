import { apiGet, apiPost, apiDelete } from './api'

export interface MessageListItem {
  msgID: number
  from: string
  type: string
}

export interface Message {
  id: number
  from: string
  to: string
  body: string
  type: string
  status: number
  createdAt: string
}

export function fetchUnread(): Promise<MessageListItem[]> {
  return apiGet<MessageListItem[]>('/api/v1/messages/list/0')
}

export function fetchMessage(msgID: number): Promise<Message> {
  return apiGet<Message>(`/api/v1/messages/${msgID}`)
}

export function sendMessage(to: string, message: string, type = 'user'): Promise<{ messageID: number }> {
  return apiPost<{ messageID: number }>('/api/v1/messages/', { to, message, type })
}

export function ackMessage(msgID: number): Promise<void> {
  return apiDelete<void>(`/api/v1/messages/${msgID}`)
}
