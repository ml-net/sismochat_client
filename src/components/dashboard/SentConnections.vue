<template>
  <div>
    <h3 class="text-lg font-semibold text-white mb-3">
      {{ t('dashboard.connections.sent.title') }}
    </h3>

    <p
      v-if="loading"
      class="text-gray-400 text-sm"
    >
      {{ t('dashboard.connections.sent.loading') }}
    </p>

    <p
      v-else-if="!requests.length"
      class="text-gray-400 text-sm"
    >
      {{ t('dashboard.connections.sent.empty') }}
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
        <div class="flex items-center gap-2">
          <span class="text-white text-sm">
            {{ t('dashboard.connections.sent.connection', { from: resolveName(req.from), to: resolveName(req.to) }) }}
          </span>
          <span
            class="text-xs px-2 py-0.5 rounded"
            :class="statusClass(req.status)"
          >
            {{ statusLabel(req.status) }}
          </span>
        </div>
        <button
          v-if="req.status === ConnectionStatus.ACCEPTED"
          type="button"
          :disabled="removing"
          class="text-gray-400 hover:text-red-400 text-sm disabled:opacity-50"
          @click="confirmRemove(req)"
        >
          {{ t('dashboard.connections.sent.remove') }}
        </button>
      </li>
    </ul>

    <!-- Remove confirmation dialog -->
    <div
      v-if="removingReq"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      @click.self="cancelRemove"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
        <p class="text-white mb-4">
          {{ t('dashboard.connections.sent.removeConfirm') }}
        </p>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300"
            @click="cancelRemove"
          >
            {{ t('dashboard.connections.sent.cancel') }}
          </button>
          <button
            type="button"
            :disabled="removing"
            class="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-50"
            @click="onRemove"
          >
            {{ t('dashboard.connections.sent.remove') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchSentRequests, removeConnection, ConnectionStatus, type ConnectionRequest } from '../../services/connections'
import { ApiRequestError } from '../../services/api'

const props = defineProps<{ nickMap: Record<number, string> }>()

const { t } = useI18n()
const requests = ref<ConnectionRequest[]>([])
const loading = ref(true)
const removing = ref(false)
const error = ref('')
const removingReq = ref<ConnectionRequest | null>(null)

function resolveName(id: number): string {
  return props.nickMap[id] ?? `#${id}`
}

async function loadRequests() {
  requests.value = await fetchSentRequests()
}

onMounted(async () => {
  try {
    await loadRequests()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.connections.sent.loadError')
  } finally {
    loading.value = false
  }
})

function statusClass(status: number): string {
  if (status === ConnectionStatus.ACCEPTED) return 'bg-green-900 text-green-300'
  if (status === ConnectionStatus.REQUESTED) return 'bg-yellow-900 text-yellow-300'
  return 'bg-red-900 text-red-300'
}

function statusLabel(status: number): string {
  if (status === ConnectionStatus.ACCEPTED) return t('dashboard.connections.sent.accepted')
  if (status === ConnectionStatus.REQUESTED) return t('dashboard.connections.sent.pending')
  return t('dashboard.connections.sent.rejected')
}

function confirmRemove(req: ConnectionRequest) {
  removingReq.value = req
}

function cancelRemove() {
  removingReq.value = null
}

async function onRemove() {
  if (!removingReq.value) return
  error.value = ''
  removing.value = true
  try {
    await removeConnection(removingReq.value.id)
    removingReq.value = null
    await loadRequests()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.connections.sent.removeError')
    removingReq.value = null
  } finally {
    removing.value = false
  }
}
</script>
