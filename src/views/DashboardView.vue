<template>
  <div>
    <h1>{{ t('dashboard.title') }}</h1>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
