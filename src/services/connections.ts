import { apiGet, apiPost, apiPatch, apiDelete, ApiRequestError } from './api'
import { useAuthStore } from '../stores/auth'

export interface ConnectionRequest {
  id: number
  from: number
  to: number
  status: number
  fromNick: string | null
  toNick: string | null
}

export const ConnectionStatus = {
  ACCEPTED: 0,
  REQUESTED: 1,
  REJECTED: 2,
} as const

function getParentId(): number {
  const user = useAuthStore().user
  if (!user) throw new ApiRequestError(401, 'Session expired')
  return user.id
}

export function sendConnectionRequest(from: number, to: number): Promise<void> {
  getParentId()
  return apiPost<void>(`/api/v1/connections/${from}/${to}`, {})
}

export function fetchSentRequests(): Promise<ConnectionRequest[]> {
  const parentId = getParentId()
  return apiGet<ConnectionRequest[]>(`/api/v1/connections/sent/${parentId}`)
}

export function fetchPendingApprovals(): Promise<ConnectionRequest[]> {
  const parentId = getParentId()
  return apiGet<ConnectionRequest[]>(`/api/v1/connections/approvalList/${parentId}`)
}

export function acceptConnection(connId: number): Promise<unknown> {
  return apiPatch<unknown>(`/api/v1/connections/${connId}`, { status: ConnectionStatus.ACCEPTED })
}

export function rejectConnection(connId: number): Promise<void> {
  return apiPatch<void>(`/api/v1/connections/${connId}`, { status: ConnectionStatus.REJECTED })
}

export function removeConnection(connId: number): Promise<void> {
  return apiDelete<void>(`/api/v1/connections/${connId}`)
}
