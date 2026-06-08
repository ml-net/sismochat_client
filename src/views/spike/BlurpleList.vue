<template>
  <div class="h-screen flex flex-col bg-[#313338]">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 py-3 bg-[#2b2d31] border-b border-[#1e1f22]">
      <h1 class="text-xl font-bold text-white">
        SiSMoChat
      </h1>
      <button class="w-9 h-9 rounded-full bg-[#383a40] flex items-center justify-center hover:bg-[#404249] transition-colors">
        <svg
          class="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        /></svg>
      </button>
    </header>

    <!-- Chat list -->
    <main class="flex-1 overflow-y-auto">
      <div class="divide-y divide-[#1e1f22]/50">
        <!-- Chat item - unread -->
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#2b2d31] transition-colors cursor-pointer">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">
              M
            </div>
            <div class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#23a55a] border-2 border-[#313338]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <p class="text-white font-semibold text-sm truncate">
                Marco
              </p>
              <span class="text-[#00A8FC] text-xs">2min</span>
            </div>
            <p class="text-gray-400 text-sm truncate">
              Ma certo 😎 A dopo!
            </p>
          </div>
          <div class="w-5 h-5 rounded-full bg-[#f23f43] flex items-center justify-center">
            <span class="text-white text-xs font-bold">2</span>
          </div>
        </div>

        <!-- Chat item -->
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#2b2d31] transition-colors cursor-pointer">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#9b59b6] flex items-center justify-center text-white font-bold">
              S
            </div>
            <div class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#23a55a] border-2 border-[#313338]" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <p class="text-white font-semibold text-sm truncate">
                Sara
              </p>
              <span class="text-gray-500 text-xs">15min</span>
            </div>
            <p class="text-gray-500 text-sm truncate">
              Ti mando il link domani 👍
            </p>
          </div>
        </div>

        <!-- Chat item -->
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#2b2d31] transition-colors cursor-pointer">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#3498db] flex items-center justify-center text-white font-bold">
              L
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <p class="text-white font-semibold text-sm truncate">
                Luca
              </p>
              <span class="text-gray-500 text-xs">1h</span>
            </div>
            <p class="text-gray-500 text-sm truncate">
              Hai visto l'ultimo video? 😂
            </p>
          </div>
        </div>

        <!-- Chat item - group -->
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#2b2d31] transition-colors cursor-pointer">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#e67e22] flex items-center justify-center text-white font-bold text-lg">
              🎮
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <p class="text-white font-semibold text-sm truncate">
                Squad Serale
              </p>
              <span class="text-gray-500 text-xs">3h</span>
            </div>
            <p class="text-gray-500 text-sm truncate">
              Luca: stasera si gioca!
            </p>
          </div>
        </div>

        <!-- Chat item -->
        <div class="flex items-center gap-3 px-4 py-3 hover:bg-[#2b2d31] transition-colors cursor-pointer">
          <div class="relative">
            <div class="w-12 h-12 rounded-full bg-[#e91e63] flex items-center justify-center text-white font-bold">
              G
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex justify-between items-baseline">
              <p class="text-white font-semibold text-sm truncate">
                Giulia
              </p>
              <span class="text-gray-500 text-xs">ieri</span>
            </div>
            <p class="text-gray-500 text-sm truncate">
              Ci vediamo lunedì a scuola!
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Bottom nav -->
    <nav class="flex items-center justify-around px-4 py-2.5 bg-[#2b2d31] border-t border-[#1e1f22]">
      <button class="flex flex-col items-center gap-0.5 text-[#5865F2]">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        ><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" /></svg>
        <span class="text-xs">Chat</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 text-gray-500">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        ><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
        <span class="text-xs">Contacts</span>
      </button>
      <button class="flex flex-col items-center gap-0.5 text-gray-500">
        <svg
          class="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
        ><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /></svg>
        <span class="text-xs">Settings</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
// Pure visual spike — no logic
</script>
