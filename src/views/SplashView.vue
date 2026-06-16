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

const router = useRouter()
const { t } = useI18n()
let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timer = setTimeout(() => {
    try {
      const profile = localStorage.getItem('sismochat_profile')
      if (profile) {
        const parsed = JSON.parse(profile) as { role?: string }
        if (parsed.role === '__parent__') {
          void router.replace({ name: 'dashboard-home' })
        } else {
          void router.replace('/chat')
        }
      } else {
        void router.replace('/login')
      }
    } catch {
      void router.replace('/login')
    }
  }, 2500)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>
