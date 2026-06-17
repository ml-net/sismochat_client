import { apiGet, ApiRequestError } from './api'
import { useAuthStore } from '../stores/auth'

export interface DiscoveredParent {
  parentID: number
  email: string
}

export interface DiscoveredChild {
  id: number
  nick: string
}

export function searchParent(email: string): Promise<DiscoveredParent> {
  if (!useAuthStore().token) throw new ApiRequestError(401, 'Session expired')
  return apiGet<DiscoveredParent>(`/api/v1/parent/${encodeURIComponent(email)}`)
}

export function fetchParentChildren(email: string): Promise<DiscoveredChild[]> {
  if (!useAuthStore().token) throw new ApiRequestError(401, 'Session expired')
  return apiGet<DiscoveredChild[]>(`/api/v1/parent/${encodeURIComponent(email)}/children`)
}
