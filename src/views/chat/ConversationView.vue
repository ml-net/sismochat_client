<template>
  <div class="flex-1 flex flex-col">
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
    <main class="flex-1 overflow-y-auto p-4 space-y-3">
      <p class="text-gray-500 text-sm text-center">
        {{ t('chat.conversation.empty') }}
      </p>
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
          :disabled="!message.trim()"
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const message = ref('')

const contactId = computed(() => route.params.contactId as string)
const contactNick = computed(() => route.query.nick as string || contactId.value)
const contactInitial = computed(() => contactNick.value.charAt(0).toUpperCase())

function onSend() {
  if (!message.value.trim()) return
  // TODO: implement in messaging service story
  message.value = ''
}
</script>
