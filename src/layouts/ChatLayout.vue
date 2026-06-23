<template>
  <div class="h-screen flex flex-col bg-gray-950">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onUnmounted } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useMessageStore } from '../stores/messages'
import { connectWs, disconnectWs, onWsEvent } from '../services/websocket'

const authStore = useAuthStore()
const messageStore = useMessageStore()

let relaying = false

if (authStore.user && authStore.token) {
  void messageStore.hydrate(String(authStore.user.id))
  connectWs(authStore.token)
  void messageStore.relay()
}

const unsubscribe = onWsEvent((event) => {
  if (event.type === 'new_message' && !relaying) {
    relaying = true
    void messageStore.relay().finally(() => { relaying = false })
  }
})

onUnmounted(() => {
  unsubscribe()
  disconnectWs()
})
</script>
