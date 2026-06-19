<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors"
    :class="isActive ? 'text-[var(--theme-primary)] bg-[var(--theme-surface-light)]' : 'text-gray-400 hover:text-gray-200 hover:bg-[var(--theme-surface-light)]'"
  >
    <span class="text-lg">{{ icon }}</span>
    <span>{{ label }}</span>
    <span
      v-if="badge"
      class="ml-auto inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-red-600 text-white text-xs font-bold"
    >
      {{ badge }}
    </span>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, type RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to: RouteLocationRaw
  icon: string
  label: string
  badge?: number
}>()

const route = useRoute()
const isActive = computed(() => {
  const target = typeof props.to === 'object' && 'name' in props.to ? props.to.name : ''
  return route.name === target
})
</script>
