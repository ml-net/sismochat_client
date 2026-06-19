import { API_BASE, apiGet, ApiRequestError } from './api'
import { useAuthStore } from '../stores/auth'
import router from '../router'

export interface DiscoveredParent {
  parentID: number
  email: string
}

export interface DiscoveredChild {
  id: number
  nick: string
}

export async function searchParent(email: string): Promise<DiscoveredParent | null> {
  const authStore = useAuthStore()
  if (!authStore.token) {
    authStore.clearAuth()
    void router.replace({ name: 'login' })
    throw new ApiRequestError(401, 'Session expired')
  }
  const res = await fetch(`${API_BASE}/api/v1/parents/${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
  if (res.status === 401) {
    authStore.clearAuth()
    void router.replace({ name: 'login' })
    throw new ApiRequestError(401, 'Session expired')
  }
  if (res.status === 404) return null
  if (res.status === 429) throw new ApiRequestError(15, 'Too many search requests, try again later')
  if (!res.ok) throw new ApiRequestError(-1, 'Search failed')
  return (await res.json()) as DiscoveredParent
}

export function fetchParentChildren(email: string): Promise<DiscoveredChild[]> {
  return apiGet<DiscoveredChild[]>(`/api/v1/parents/${encodeURIComponent(email)}/children`)
}
