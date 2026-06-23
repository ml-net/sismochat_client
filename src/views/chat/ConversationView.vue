<template>
  <div class="flex-1 flex flex-col min-h-0">
    <!-- Header -->
    <header class="flex items-center gap-3 px-4 py-3 bg-gray-900/80 border-b border-emerald-500/20">
      <router-link
        :to="{ name: 'chat-contacts' }"
        class="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        :aria-label="t('chat.conversation.back')"
      >
        ←
      </router-link>
      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-400 flex items-center justify-center text-white text-sm font-bold">
        {{ contactInitial }}
      </div>
      <div>
        <p class="text-white font-semibold text-sm">
          {{ contactNick }}
        </p>
      </div>
    </header>

    <!-- Messages -->
    <main
      ref="messagesContainer"
      class="flex-1 min-h-0 overflow-y-auto p-4 space-y-3"
    >
      <p
        v-if="!messages.length"
        class="text-gray-500 text-sm text-center"
      >
        {{ t('chat.conversation.empty') }}
      </p>
      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex"
        :class="msg.mine ? 'justify-end' : 'justify-start'"
      >
        <div
          class="max-w-[75%] px-3 py-2 rounded-xl text-sm"
          :class="msg.mine ? 'bg-emerald-600/80 text-white rounded-br-sm' : 'bg-gray-800 text-gray-100 rounded-bl-sm'"
        >
          <p>{{ msg.body }}</p>
          <span class="block text-[10px] mt-1 opacity-60">{{ formatTime(msg.timestamp) }}</span>
        </div>
      </div>
    </main>

    <!-- Input bar -->
    <footer class="px-4 py-3 bg-gray-900/80 border-t border-emerald-500/20">
      <form
        class="flex items-center gap-3"
        @submit.prevent="onSend"
      >
        <input
          v-model="message"
          type="text"
          :placeholder="t('chat.conversation.placeholder')"
          class="flex-1 px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all"
        >
        <button
          type="submit"
          :disabled="!message.trim() || sending"
          class="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all disabled:opacity-40"
        >
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMessageStore } from '../../stores/messages'

const { t } = useI18n()
const route = useRoute()
const messageStore = useMessageStore()
const message = ref('')
const sending = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const contactId = computed(() => route.params.contactId as string)
const contactNick = computed(() => route.query.nick as string || contactId.value)
const contactInitial = computed(() => contactNick.value.charAt(0).toUpperCase())
const messages = computed(() => messageStore.getMessages(contactId.value))

function formatTime(ts: string): string {
  const d = new Date(ts)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function scrollToBottom() {
  void nextTick(() => {
    if (messagesContainer.value) messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })
}

watch(messages, scrollToBottom, { deep: true })

async function onSend() {
  const body = message.value.trim()
  if (!body || sending.value) return
  message.value = ''
  sending.value = true
  try { await messageStore.send(contactId.value, body) }
  catch { /* TODO: show error toast */ }
  finally { sending.value = false }
}
</script>
