<template>
  <AuthLayout>
    <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
      SiSMoChat
    </h1>
    <p class="text-center text-gray-400 text-sm mb-8">
      {{ t('changePassword.subtitle') }}
    </p>
    <!-- Change password form will be implemented in Story #44 -->
  </AuthLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AuthLayout from '../layouts/AuthLayout.vue'

const { t } = useI18n()
</script>
