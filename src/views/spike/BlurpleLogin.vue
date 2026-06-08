<template>
  <div class="min-h-screen flex items-center justify-center bg-[#5865F2] relative overflow-hidden">
    <!-- Subtle pattern overlay -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-20 w-40 h-40 border-2 border-white rounded-full" />
      <div class="absolute bottom-32 right-32 w-56 h-56 border-2 border-white rounded-full" />
      <div class="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-white rounded-full" />
    </div>

    <!-- Card -->
    <div class="relative z-10 w-full max-w-sm mx-4 p-8 rounded-2xl bg-[#313338] shadow-2xl">
      <!-- App name -->
      <h1 class="text-center text-3xl font-bold text-white mb-1">
        SiSMoChat
      </h1>
      <p class="text-center text-gray-400 text-sm mb-8">
        We're so excited to see you again!
      </p>

      <!-- Form -->
      <form
        class="space-y-5"
        @submit.prevent
      >
        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-gray-300 mb-2">Email</label>
          <input
            type="email"
            class="w-full px-3 py-2.5 rounded-md bg-[#1e1f22] border-none text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition-all"
          >
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wide text-gray-300 mb-2">Password</label>
          <input
            type="password"
            class="w-full px-3 py-2.5 rounded-md bg-[#1e1f22] border-none text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5865F2] transition-all"
          >
          <a
            href="#"
            class="text-xs text-[#00A8FC] hover:underline mt-1.5 inline-block"
          >Forgot your password?</a>
        </div>

        <button
          type="submit"
          class="w-full py-2.5 rounded-md font-medium text-white bg-[#5865F2] hover:bg-[#4752C4] transition-colors duration-200"
        >
          Log In
        </button>

        <p class="text-sm text-gray-500">
          Need an account? <a
            href="#"
            class="text-[#00A8FC] hover:underline"
          >Register</a>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pure visual spike — no logic
</script>
