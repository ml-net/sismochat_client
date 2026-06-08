<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-gray-300 mb-1.5"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      :disabled="disabled"
      :aria-describedby="error ? `${id}-error` : undefined"
      :aria-invalid="!!error"
      class="w-full px-4 py-3 rounded-xl bg-[var(--theme-surface-light)] border border-gray-700 text-white placeholder-gray-500 transition-all duration-300 focus:outline-none focus:border-secondary-light focus:shadow-[0_0_12px_var(--theme-glow-secondary)] disabled:opacity-50 disabled:cursor-not-allowed"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
    <p
      v-if="error"
      :id="`${id}-error`"
      class="mt-1.5 text-sm text-red-400"
      role="alert"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label?: string
  type?: string
  placeholder?: string
  modelValue?: string
  error?: string
  disabled?: boolean
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
