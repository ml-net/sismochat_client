<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
    <!-- Animated background blobs -->
    <div class="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full blur-3xl animate-pulse bg-[var(--theme-glow)]" />
    <div class="absolute bottom-[-20%] right-[-10%] w-96 h-96 rounded-full blur-3xl animate-pulse [animation-delay:1s] bg-[var(--theme-glow-secondary)]" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl animate-pulse [animation-delay:2s] bg-[var(--theme-glow)]" />

    <!-- Card -->
    <div class="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-surface-border)] shadow-[0_0_40px_var(--theme-glow)]">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
// Auth layout — wraps all authentication pages
</script>
