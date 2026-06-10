<template>
  <AuthLayout>
    <h1 class="text-center text-3xl font-bold text-white mb-2 drop-shadow-[0_0_10px_var(--theme-glow)]">
      {{ APP_NAME }}
    </h1>
    <p class="text-center text-gray-400 text-sm mb-8">
      {{ t('changePassword.subtitle') }}
    </p>

    <div
      v-if="success"
      class="text-center text-sm text-green-400"
      role="status"
    >
      {{ t('changePassword.success') }}
    </div>

    <form
      v-else
      class="space-y-5"
      @submit.prevent="onSubmit"
    >
      <AppInput
        id="oldPassword"
        v-model="form.oldPassword"
        :label="t('changePassword.oldPassword')"
        type="password"
        :placeholder="t('changePassword.passwordPlaceholder')"
        :error="errors.oldPassword"
        :disabled="loading"
      />

      <AppInput
        id="newPassword"
        v-model="form.newPassword"
        :label="t('changePassword.newPassword')"
        type="password"
        :placeholder="t('changePassword.passwordPlaceholder')"
        :error="errors.newPassword"
        :disabled="loading"
      />

      <AppInput
        id="confirmPassword"
        v-model="form.confirmPassword"
        :label="t('changePassword.confirmPassword')"
        type="password"
        :placeholder="t('changePassword.passwordPlaceholder')"
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
        :loading-text="t('changePassword.submitting')"
      >
        {{ t('changePassword.submit') }}
      </AppButton>
    </form>

    <p class="text-center text-gray-500 text-sm mt-6">
      <router-link
        to="/dashboard"
        class="text-primary-light hover:text-primary transition-colors"
      >
        {{ t('changePassword.backToDashboard') }}
      </router-link>
    </p>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../constants'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppInput from '../components/auth/AppInput.vue'
import AppButton from '../components/auth/AppButton.vue'
import { changePassword, ERR_WRONG_PASSWORD } from '../services/auth'
import { ApiRequestError } from '../services/api'

const { t } = useI18n()

const form = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const errors = reactive({ oldPassword: '', newPassword: '', confirmPassword: '' })
const serverError = ref('')
const loading = ref(false)
const success = ref(false)

function validate(): boolean {
  errors.oldPassword = ''
  errors.newPassword = ''
  errors.confirmPassword = ''

  if (!form.oldPassword) {
    errors.oldPassword = t('changePassword.errors.oldRequired')
  }
  if (!form.newPassword) {
    errors.newPassword = t('changePassword.errors.newRequired')
  } else if (form.newPassword.length < 6) {
    errors.newPassword = t('changePassword.errors.newMin')
  } else if (form.newPassword === form.oldPassword) {
    errors.newPassword = t('changePassword.errors.samePwd')
  }
  if (!form.confirmPassword) {
    errors.confirmPassword = t('changePassword.errors.confirmRequired')
  } else if (form.newPassword !== form.confirmPassword) {
    errors.confirmPassword = t('changePassword.errors.mismatch')
  }

  return !errors.oldPassword && !errors.newPassword && !errors.confirmPassword
}

async function onSubmit() {
  serverError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    await changePassword(form.oldPassword, form.newPassword)
    success.value = true
  } catch (err) {
    if (err instanceof ApiRequestError && err.errCode === ERR_WRONG_PASSWORD) {
      serverError.value = t('changePassword.errors.wrongOld')
    } else {
      serverError.value = t('changePassword.errors.serverError')
    }
  } finally {
    loading.value = false
  }
}
</script>
