<template>
  <div>
    <h2 class="text-xl font-bold text-white mb-4">
      {{ t('dashboard.children.title') }}
    </h2>

    <form
      class="flex gap-2 mb-6"
      @submit.prevent="onAdd"
    >
      <input
        v-model="nick"
        type="text"
        :placeholder="t('dashboard.children.nickPlaceholder')"
        :disabled="adding"
        class="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-secondary-light"
      >
      <button
        type="submit"
        :disabled="adding || !nick.trim()"
        class="px-4 py-2 rounded-lg bg-primary text-white font-medium disabled:opacity-50"
      >
        {{ t('dashboard.children.add') }}
      </button>
    </form>

    <p
      v-if="error"
      class="text-red-400 text-sm mb-4"
      role="alert"
    >
      {{ error }}
    </p>

    <p
      v-if="loading"
      class="text-gray-400"
    >
      {{ t('dashboard.children.loading') }}
    </p>

    <p
      v-else-if="!children.length"
      class="text-gray-400"
    >
      {{ t('dashboard.children.empty') }}
    </p>

    <ul
      v-else
      class="space-y-2"
    >
      <li
        v-for="child in children"
        :key="child.id"
        class="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3"
      >
        <template v-if="editingId === child.id">
          <input
            v-model="editNick"
            type="text"
            class="flex-1 px-2 py-1 rounded bg-white/10 border border-gray-600 text-white focus:outline-none focus:border-secondary-light"
            @keyup.escape="cancelEdit"
            @keyup.enter="onSaveEdit(child.id)"
          >
          <div class="flex gap-1 ml-2">
            <button
              type="button"
              :disabled="saving || !editNick.trim()"
              class="px-2 py-1 rounded bg-primary text-white text-sm disabled:opacity-50"
              @click="onSaveEdit(child.id)"
            >
              {{ t('dashboard.children.save') }}
            </button>
            <button
              type="button"
              class="px-2 py-1 rounded bg-gray-700 text-gray-300 text-sm"
              @click="cancelEdit"
            >
              {{ t('dashboard.children.cancel') }}
            </button>
          </div>
        </template>
        <template v-else>
          <span class="text-white">{{ child.nick }}</span>
          <div class="flex gap-2">
            <button
              type="button"
              class="text-gray-400 hover:text-white text-sm"
              @click="startEdit(child)"
            >
              {{ t('dashboard.children.edit') }}
            </button>
            <button
              type="button"
              class="text-gray-400 hover:text-orange-400 text-sm"
              @click="confirmRevoke(child)"
            >
              {{ t('dashboard.children.revoke') }}
            </button>
            <button
              type="button"
              class="text-gray-400 hover:text-red-400 text-sm"
              @click="confirmDelete(child)"
            >
              {{ t('dashboard.children.delete') }}
            </button>
          </div>
        </template>
      </li>
    </ul>

    <!-- Revoke device confirmation dialog -->
    <div
      v-if="revokingChild"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      @click.self="cancelRevoke"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
        <p class="text-white mb-4">
          {{ t('dashboard.children.revokeConfirm', { name: revokingChild.nick }) }}
        </p>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300"
            @click="cancelRevoke"
          >
            {{ t('dashboard.children.cancel') }}
          </button>
          <button
            type="button"
            :disabled="revoking"
            class="px-4 py-2 rounded-lg bg-orange-600 text-white disabled:opacity-50"
            @click="onRevoke"
          >
            {{ t('dashboard.children.revoke') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Activate device dialog -->
    <div
      v-if="activatingChild"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      @click.self="dismissActivation"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
        <p class="text-white mb-4">
          {{ t('dashboard.children.activatePrompt', { name: activatingChild.nick }) }}
        </p>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300"
            @click="dismissActivation"
          >
            {{ t('dashboard.children.notNow') }}
          </button>
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-primary text-white"
            @click="activateDevice"
          >
            {{ t('dashboard.children.activate') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Delete confirmation dialog -->
    <div
      v-if="deletingChild"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      @click.self="cancelDelete"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg">
        <p class="text-white mb-4">
          {{ t('dashboard.children.deleteConfirm', { name: deletingChild.nick }) }}
        </p>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-lg bg-gray-700 text-gray-300"
            @click="cancelDelete"
          >
            {{ t('dashboard.children.cancel') }}
          </button>
          <button
            type="button"
            :disabled="deleting"
            class="px-4 py-2 rounded-lg bg-red-600 text-white disabled:opacity-50"
            @click="onDelete"
          >
            {{ t('dashboard.children.delete') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchChildren, createChild, updateChild, deleteChild, type Child } from '../../services/children'
import { provisionDevice, revokeDevice } from '../../services/devices'
import { ApiRequestError } from '../../services/api'
import { generateKeyPair, storePrivateKey } from '../../services/crypto'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const children = ref<Child[]>([])
const loading = ref(true)
const nick = ref('')
const adding = ref(false)
const error = ref('')
const editingId = ref<number | null>(null)
const editNick = ref('')
const saving = ref(false)
const deletingChild = ref<Child | null>(null)
const deleting = ref(false)
const activatingChild = ref<{ nick: string; id: number; deviceId: number } | null>(null)
const revokingChild = ref<Child | null>(null)
const revoking = ref(false)

async function loadChildren() {
  children.value = await fetchChildren()
}

onMounted(async () => {
  try {
    await loadChildren()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.children.loadError')
  } finally {
    loading.value = false
  }
})

async function onAdd() {
  if (!nick.value.trim()) return
  error.value = ''
  adding.value = true
  try {
    const trimmed = nick.value.trim()
    const keyPair = await generateKeyPair()
    const { ID } = await createChild(trimmed, keyPair.publicKey)
    let deviceId: number
    try {
      const result = await provisionDevice(ID)
      deviceId = result.deviceId
    } catch (e) {
      await deleteChild(ID)
      throw e
    }
    storePrivateKey(String(ID), keyPair.privateKey)
    nick.value = ''
    await loadChildren()
    activatingChild.value = { nick: trimmed, id: ID, deviceId }
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.children.addError')
  } finally {
    adding.value = false
  }
}

function startEdit(child: Child) {
  editingId.value = child.id
  editNick.value = child.nick
}

function cancelEdit() {
  editingId.value = null
  editNick.value = ''
}

async function onSaveEdit(id: number) {
  if (!editNick.value.trim()) return
  error.value = ''
  saving.value = true
  try {
    await updateChild(id, editNick.value.trim())
    editingId.value = null
    await loadChildren()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.children.editError')
  } finally {
    saving.value = false
  }
}

function confirmDelete(child: Child) {
  deletingChild.value = child
}

function cancelDelete() {
  deletingChild.value = null
}

async function onDelete() {
  if (!deletingChild.value) return
  error.value = ''
  deleting.value = true
  try {
    await deleteChild(deletingChild.value.id)
    deletingChild.value = null
    await loadChildren()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.children.deleteError')
    deletingChild.value = null
  } finally {
    deleting.value = false
  }
}

function dismissActivation() {
  activatingChild.value = null
}

function confirmRevoke(child: Child) {
  revokingChild.value = child
}

function cancelRevoke() {
  revokingChild.value = null
}

async function onRevoke() {
  if (!revokingChild.value) return
  error.value = ''
  revoking.value = true
  try {
    const revokedId = revokingChild.value.id
    await revokeDevice(revokedId)
    revokingChild.value = null
    // Wipe local child profile if this device belongs to the revoked child
    const profile = localStorage.getItem('sismochat_profile')
    const parsed = profile ? (JSON.parse(profile) as { role?: string; id?: number }) : null
    if (parsed?.role === 'child' && parsed.id === revokedId) {
      localStorage.removeItem('sismochat_profile')
    }
    await loadChildren()
  } catch (e) {
    error.value = e instanceof ApiRequestError
      ? e.errDesc
      : t('dashboard.children.revokeError')
    revokingChild.value = null
  } finally {
    revoking.value = false
  }
}

function activateDevice() {
  if (!activatingChild.value) return
  const { nick: childNick, id, deviceId } = activatingChild.value
  activatingChild.value = null
  authStore.clearAuth()
  localStorage.setItem('sismochat_profile', JSON.stringify({ role: 'child', id, nick: childNick, deviceId }))
  void router.replace({ name: 'splash' })
}
</script>
