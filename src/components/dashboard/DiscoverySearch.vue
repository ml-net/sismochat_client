<template>
  <div>
    <h3 class="text-lg font-semibold text-white mb-3">
      {{ t('dashboard.connections.discovery.title') }}
    </h3>

    <form
      class="flex gap-2 mb-4"
      @submit.prevent="onSearch"
    >
      <input
        v-model="email"
        type="email"
        :placeholder="t('dashboard.connections.discovery.placeholder')"
        :disabled="searching"
        class="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-light"
      >
      <button
        type="submit"
        :disabled="searching || !email.trim()"
        class="px-4 py-2 rounded-lg bg-primary text-white font-medium disabled:opacity-50"
      >
        {{ t('dashboard.connections.discovery.search') }}
      </button>
    </form>

    <p
      v-if="error"
      class="text-red-400 text-sm mb-4"
      role="alert"
    >
      {{ error }}
    </p>

    <div
      v-if="found"
      class="rounded-lg bg-white/5 p-4"
    >
      <p class="text-white mb-3">
        {{ t('dashboard.connections.discovery.found', { email: found.email }) }}
      </p>

      <p
        v-if="!children.length"
        class="text-gray-400 text-sm"
      >
        {{ t('dashboard.connections.discovery.noChildren') }}
      </p>

      <ul
        v-else
        class="space-y-1"
      >
        <li
          v-for="child in children"
          :key="child.id"
          class="flex items-center justify-between rounded bg-white/5 px-3 py-2"
        >
          <span class="text-white text-sm">{{ child.nick }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { searchParent, fetchParentChildren, type DiscoveredParent, type DiscoveredChild } from '../../services/discovery'
import { ApiRequestError } from '../../services/api'

const { t } = useI18n()
const email = ref('')
const searching = ref(false)
const error = ref('')
const found = ref<DiscoveredParent | null>(null)
const children = ref<DiscoveredChild[]>([])

async function onSearch() {
  if (!email.value.trim()) return
  error.value = ''
  found.value = null
  children.value = []
  searching.value = true
  try {
    const parent = await searchParent(email.value.trim())
    if (!parent) {
      error.value = t('dashboard.connections.discovery.notFound')
      return
    }
    found.value = parent
    children.value = await fetchParentChildren(email.value.trim())
  } catch (e) {
    if (e instanceof ApiRequestError && e.errCode === 15) {
      error.value = t('dashboard.connections.discovery.rateLimited')
    } else {
      error.value = t('dashboard.connections.discovery.searchError')
    }
  } finally {
    searching.value = false
  }
}
</script>
