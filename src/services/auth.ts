import { apiPost } from './api'

interface RegisterResponse {
  ID: number
}

export function registerParent(email: string, password: string): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>('/api/v1/parent', { email, pwd: password })
}
