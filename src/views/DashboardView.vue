<template>
  <div class="min-h-screen bg-gray-950 p-8">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-white">
        {{ t('dashboard.title') }}
      </h1>
      <button
        class="text-sm text-gray-400 hover:text-red-400 transition-colors"
        @click="onLogout"
      >
        {{ t('dashboard.logout') }}
      </button>
    </div>
    <p class="text-gray-500">
      {{ t('dashboard.placeholder') }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

function onLogout() {
  authStore.clearAuth()
  void router.replace('/login')
}
</script>
