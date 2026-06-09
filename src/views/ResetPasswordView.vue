<template>
  <AuthLayout>
    <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
      {{ APP_NAME }}
    </h1>
    <p class="text-center text-gray-400 text-sm mb-8">
      {{ t('resetPassword.subtitle') }}
    </p>

    <!-- Step 1: Request OTP -->
    <form
      v-if="step === 1"
      class="space-y-5"
      @submit.prevent="onRequestOtp"
    >
      <AppInput
        id="email"
        v-model="form.email"
        :label="t('resetPassword.email')"
        type="email"
        :placeholder="t('resetPassword.emailPlaceholder')"
        :error="errors.email"
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
        :loading-text="t('resetPassword.sending')"
      >
        {{ t('resetPassword.sendCode') }}
      </AppButton>
    </form>

    <!-- Step 2: Enter OTP + new password -->
    <form
      v-else
      class="space-y-5"
      @submit.prevent="onResetPassword"
    >
      <p class="text-sm text-gray-300 mb-4">
        {{ t('resetPassword.codeSent') }}
      </p>

      <AppInput
        id="otp"
        v-model="form.otp"
        :label="t('resetPassword.otp')"
        type="text"
        :placeholder="t('resetPassword.otpPlaceholder')"
        :error="errors.otp"
        :disabled="loading"
      />

      <AppInput
        id="newPassword"
        v-model="form.newPassword"
        :label="t('resetPassword.newPassword')"
        type="password"
        :placeholder="t('resetPassword.passwordPlaceholder')"
        :error="errors.newPassword"
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
        :loading-text="t('resetPassword.resetting')"
      >
        {{ t('resetPassword.resetButton') }}
      </AppButton>
    </form>

    <p class="text-center text-gray-500 text-sm mt-6">
      <router-link
        to="/login"
        class="text-primary-light hover:text-primary transition-colors"
      >
        {{ t('resetPassword.backToLogin') }}
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
import { requestPasswordReset, resetPassword, ERR_INVALID_OTP } from '../services/auth'
import { ApiRequestError } from '../services/api'

const router = useRouter()
const { t } = useI18n()

const step = ref(1)
const form = reactive({ email: '', otp: '', newPassword: '' })
const errors = reactive({ email: '', otp: '', newPassword: '' })
const serverError = ref('')
const loading = ref(false)

async function onRequestOtp() {
  errors.email = ''
  serverError.value = ''
  if (!form.email.trim()) {
    errors.email = t('resetPassword.errors.emailRequired')
    return
  }

  loading.value = true
  try {
    await requestPasswordReset(form.email.trim())
    step.value = 2
  } catch {
    serverError.value = t('resetPassword.errors.serverError')
  } finally {
    loading.value = false
  }
}

async function onResetPassword() {
  errors.otp = ''
  errors.newPassword = ''
  serverError.value = ''

  if (!form.otp.trim()) {
    errors.otp = t('resetPassword.errors.otpRequired')
  } else if (!/^\d{6}$/.test(form.otp.trim())) {
    errors.otp = t('resetPassword.errors.otpLength')
  }
  if (!form.newPassword) {
    errors.newPassword = t('resetPassword.errors.passwordRequired')
  } else if (form.newPassword.length < 6) {
    errors.newPassword = t('resetPassword.errors.passwordMin')
  }
  if (errors.otp || errors.newPassword) return

  loading.value = true
  try {
    await resetPassword(form.email.trim(), form.otp.trim(), form.newPassword)
    void router.push({ name: 'login', query: { reset: '1' } })
  } catch (err) {
    if (err instanceof ApiRequestError && err.errCode === ERR_INVALID_OTP) {
      const reason = err.reason as string | undefined
      const remaining = (err.remaining as number) ?? 0
      if (reason === 'expired') {
        serverError.value = t('resetPassword.errors.otpExpired')
      } else if (reason === 'too_many') {
        serverError.value = t('resetPassword.errors.tooManyAttempts')
      } else {
        serverError.value = t('resetPassword.errors.invalidOtp', { remaining })
      }
    } else {
      serverError.value = t('resetPassword.errors.serverError')
    }
  } finally {
    loading.value = false
  }
}
</script>
