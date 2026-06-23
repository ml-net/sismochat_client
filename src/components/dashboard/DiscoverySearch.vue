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
      <button
        v-if="!myChildren.length"
        type="button"
        class="ml-2 underline text-red-300 hover:text-white"
        @click="loadMyChildren"
      >
        {{ t('dashboard.connections.discovery.retry') }}
      </button>
    </p>

    <p
      v-if="success"
      class="text-green-400 text-sm mb-4"
    >
      {{ success }}
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
        class="space-y-2"
      >
        <li
          v-for="child in children"
          :key="child.id"
          class="flex items-center justify-between rounded bg-white/5 px-3 py-2"
        >
          <span class="text-white text-sm">{{ child.nick }}</span>
          <div class="flex items-center gap-2">
            <select
              v-model="selectedChild[child.id]"
              class="px-2 py-1 rounded bg-white/10 border border-gray-600 text-white text-sm focus:outline-none focus:border-secondary-light"
            >
              <option
                value=""
                disabled
              >
                {{ t('dashboard.connections.discovery.selectChild') }}
              </option>
              <option
                v-for="mine in myChildren"
                :key="mine.id"
                :value="mine.id"
              >
                {{ mine.nick }}
              </option>
            </select>
            <button
              type="button"
              :disabled="!selectedChild[child.id] || sending"
              class="px-2 py-1 rounded bg-primary text-white text-sm disabled:opacity-50"
              @click="onConnect(child.id)"
            >
              {{ t('dashboard.connections.discovery.connect') }}
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, inject } from 'vue'
import { useI18n } from 'vue-i18n'
import { searchParent, fetchParentChildren, type DiscoveredParent, type DiscoveredChild } from '../../services/discovery'
import { fetchChildren, type Child } from '../../services/children'
import { sendConnectionRequest } from '../../services/connections'
import { ApiRequestError } from '../../services/api'

const { t } = useI18n()
const refreshConnections = inject<() => Promise<void>>('refreshConnections')
const email = ref('')
const searching = ref(false)
const sending = ref(false)
const error = ref('')
const success = ref('')
const found = ref<DiscoveredParent | null>(null)
const children = ref<DiscoveredChild[]>([])
const myChildren = ref<Child[]>([])
const selectedChild = reactive<Record<number, number | ''>>({})

onMounted(async () => {
  await loadMyChildren()
})

async function loadMyChildren() {
  try {
    myChildren.value = await fetchChildren()
    error.value = ''
  } catch {
    error.value = t('dashboard.connections.discovery.loadChildrenError')
  }
}

async function onSearch() {
  if (!email.value.trim()) return
  error.value = ''
  success.value = ''
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

async function onConnect(toChildId: number) {
  const fromChildId = selectedChild[toChildId]
  if (!fromChildId) return
  error.value = ''
  success.value = ''
  sending.value = true
  try {
    await sendConnectionRequest(fromChildId, toChildId)
    success.value = t('dashboard.connections.discovery.requestSent')
    email.value = ''
    found.value = null
    children.value = []
    Object.keys(selectedChild).forEach(k => { selectedChild[Number(k)] = '' })
    await refreshConnections?.()
  } catch (e) {
    if (e instanceof ApiRequestError && e.errCode === 11) {
      error.value = t('dashboard.connections.discovery.alreadyExists')
    } else {
      error.value = t('dashboard.connections.discovery.connectError')
    }
  } finally {
    sending.value = false
  }
}
</script>
