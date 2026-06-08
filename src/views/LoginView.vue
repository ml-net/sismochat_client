<template>
  <AuthLayout>
    <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
      {{ APP_NAME }}
    </h1>
    <p class="text-center text-gray-400 text-sm mb-8">
      {{ t('login.subtitle') }}
    </p>

    <form
      class="space-y-5"
      @submit.prevent
    >
      <AppInput
        id="email"
        :label="t('login.email')"
        type="email"
        :placeholder="t('login.emailPlaceholder')"
      />

      <AppInput
        id="password"
        :label="t('login.password')"
        type="password"
        :placeholder="t('login.passwordPlaceholder')"
      />

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
          <input
            type="checkbox"
            class="rounded border-gray-600 bg-gray-800 text-primary focus:ring-primary/50"
          >
          {{ t('login.rememberMe') }}
        </label>
        <router-link
          to="/reset-password"
          class="text-secondary-light hover:text-secondary transition-colors"
        >
          {{ t('login.forgot') }}
        </router-link>
      </div>

      <AppButton type="submit">
        {{ t('login.submit') }}
      </AppButton>
    </form>

    <p class="text-center text-gray-500 text-sm mt-6">
      {{ t('login.noAccount') }}
      <router-link
        to="/register"
        class="text-primary-light hover:text-primary transition-colors"
      >
        {{ t('login.signUp') }}
      </router-link>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../constants'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppInput from '../components/auth/AppInput.vue'
import AppButton from '../components/auth/AppButton.vue'

const { t } = useI18n()
</script>
