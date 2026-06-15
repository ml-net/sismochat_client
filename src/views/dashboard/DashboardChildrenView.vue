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
              class="text-gray-400 hover:text-red-400 text-sm"
              @click="confirmDelete(child)"
            >
              {{ t('dashboard.children.delete') }}
            </button>
          </div>
        </template>
      </li>
    </ul>

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
import { ApiRequestError } from '../../services/api'

const { t } = useI18n()
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

async function loadChildren() {
  children.value = await fetchChildren()
}

onMounted(async () => {
  try {
    await loadChildren()
  } finally {
    loading.value = false
  }
})

async function onAdd() {
  error.value = ''
  adding.value = true
  try {
    await createChild(nick.value.trim())
    nick.value = ''
    await loadChildren()
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
</script>
