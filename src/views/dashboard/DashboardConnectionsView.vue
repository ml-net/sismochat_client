<template>
  <div class="space-y-8">
    <h2 class="text-xl font-bold text-white mb-4">
      {{ t('dashboard.connections.title') }}
    </h2>

    <IncomingRequests />
    <SentConnections />
    <DiscoverySearch />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DiscoverySearch from '../../components/dashboard/DiscoverySearch.vue'
import IncomingRequests from '../../components/dashboard/IncomingRequests.vue'
import SentConnections from '../../components/dashboard/SentConnections.vue'

const { t } = useI18n()
</script>
