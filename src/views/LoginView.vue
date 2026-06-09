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
      @submit.prevent="onSubmit"
    >
      <AppInput
        id="email"
        v-model="form.email"
        :label="t('login.email')"
        type="email"
        :placeholder="t('login.emailPlaceholder')"
        :error="errors.email"
        :disabled="loading"
      />

      <AppInput
        id="password"
        v-model="form.password"
        :label="t('login.password')"
        type="password"
        :placeholder="t('login.passwordPlaceholder')"
        :error="errors.password"
        :disabled="loading"
      />

      <div class="flex items-center justify-between text-sm">
        <label class="flex items-center gap-2 text-gray-400 cursor-pointer">
          <input
            v-model="form.rememberMe"
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
        :loading-text="t('login.submitting')"
      >
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
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { APP_NAME } from '../constants'
import AuthLayout from '../layouts/AuthLayout.vue'
import AppInput from '../components/auth/AppInput.vue'
import AppButton from '../components/auth/AppButton.vue'
import { loginParent } from '../services/auth'
import { ApiRequestError } from '../services/api'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const { t } = useI18n()
const authStore = useAuthStore()

const form = reactive({ email: '', password: '', rememberMe: false })
const errors = reactive({ email: '', password: '' })
const serverError = ref('')
const loading = ref(false)

function validate(): boolean {
  errors.email = ''
  errors.password = ''

  if (!form.email.trim()) {
    errors.email = t('login.errors.emailRequired')
  }
  if (!form.password) {
    errors.password = t('login.errors.passwordRequired')
  }

  return !errors.email && !errors.password
}

async function onSubmit() {
  serverError.value = ''
  if (!validate()) return

  loading.value = true
  try {
    const email = form.email.trim()
    const { token } = await loginParent(email, form.password)
    const payload = JSON.parse(atob(token.split('.')[1])) as { user: number; email: string; profile: string }
    authStore.setAuth(token, { id: payload.user, email: payload.email, profile: payload.profile }, form.rememberMe)
    void router.replace('/dashboard')
  } catch (err) {
    if (err instanceof ApiRequestError) {
      if (err.errCode === 3 || err.errCode === 12) {
        serverError.value = t('login.errors.invalidCredentials')
      } else {
        serverError.value = t('login.errors.serverError')
      }
    } else {
      serverError.value = t('login.errors.serverError')
    }
  } finally {
    loading.value = false
  }
}
</script>
