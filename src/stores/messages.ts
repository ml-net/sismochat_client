import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { openDB, type IDBPDatabase } from 'idb'
import { fetchUnread, fetchMessage, sendMessage, ackMessage } from '../services/messages'
import type { Message } from '../services/messages'
import { encrypt, decrypt, fetchPublicKey, loadPrivateKey } from '../services/crypto'
import i18n from '../i18n'

const DB_PREFIX = 'sismochat_messages_'
const STORE_NAME = 'messages'
const LEGACY_PREFIX = 'sismochat_messages_'

export interface StoredMessage {
  id: number
  contactId: string
  from: string
  to: string
  body: string
  type: string
  timestamp: string
  mine: boolean
}

async function getDb(userId: string): Promise<IDBPDatabase> {
  return openDB(`${DB_PREFIX}${userId}`, 1, {
    upgrade(db) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      store.createIndex('by-contact', 'contactId')
    },
  })
}

export const useMessageStore = defineStore('messages', () => {
  const conversations = ref<Record<string, StoredMessage[]>>({})
  const currentUserId = ref<string>('')
  let db: IDBPDatabase | null = null

  async function hydrate(userId: string) {
    currentUserId.value = userId
    db = await getDb(userId)

    // Migrate from localStorage if legacy data exists
    const legacyKey = `${LEGACY_PREFIX}${userId}`
    const legacy = localStorage.getItem(legacyKey)
    if (legacy) {
      try {
        const data = JSON.parse(legacy) as Record<string, StoredMessage[]>
        const tx = db.transaction(STORE_NAME, 'readwrite')
        for (const [contactId, msgs] of Object.entries(data)) {
          for (const msg of msgs) {
            await tx.store.put({ ...msg, contactId })
          }
        }
        await tx.done
      } catch { /* ignore corrupt legacy data */ }
      localStorage.removeItem(legacyKey)
    }

    // Load all messages from IndexedDB
    const all = await db.getAll(STORE_NAME)
    const grouped: Record<string, StoredMessage[]> = {}
    for (const msg of all) {
      const m = msg as StoredMessage
      if (!grouped[m.contactId]) grouped[m.contactId] = []
      grouped[m.contactId].push(m)
    }
    for (const msgs of Object.values(grouped)) {
      msgs.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    }
    conversations.value = grouped
  }

  async function persistMessage(msg: StoredMessage) {
    if (!db) return
    await db.put(STORE_NAME, msg)
  }

  async function addMessage(contactId: string, msg: Omit<StoredMessage, 'contactId'>) {
    if (!conversations.value[contactId]) conversations.value[contactId] = []
    if (conversations.value[contactId].some(m => m.id === msg.id)) return
    const stored: StoredMessage = { ...msg, contactId }
    conversations.value[contactId].push(stored)
    conversations.value[contactId].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    await persistMessage(stored)
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
    let payload = body
    if (type === 'user') {
      const pubKey = await fetchPublicKey(to)
      payload = await encrypt(body, pubKey)
    }
    const res = await sendMessage(to, payload, type)
    const msg = {
      id: res.messageID,
      from: currentUserId.value,
      to,
      body,
      type,
      timestamp: new Date().toISOString(),
      mine: true,
    }
    await addMessage(to, msg)
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
      let body = full.body
      if (full.type === 'user') {
        const privKey = loadPrivateKey(currentUserId.value)
        if (privKey) {
          try { body = await decrypt(full.body, privKey) }
          catch { body = i18n.global.t('chat.message.encrypted') }
        } else {
          body = i18n.global.t('chat.message.encrypted')
        }
      }
      const msg = {
        id: full.id,
        from: full.from,
        to: full.to,
        body,
        type: full.type,
        timestamp: full.createdAt,
        mine: full.from === currentUserId.value,
      }
      await addMessage(contactId, msg)

      try { await ackMessage(full.id) }
      catch { /* will retry next cycle */ }
    }
  }

  async function removeMessage(contactId: string, msgId: number) {
    if (!conversations.value[contactId]) return
    conversations.value[contactId] = conversations.value[contactId].filter(m => m.id !== msgId)
    if (db) await db.delete(STORE_NAME, msgId)
  }

  async function clear() {
    conversations.value = {}
    if (db) {
      const tx = db.transaction(STORE_NAME, 'readwrite')
      await tx.store.clear()
      await tx.done
    }
  }

  return { conversations, currentUserId, hydrate, send, relay, getMessages, lastMessageByContact, addMessage, removeMessage, clear }
})
