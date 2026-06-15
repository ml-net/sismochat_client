import { apiGet, apiPost, apiPatch, apiDelete } from './api'
import { useAuthStore } from '../stores/auth'

export interface Child {
  id: number
  nick: string
}

export function fetchChildren(): Promise<Child[]> {
  const { user } = useAuthStore()
  return apiGet<Child[]>(`/api/v1/parent/${encodeURIComponent(user!.email)}/children`)
}

export function createChild(nick: string): Promise<{ ID: number }> {
  return apiPost<{ ID: number }>('/api/v1/user', { nick })
}

export function updateChild(id: number, nick: string): Promise<Child> {
  return apiPatch<Child>(`/api/v1/user/${id}`, { nick })
}

export function deleteChild(id: number): Promise<void> {
  return apiDelete<void>(`/api/v1/user/${id}`)
}
