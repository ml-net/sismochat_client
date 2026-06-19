<template>
  <div class="flex-1 flex flex-col">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 py-3 bg-gray-900/80 border-b border-emerald-500/20">
      <h1 class="text-xl font-bold text-white drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
        {{ APP_NAME }}
      </h1>
      <router-link
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
          :to="{ name: 'chat-conversation', params: { contactId: contact.id } }"
          class="flex items-center gap-3 px-4 py-3 hover:bg-gray-800/40 transition-colors"
        >
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-400 flex items-center justify-center text-white font-bold">
            {{ initial(contact.nick) }}
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-white font-semibold text-sm truncate">
              {{ contact.nick }}
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

interface Contact {
  id: string
  nick: string
}

const { t } = useI18n()
const contacts = ref<Contact[]>([])
const loading = ref(true)

function initial(nick: string): string {
  return nick.charAt(0).toUpperCase()
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
