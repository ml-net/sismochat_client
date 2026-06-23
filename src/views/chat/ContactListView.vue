<template>
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-emerald-500/20">
      <div class="flex items-center gap-2">
        <h1 class="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
          {{ APP_NAME }}
        </h1>
        <span
          class="w-2.5 h-2.5 rounded-full"
          :class="connected ? 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]' : 'bg-gray-500'"
          :title="connected ? t('chat.status.online') : t('chat.status.offline')"
        />
      </div>
      <router-link
        v-if="!isChild"
        :to="{ name: 'dashboard-home' }"
        class="w-9 h-9 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center hover:border-blue-400/50 transition-colors"
        :aria-label="t('chat.backToDashboard')"
      >
        <span class="text-gray-400 text-sm">⚙️</span>
      </router-link>
    </header>

    <!-- Loading -->
    <p
      v-if="loading"
      class="flex-1 flex items-center justify-center text-gray-400 text-sm"
    >
      {{ t('chat.contacts.loading') }}
    </p>

    <!-- Empty -->
    <p
      v-else-if="!contacts.length"
      class="flex-1 flex items-center justify-center text-gray-400 text-sm px-4 text-center"
    >
      {{ t('chat.contacts.empty') }}
    </p>

    <!-- Contact list -->
    <main
      v-else
      class="flex-1 overflow-y-auto"
    >
      <div class="divide-y divide-gray-800/50">
        <router-link
          v-for="contact in contacts"
          :key="contact.id"
          :to="{ name: 'chat-conversation', params: { contactId: contact.id }, query: { nick: contact.nick } }"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/40 transition-colors"
        >
          <div class="relative w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-400 flex items-center justify-center text-white font-bold">
            {{ initial(contact.nick) }}
            <span
              v-if="unreadCount(contact.id)"
              class="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-bold"
            >{{ unreadCount(contact.id) }}</span>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white font-semibold text-sm truncate">
              {{ contact.nick }}
            </p>
            <p
              v-if="lastMessage(contact.id)"
              class="text-gray-400 text-xs truncate"
            >
              {{ lastMessage(contact.id) }}
            </p>
          </div>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../../constants'
import { apiGet } from '../../services/api'
import { useMessageStore } from '../../stores/messages'
import { connected } from '../../services/websocket'

interface Contact {
  id: string
  nick: string
}

const { t } = useI18n()
const messageStore = useMessageStore()
const contacts = ref<Contact[]>([])
const loading = ref(true)

const isChild = (() => {
  try {
    const profile = localStorage.getItem('sismochat_profile')
    if (!profile) return false
    return (JSON.parse(profile) as { role?: string }).role === 'child'
  } catch { return false }
})()

function initial(nick: string): string {
  return nick.charAt(0).toUpperCase()
}

function lastMessage(contactId: string): string {
  const msg = messageStore.lastMessageByContact[contactId]
  return msg ? msg.body : ''
}

function unreadCount(contactId: string): number {
  const msgs = messageStore.getMessages(contactId)
  return msgs.filter(m => !m.mine).length ? 0 : 0 // TODO: track read state in #124
}

onMounted(async () => {
  try {
    contacts.value = await apiGet<Contact[]>('/api/v1/connections/')
  } catch {
    // non-blocking
  } finally {
    loading.value = false
  }
})
</script>
