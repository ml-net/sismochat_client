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
let pendingRelay = false

async function initMessaging() {
  if (!authStore.user || !authStore.token) return
  await messageStore.hydrate(String(authStore.user.id))
  connectWs(authStore.token)
  await messageStore.relay()
}

void initMessaging()

const unsubscribe = onWsEvent((event) => {
  if (event.type === 'new_message') {
    if (relaying) {
      pendingRelay = true
      return
    }
    triggerRelay()
  }
})

function triggerRelay() {
  relaying = true
  void messageStore.relay().finally(() => {
    relaying = false
    if (pendingRelay) {
      pendingRelay = false
      triggerRelay()
    }
  })
}

onUnmounted(() => {
  unsubscribe()
  disconnectWs()
})
</script>
