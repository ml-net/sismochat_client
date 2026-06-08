<template>
  <div class="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0f0f23]">
    <!-- Gradient background shapes -->
    <div class="absolute top-10 left-10 w-72 h-72 bg-fuchsia-600/40 rounded-full blur-3xl" />
    <div class="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/40 rounded-full blur-3xl" />
    <div class="absolute top-1/3 right-1/4 w-48 h-48 bg-emerald-500/20 rounded-full blur-2xl" />

    <!-- Glass card -->
    <div class="relative z-10 w-full max-w-sm mx-4 p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl">
      <!-- App name -->
      <h1 class="text-center text-3xl font-bold text-white mb-2">
        SiSMoChat
      </h1>
      <p class="text-center text-white/50 text-sm mb-8">
        Sign in to continue
      </p>

      <!-- Form -->
      <form
        class="space-y-5"
        @submit.prevent
      >
        <div>
          <label class="block text-sm font-medium text-white/70 mb-1.5">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-fuchsia-400/50 focus:bg-white/10 transition-all duration-300"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-white/70 mb-1.5">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 backdrop-blur-sm focus:outline-none focus:border-blue-400/50 focus:bg-white/10 transition-all duration-300"
          >
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="flex items-center gap-2 text-white/50 cursor-pointer">
            <input
              type="checkbox"
              class="rounded border-white/20 bg-white/5 text-fuchsia-500 focus:ring-fuchsia-500/30"
            >
            Remember me
          </label>
          <a
            href="#"
            class="text-blue-300/70 hover:text-blue-300 transition-colors"
          >Forgot?</a>
        </div>

        <button
          type="submit"
          class="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-fuchsia-500/80 to-blue-500/80 hover:from-fuchsia-500 hover:to-blue-500 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-[1.02]"
        >
          Sign in
        </button>
      </form>

      <p class="text-center text-white/40 text-sm mt-6">
        No account? <a
          href="#"
          class="text-fuchsia-300/70 hover:text-fuchsia-300 transition-colors"
        >Sign up</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure visual spike — no logic
</script>
