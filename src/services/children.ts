import { apiGet, apiPost, apiPatch, apiDelete, ApiRequestError } from './api'
import { useAuthStore } from '../stores/auth'

export interface Child {
  id: number
  nick: string
}

export function fetchChildren(): Promise<Child[]> {
  const email = useAuthStore().user?.email
  if (!email) throw new ApiRequestError(401, 'Session expired')
  return apiGet<Child[]>(`/api/v1/parents/${encodeURIComponent(email)}/children`)
}

export function createChild(nick: string): Promise<{ ID: number }> {
  return apiPost<{ ID: number }>('/api/v1/users', { nick })
}

export function updateChild(id: number, nick: string): Promise<Child> {
  return apiPatch<Child>(`/api/v1/users/${id}`, { nick })
}

export function deleteChild(id: number): Promise<void> {
  return apiDelete<void>(`/api/v1/users/${id}`)
}
