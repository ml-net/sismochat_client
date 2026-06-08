<template>
  <AuthLayout>
    <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
      {{ APP_NAME }}
    </h1>
    <p class="text-center text-gray-400 text-sm mb-8">
      {{ t('resetPassword.subtitle') }}
    </p>
    <!-- Reset password form will be implemented in Story #43 -->
  </AuthLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../constants'
import AuthLayout from '../layouts/AuthLayout.vue'

const { t } = useI18n()
</script>
