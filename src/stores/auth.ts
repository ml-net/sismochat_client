import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const STORAGE_KEY = 'sismochat_auth'
const PROFILE_KEY = 'sismochat_profile'

export interface AuthUser {
  id: number
  email: string
  profile: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<AuthUser | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  function hydrate() {
    const stored = localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as { token: string; user: AuthUser }
        token.value = parsed.token
        user.value = parsed.user
      } catch {
        localStorage.removeItem(STORAGE_KEY)
        sessionStorage.removeItem(STORAGE_KEY)
      }
    }
  }

  function setAuth(newToken: string, newUser: AuthUser, rememberMe: boolean) {
    token.value = newToken
    user.value = newUser
    const data = JSON.stringify({ token: newToken, user: newUser })
    if (rememberMe) {
      localStorage.setItem(STORAGE_KEY, data)
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ role: '__parent__' }))
      sessionStorage.removeItem(STORAGE_KEY)
    } else {
      sessionStorage.setItem(STORAGE_KEY, data)
      localStorage.removeItem(STORAGE_KEY)
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ role: '__parent__' }))
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem(STORAGE_KEY)
    sessionStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(PROFILE_KEY)
  }

  return { token, user, isAuthenticated, hydrate, setAuth, clearAuth }
})
