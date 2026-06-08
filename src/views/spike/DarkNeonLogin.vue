<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
    <!-- Animated background blobs -->
    <div class="absolute top-[-20%] left-[-10%] w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl animate-pulse" />
    <div class="absolute bottom-[-20%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-2xl animate-pulse [animation-delay:2s]" />

    <!-- Card -->
    <div class="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl bg-gray-900/80 border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
      <!-- App name -->
      <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
        SiSMoChat
      </h1>
      <p class="text-center text-gray-400 text-sm mb-8">
        Welcome back
      </p>

      <!-- Form -->
      <form
        class="space-y-5"
        @submit.prevent
      >
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:shadow-[0_0_12px_rgba(59,130,246,0.3)] transition-all duration-300"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_12px_rgba(52,211,153,0.3)] transition-all duration-300"
          >
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
            <input
              type="checkbox"
              class="rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500/50"
            >
            Remember me
          </label>
          <a
            href="#"
            class="text-blue-400 hover:text-blue-300 transition-colors"
          >Forgot?</a>
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-blue-500 hover:from-emerald-500 hover:to-blue-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all duration-300"
        >
          Sign in
        </button>
      </form>

      <p class="text-center text-gray-500 text-sm mt-6">
        No account? <a
          href="#"
          class="text-emerald-400 hover:text-emerald-300 transition-colors"
        >Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure visual spike — no logic
</script>
