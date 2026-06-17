<template>
  <div>
    <h2 class="text-xl font-bold text-white mb-4">
      {{ t('dashboard.connections.title') }}
    </h2>

    <DiscoverySearch />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import DiscoverySearch from '../../components/dashboard/DiscoverySearch.vue'

const { t } = useI18n()
</script>
