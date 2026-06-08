<template>
  <div class="h-screen flex flex-col bg-gray-950">
    <!-- Header -->
    <header class="flex items-center gap-3 px-4 py-3 bg-gray-900/80 border-b border-emerald-500/20">
      <div class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-500 to-blue-400 flex items-center justify-center text-white text-sm font-bold">
        M
      </div>
      <div>
        <p class="text-white font-semibold text-sm">
          Marco
        </p>
        <p class="text-blue-400 text-xs">
          online
        </p>
      </div>
    </header>

    <!-- Messages -->
    <main class="flex-1 overflow-y-auto p-4 space-y-3">
      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-gray-800/80 border border-gray-700/50 text-gray-200 text-sm">
          Ehi, ci sei stasera per giocare? 🎮
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-emerald-600/80 to-green-600/80 border border-emerald-500/30 text-white text-sm max-w-[75%] shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          Sì! Alle 9 sono online 💪
        </div>
      </div>

      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-gray-800/80 border border-gray-700/50 text-gray-200 text-sm">
          Perfetto, chiamo anche Luca e Sara
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-emerald-600/80 to-green-600/80 border border-emerald-500/30 text-white text-sm max-w-[75%] shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          Top! 🔥 Io porto il team
        </div>
      </div>

      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-gray-800/80 border border-gray-700/50 text-gray-200 text-sm">
          Ahaha sei sempre il solito 😂
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-gradient-to-r from-emerald-600/80 to-green-600/80 border border-emerald-500/30 text-white text-sm max-w-[75%] shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          Ma certo 😎 A dopo!
        </div>
      </div>
    </main>

    <!-- Input bar -->
    <footer class="px-4 py-3 bg-gray-900/80 border-t border-emerald-500/20">
      <div class="flex items-center gap-3">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          class="flex-1 px-4 py-2.5 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_10px_rgba(59,130,246,0.2)] transition-all"
        >
        <button class="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all">
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
