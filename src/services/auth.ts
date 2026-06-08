import { apiPost } from './api'

export const ERR_EMAIL_TAKEN = 2

interface RegisterResponse {
  ID: number
}

export function registerParent(email: string, password: string): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>('/api/v1/parent', { email, pwd: password })
}
