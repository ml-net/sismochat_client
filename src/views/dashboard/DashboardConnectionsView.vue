<template>
  <div class="space-y-8">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold text-white">
        {{ t('dashboard.connections.title') }}
      </h2>
      <button
        type="button"
        :disabled="refreshing"
        class="px-3 py-1.5 rounded-lg bg-white/10 text-gray-300 hover:bg-white/20 text-sm disabled:opacity-50"
        @click="refresh"
      >
        {{ t('dashboard.connections.refresh') }}
      </button>
    </div>

    <IncomingRequests
      :key="refreshKey"
      :nick-map="nickMap"
    />
    <SentConnections
      :key="refreshKey"
      :nick-map="nickMap"
    />
    <DiscoverySearch />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchChildren, type Child } from '../../services/children'
import DiscoverySearch from '../../components/dashboard/DiscoverySearch.vue'
import IncomingRequests from '../../components/dashboard/IncomingRequests.vue'
import SentConnections from '../../components/dashboard/SentConnections.vue'

const { t } = useI18n()
const refreshKey = ref(0)
const refreshing = ref(false)
const nickMap = ref<Record<number, string>>({})

async function loadNickMap() {
  try {
    const children: Child[] = await fetchChildren()
    nickMap.value = Object.fromEntries(children.map((c) => [c.id, c.nick]))
  } catch {
    // non-blocking — fallback to IDs
  }
}

async function refresh() {
  refreshing.value = true
  await loadNickMap()
  refreshKey.value++
  refreshing.value = false
}

onMounted(loadNickMap)
</script>
