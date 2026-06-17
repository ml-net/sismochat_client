import { apiGet, ApiRequestError } from './api'
import { useAuthStore } from '../stores/auth'

const API_BASE: string = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000'

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
  if (!authStore.token) throw new ApiRequestError(401, 'Session expired')
  const res = await fetch(`${API_BASE}/api/v1/parent/${encodeURIComponent(email)}`, {
    headers: { Authorization: `Bearer ${authStore.token}` },
  })
  if (res.status === 404) return null
  if (res.status === 429) throw new ApiRequestError(15, 'Too many search requests, try again later')
  if (!res.ok) throw new ApiRequestError(-1, 'Search failed')
  return (await res.json()) as DiscoveredParent
}

export function fetchParentChildren(email: string): Promise<DiscoveredChild[]> {
  if (!useAuthStore().token) throw new ApiRequestError(401, 'Session expired')
  return apiGet<DiscoveredChild[]>(`/api/v1/parent/${encodeURIComponent(email)}/children`)
}
