<template>
  <div class="h-screen flex flex-col bg-[#313338]">
    <!-- Header -->
    <header class="flex items-center gap-3 px-4 py-3 bg-[#2b2d31] border-b border-[#1e1f22]">
      <div class="w-9 h-9 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-sm font-bold">
        M
      </div>
      <div>
        <p class="text-white font-semibold text-sm">
          Marco
        </p>
        <p class="text-green-400 text-xs">
          Online
        </p>
      </div>
    </header>

    <!-- Messages -->
    <main class="flex-1 overflow-y-auto p-4 space-y-3">
      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[#2b2d31] text-gray-200 text-sm">
          Ehi, ci sei stasera per giocare? 🎮
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-[#5865F2] text-white text-sm max-w-[75%]">
          Sì! Alle 9 sono online 💪
        </div>
      </div>

      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[#2b2d31] text-gray-200 text-sm">
          Perfetto, chiamo anche Luca e Sara
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-[#5865F2] text-white text-sm max-w-[75%]">
          Top! 🔥 Io porto il team
        </div>
      </div>

      <!-- Received -->
      <div class="flex gap-2 max-w-[75%]">
        <div class="px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[#2b2d31] text-gray-200 text-sm">
          Ahaha sei sempre il solito 😂
        </div>
      </div>

      <!-- Sent -->
      <div class="flex justify-end">
        <div class="px-4 py-2.5 rounded-2xl rounded-tr-sm bg-[#5865F2] text-white text-sm max-w-[75%]">
          Ma certo 😎 A dopo!
        </div>
      </div>
    </main>

    <!-- Input bar -->
    <footer class="px-4 py-3 bg-[#2b2d31] border-t border-[#1e1f22]">
      <div class="flex items-center gap-3">
        <input
          type="text"
          placeholder="Scrivi un messaggio..."
          class="flex-1 px-4 py-2.5 rounded-lg bg-[#383a40] border-none text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition-all"
        >
        <button class="w-10 h-10 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] flex items-center justify-center transition-colors">
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
