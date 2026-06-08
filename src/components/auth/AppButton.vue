<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-primary-dark to-secondary transition-all duration-300 hover:from-primary hover:to-secondary-light shadow-[0_0_20px_var(--theme-glow)] hover:shadow-[0_0_30px_var(--theme-glow)] disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <span
      v-if="loading"
      class="inline-flex items-center gap-2"
    >
      <svg
        class="w-4 h-4 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {{ loadingText || 'Loading...' }}
    </span>
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  loadingText?: string
}>()
</script>
