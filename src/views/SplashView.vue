<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden">
    <!-- Background glow -->
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl animate-pulse"
      :style="{ backgroundColor: 'var(--theme-glow)' }"
    />

    <!-- Branding -->
    <div class="relative z-10 text-center">
      <h1 class="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
        {{ APP_NAME }}
      </h1>
      <p class="text-gray-400 text-sm">
        {{ t('splash.tagline') }}
      </p>
    </div>

    <!-- Parent login link -->
    <router-link
      to="/login"
      class="relative z-10 mt-12 text-sm text-secondary-light hover:text-secondary transition-colors"
    >
      {{ t('splash.parentLogin') }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../constants'
import { useAuthStore } from '../stores/auth'
import { authenticateDevice } from '../services/deviceAuth'

const router = useRouter()
const { t } = useI18n()
let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timer = setTimeout(() => {
    void bootRedirect()
  }, 2500)
})

async function bootRedirect() {
  try {
    const profile = localStorage.getItem('sismochat_profile')
    if (!profile) {
      void router.replace('/login')
      return
    }
    const parsed = JSON.parse(profile) as { role?: string; id?: string; deviceId?: string; nick?: string }
    if (parsed.role === '__parent__') {
      void router.replace({ name: 'dashboard-home' })
    } else if (parsed.role === 'child' && parsed.id && parsed.deviceId) {
      try {
        const jwt = await authenticateDevice({ role: 'child', id: parsed.id, nick: parsed.nick ?? '', deviceId: parsed.deviceId })
        const authStore = useAuthStore()
        authStore.setChildToken(jwt)
        void router.replace('/chat')
      } catch {
        localStorage.removeItem('sismochat_profile')
        void router.replace('/login')
      }
    } else {
      void router.replace('/login')
    }
  } catch {
    void router.replace('/login')
  }
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>
