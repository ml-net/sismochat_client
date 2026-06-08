<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <h1 class="text-3xl font-bold mb-2">
      Design Spike — Visual Variants
    </h1>
    <p class="text-gray-400 mb-8">
      Click a variant to see it full-screen. Use browser back to return here.
    </p>

    <h2 class="text-xl font-semibold mb-4 text-purple-300">
      Login
    </h2>
    <div class="grid gap-4 max-w-md mb-10">
      <router-link
        to="/spike/dark-neon"
        class="block p-4 rounded-xl bg-gray-800 border border-purple-500/30 hover:border-purple-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          1. Dark + Neon
        </h3>
        <p class="text-sm text-gray-400">
          Dark background, purple/cyan glow accents, animated blobs
        </p>
      </router-link>

      <router-link
        to="/spike/glassmorphism"
        class="block p-4 rounded-xl bg-gray-800 border border-fuchsia-500/30 hover:border-fuchsia-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          2. Glassmorphism
        </h3>
        <p class="text-sm text-gray-400">
          Frosted glass card, colorful gradient blobs, translucent UI
        </p>
      </router-link>

      <router-link
        to="/spike/blurple"
        class="block p-4 rounded-xl bg-gray-800 border border-indigo-500/30 hover:border-indigo-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          3. Blurple
        </h3>
        <p class="text-sm text-gray-400">
          Discord-inspired, bold indigo/violet, clean and minimal
        </p>
      </router-link>
    </div>

    <h2 class="text-xl font-semibold mb-4 text-cyan-300">
      Chat
    </h2>
    <div class="grid gap-4 max-w-md mb-10">
      <router-link
        to="/spike/dark-neon-chat"
        class="block p-4 rounded-xl bg-gray-800 border border-purple-500/30 hover:border-purple-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          1. Dark + Neon
        </h3>
        <p class="text-sm text-gray-400">
          Dark bg, neon purple bubbles with glow, cyan accents
        </p>
      </router-link>

      <router-link
        to="/spike/glassmorphism-chat"
        class="block p-4 rounded-xl bg-gray-800 border border-fuchsia-500/30 hover:border-fuchsia-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          2. Glassmorphism
        </h3>
        <p class="text-sm text-gray-400">
          Glass bubbles on colorful backdrop, translucent everything
        </p>
      </router-link>

      <router-link
        to="/spike/blurple-chat"
        class="block p-4 rounded-xl bg-gray-800 border border-indigo-500/30 hover:border-indigo-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          3. Blurple
        </h3>
        <p class="text-sm text-gray-400">
          Discord-style, dark card bubbles, solid blurple sent messages
        </p>
      </router-link>
    </div>

    <h2 class="text-xl font-semibold mb-4 text-green-300">
      Chat List
    </h2>
    <div class="grid gap-4 max-w-md">
      <router-link
        to="/spike/dark-neon-list"
        class="block p-4 rounded-xl bg-gray-800 border border-purple-500/30 hover:border-purple-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          1. Dark + Neon
        </h3>
        <p class="text-sm text-gray-400">
          Neon gradients on avatars, glow badges, purple accents
        </p>
      </router-link>

      <router-link
        to="/spike/glassmorphism-list"
        class="block p-4 rounded-xl bg-gray-800 border border-fuchsia-500/30 hover:border-fuchsia-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          2. Glassmorphism
        </h3>
        <p class="text-sm text-gray-400">
          Glass navbar, colorful blobs behind, gradient avatars
        </p>
      </router-link>

      <router-link
        to="/spike/blurple-list"
        class="block p-4 rounded-xl bg-gray-800 border border-indigo-500/30 hover:border-indigo-400 transition-colors"
      >
        <h3 class="font-semibold text-lg">
          3. Blurple
        </h3>
        <p class="text-sm text-gray-400">
          Discord-style, clean dark list, red notification badges
        </p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// Spike index — no logic
</script>
