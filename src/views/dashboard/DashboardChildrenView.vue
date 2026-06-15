<template>
  <div>
    <h2 class="text-xl font-bold text-white mb-4">
      {{ t('dashboard.children.title') }}
    </h2>

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
import { fetchChildren, type Child } from '../../services/children'

const { t } = useI18n()
const children = ref<Child[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    children.value = await fetchChildren()
  } finally {
    loading.value = false
  }
})
</script>
