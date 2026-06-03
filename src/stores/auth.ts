import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: number
  username: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)

  function setAuth(newToken: string, newUser: User) {
    token.value = newToken
    user.value = newUser
  }

  function clearAuth() {
    token.value = null
    user.value = null
  }

  return { token, user, setAuth, clearAuth }
})
