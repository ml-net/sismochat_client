<template>
  <div class="h-screen flex flex-col relative overflow-hidden bg-[#0f0f23]">
    <!-- Background blobs -->
    <div class="absolute top-0 left-0 w-64 h-64 bg-fuchsia-600/30 rounded-full blur-3xl" />
    <div class="absolute bottom-0 right-0 w-72 h-72 bg-blue-600/30 rounded-full blur-3xl" />
    <div class="absolute top-1/2 left-1/2 w-48 h-48 bg-emerald-500/15 rounded-full blur-2xl" />

    <!-- Header -->
    <header class="relative z-10 flex items-center gap-3 px-4 py-3 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
        M
      </div>
      <div>
        <p class="text-white font-semibold text-sm">
          Marco
        </p>
        <p class="text-emerald-300/70 text-xs">
          online
        </p>
      </div>
    </header>

    <!-- Messages -->
    <main class="relative z-10 flex-1 overflow-y-auto p-4 space-y-3">
      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm backdrop-blur-md bg-white/5 border border-white/10 text-white/90 text-sm">
          Ehi, ci sei stasera per giocare? 🎮
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm backdrop-blur-md bg-fuchsia-500/20 border border-fuchsia-400/20 text-white text-sm max-w-[75%]">
          Sì! Alle 9 sono online 💪
        </div>
      </div>

      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm backdrop-blur-md bg-white/5 border border-white/10 text-white/90 text-sm">
          Perfetto, chiamo anche Luca e Sara
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm backdrop-blur-md bg-fuchsia-500/20 border border-fuchsia-400/20 text-white text-sm max-w-[75%]">
          Top! 🔥 Io porto il team
        </div>
      </div>

      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm backdrop-blur-md bg-white/5 border border-white/10 text-white/90 text-sm">
          Ahaha sei sempre il solito 😂
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm backdrop-blur-md bg-fuchsia-500/20 border border-fuchsia-400/20 text-white text-sm max-w-[75%]">
          Ma certo 😎 A dopo!
        </div>
      </div>
    </main>

    <!-- Input bar -->
    <footer class="relative z-10 px-4 py-3 backdrop-blur-xl bg-white/5 border-t border-white/10">
      <div class="flex items-center gap-3">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          class="flex-1 px-4 py-2.5 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-fuchsia-400/40 focus:bg-white/10 transition-all"
        >
        <button class="w-10 h-10 rounded-xl bg-gradient-to-r from-fuchsia-500/80 to-blue-500/80 border border-white/10 flex items-center justify-center hover:scale-105 transition-transform">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          /></svg>
        </button>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Pure visual spike — no logic
</script>
