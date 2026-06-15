import { apiGet, apiPost, apiPatch, apiDelete } from './api'
import { useAuthStore } from '../stores/auth'

export interface Child {
  id: number
  nick: string
}

export function fetchChildren(): Promise<Child[]> {
  const { user } = useAuthStore()
  return apiGet<Child[]>(`/parents/${encodeURIComponent(user!.email)}/children`)
}

export function createChild(nick: string): Promise<{ ID: number }> {
  return apiPost<{ ID: number }>('/users', { nick })
}

export function updateChild(id: number, nick: string): Promise<Child> {
  return apiPatch<Child>(`/users/${id}`, { nick })
}

export function deleteChild(id: number): Promise<void> {
  return apiDelete<void>(`/users/${id}`)
}
