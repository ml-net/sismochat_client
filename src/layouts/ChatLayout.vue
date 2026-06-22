<template>
  <div class="h-screen flex flex-col bg-gray-950">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useMessageStore } from '../stores/messages'

const authStore = useAuthStore()
const messageStore = useMessageStore()
if (authStore.user) void messageStore.hydrate(String(authStore.user.id))
</script>
