import { apiPost, apiDelete, ApiRequestError } from './api'
import { useAuthStore } from '../stores/auth'

export interface ProvisionResult {
  deviceId: number
  stateCert: string
}

export function provisionDevice(userId: number): Promise<ProvisionResult> {
  if (!useAuthStore().token) throw new ApiRequestError(401, 'Session expired')
  return apiPost<ProvisionResult>(`/api/v1/devices/${userId}`, {})
}

export function revokeDevice(userId: number): Promise<void> {
  if (!useAuthStore().token) throw new ApiRequestError(401, 'Session expired')
  return apiDelete<void>(`/api/v1/devices/${userId}`)
}
