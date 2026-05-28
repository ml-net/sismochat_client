<template>
  <div>
    <h1>404</h1>
    <p>{{ t('notFound.message') }}</p>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
