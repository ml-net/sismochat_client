import { apiGet } from './api'
import { useAuthStore } from '../stores/auth'

export interface Child {
  id: number
  nick: string
}

export function fetchChildren(): Promise<Child[]> {
  const { user } = useAuthStore()
  return apiGet<Child[]>(`/parents/${encodeURIComponent(user!.email)}/children`)
}
