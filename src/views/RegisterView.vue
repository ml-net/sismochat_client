<template>
  <AuthLayout>
    <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
      {{ APP_NAME }}
    </h1>
    <p class="text-center text-gray-400 text-sm mb-8">
      {{ t('register.subtitle') }}
    </p>

    <form
      class="space-y-5"
      @submit.prevent="onSubmit"
    >
      <AppInput
        id="email"
        v-model="form.email"
        :label="t('register.email')"
        type="email"
        :placeholder="t('register.emailPlaceholder')"
        :error="errors.email"
        :disabled="loading"
      />

      <AppInput
        id="password"
        v-model="form.password"
        :label="t('register.password')"
        type="password"
        :placeholder="t('register.passwordPlaceholder')"
        :error="errors.password"
        :disabled="loading"
      />

      <AppInput
        id="confirmPassword"
        v-model="form.confirmPassword"
        :label="t('register.confirmPassword')"
        type="password"
        :placeholder="t('register.passwordPlaceholder')"
        :error="errors.confirmPassword"
        :disabled="loading"
      />

      <p
        v-if="serverError"
        class="text-sm text-red-400"
        role="alert"
      >
        {{ serverError }}
      </p>

      <AppButton
        type="submit"
        :loading="loading"
        :loading-text="t('register.submitting')"
      >
        {{ t('register.submit') }}
      </AppButton>
    </form>

    <p class="text-center text-gray-500 text-sm mt-6">
      {{ t('register.hasAccount') }}
      <router-link
        to="/login"
        class="text-primary-light hover:text-primary transition-colors"
      >
        {{ t('register.signIn') }}
      </router-link>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../constants'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppInput from '../components/auth/AppInput.vue'
import AppButton from '../components/auth/AppButton.vue'
import { registerParent } from '../services/auth'
import { ApiRequestError } from '../services/api'

const router = useRouter()
const { t } = useI18n()

const form = reactive({ email: '', password: '', confirmPassword: '' })
const errors = reactive({ email: '', password: '', confirmPassword: '' })
const serverError = ref('')
const loading = ref(false)

function validate(): boolean {
  errors.email = ''
  errors.password = ''
  errors.confirmPassword = ''

  if (!form.email.trim()) {
    errors.email = t('register.errors.emailRequired')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('register.errors.emailInvalid')
  }

  if (!form.password) {
    errors.password = t('register.errors.passwordRequired')
  } else if (form.password.length < 6) {
    errors.password = t('register.errors.passwordMin')
  }

  if (!form.confirmPassword) {
    errors.confirmPassword = t('register.errors.confirmRequired')
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = t('register.errors.passwordMismatch')
  }

  return !errors.email && !errors.password && !errors.confirmPassword
}

async function onSubmit() {
  serverError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    await registerParent(form.email, form.password)
    void router.push({ name: 'login', query: { registered: '1' } })
  } catch (err) {
    if (err instanceof ApiRequestError && err.errCode === 2) {
      serverError.value = t('register.errors.emailTaken')
    } else {
      serverError.value = t('register.errors.serverError')
    }
  } finally {
    loading.value = false
  }
}
</script>
