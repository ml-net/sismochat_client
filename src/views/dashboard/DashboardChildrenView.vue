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
        <span class="text-white">{{ child.nick }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { fetchChildren, createChild, type Child } from '../../services/children'
import { ApiRequestError } from '../../services/api'

const { t } = useI18n()
const children = ref<Child[]>([])
const loading = ref(true)
const nick = ref('')
const adding = ref(false)
const error = ref('')

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
</script>
