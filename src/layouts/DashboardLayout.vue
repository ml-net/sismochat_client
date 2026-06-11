<template>
  <div class="min-h-screen flex bg-gray-950">
    <!-- Desktop sidebar -->
    <aside class="hidden md:flex md:flex-col md:w-64 border-r border-[var(--theme-surface-border)] bg-[var(--theme-surface)]">
      <div class="p-6 border-b border-[var(--theme-surface-border)]">
        <h1 class="text-lg font-bold text-white">
          {{ APP_NAME }}
        </h1>
      </div>
      <nav class="flex-1 p-4 space-y-1">
        <SidebarLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          :icon="item.icon"
          :label="t(item.labelKey)"
        />
      </nav>
      <div class="p-4 border-t border-[var(--theme-surface-border)]">
        <SidebarLink
          :to="{ name: 'chat' }"
          icon="💬"
          :label="t('dashboard.nav.chat')"
        />
        <button
          class="mt-2 w-full text-left px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 transition-colors"
          @click="onLogout"
        >
          {{ t('dashboard.nav.logout') }}
        </button>
      </div>
    </aside>

    <!-- Main content -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Mobile header -->
      <header class="md:hidden flex items-center justify-between p-4 border-b border-[var(--theme-surface-border)] bg-[var(--theme-surface)]">
        <h1 class="text-lg font-bold text-white">
          {{ APP_NAME }}
        </h1>
        <button
          class="text-sm text-gray-400 hover:text-red-400 transition-colors"
          @click="onLogout"
        >
          {{ t('dashboard.nav.logout') }}
        </button>
      </header>

      <main class="flex-1 p-6 overflow-y-auto">
        <router-view />
      </main>

      <!-- Mobile bottom nav -->
      <nav class="md:hidden flex border-t border-[var(--theme-surface-border)] bg-[var(--theme-surface)]">
        <router-link
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex-1 flex flex-col items-center py-3 text-xs transition-colors"
          :class="$route.name === item.name ? 'text-[var(--theme-primary)]' : 'text-gray-400 hover:text-gray-200'"
        >
          <span class="text-lg">{{ item.icon }}</span>
          <span class="mt-1">{{ t(item.labelKey) }}</span>
        </router-link>
        <router-link
          :to="{ name: 'chat' }"
          class="flex-1 flex flex-col items-center py-3 text-xs transition-colors"
          :class="$route.name === 'chat' ? 'text-[var(--theme-primary)]' : 'text-gray-400 hover:text-gray-200'"
        >
          <span class="text-lg">💬</span>
          <span class="mt-1">{{ t('dashboard.nav.chat') }}</span>
        </router-link>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { APP_NAME } from '../constants'
import SidebarLink from '../components/dashboard/SidebarLink.vue'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const navItems = [
  { name: 'dashboard-home', to: { name: 'dashboard-home' }, icon: '🏠', labelKey: 'dashboard.nav.home' },
  { name: 'dashboard-children', to: { name: 'dashboard-children' }, icon: '👶', labelKey: 'dashboard.nav.children' },
  { name: 'dashboard-connections', to: { name: 'dashboard-connections' }, icon: '🔗', labelKey: 'dashboard.nav.connections' },
  { name: 'dashboard-settings', to: { name: 'dashboard-settings' }, icon: '⚙️', labelKey: 'dashboard.nav.settings' },
]

function onLogout() {
  authStore.clearAuth()
  void router.replace({ name: 'login' })
}
</script>
