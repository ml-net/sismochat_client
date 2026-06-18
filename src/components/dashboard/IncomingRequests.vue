<template>
  <div>
    <h3 class="text-lg font-semibold text-white mb-3">
      {{ t('dashboard.connections.incoming.title') }}
    </h3>

    <p
      v-if="loading"
      class="text-gray-400 text-sm"
    >
      {{ t('dashboard.connections.incoming.loading') }}
    </p>

    <p
      v-else-if="!error && !requests.length"
      class="text-gray-400 text-sm"
    >
      {{ t('dashboard.connections.incoming.empty') }}
    </p>

    <p
      v-if="error"
      class="text-red-400 text-sm mb-2"
      role="alert"
    >
      {{ error }}
    </p>

    <ul
      v-if="requests.length"
      class="space-y-2"
    >
      <li
        v-for="req in requests"
        :key="req.id"
        class="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3"
      >
        <span class="text-white text-sm">
          {{ t('dashboard.connections.incoming.request', { from: resolveName(req.from), to: resolveName(req.to) }) }}
        </span>
        <div class="flex gap-2">
          <button
            type="button"
            :disabled="processing"
            class="px-2 py-1 rounded bg-green-600 text-white text-sm disabled:opacity-50"
            @click="onAccept(req.id)"
          >
            {{ t('dashboard.connections.incoming.accept') }}
          </button>
          <button
            type="button"
            :disabled="processing"
            class="px-2 py-1 rounded bg-red-600 text-white text-sm disabled:opacity-50"
            @click="onReject(req.id)"
          >
            {{ t('dashboard.connections.incoming.reject') }}
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchPendingApprovals, acceptConnection, rejectConnection, type ConnectionRequest } from '../../services/connections'
import { ApiRequestError } from '../../services/api'

const props = defineProps<{ nickMap: Record<number, string> }>()

const { t } = useI18n()
const requests = ref<ConnectionRequest[]>([])
const loading = ref(true)
const processing = ref(false)
const error = ref('')

function resolveName(id: number): string {
  return props.nickMap[id] ?? `#${id}`
}

async function loadRequests() {
  requests.value = await fetchPendingApprovals()
}

onMounted(async () => {
  try {
    await loadRequests()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.connections.incoming.loadError')
  } finally {
    loading.value = false
  }
})

async function onAccept(connId: number) {
  error.value = ''
  processing.value = true
  try {
    await acceptConnection(connId)
    await loadRequests()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.connections.incoming.actionError')
  } finally {
    processing.value = false
  }
}

async function onReject(connId: number) {
  error.value = ''
  processing.value = true
  try {
    await rejectConnection(connId)
    await loadRequests()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.connections.incoming.actionError')
  } finally {
    processing.value = false
  }
}
</script>
