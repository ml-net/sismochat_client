import { apiPost } from './api'

export const ERR_EMAIL_TAKEN = 2

interface RegisterResponse {
  ID: number
}

export interface LoginResponse {
  token: string
  stateCert: unknown
}

export function registerParent(email: string, password: string): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>('/api/v1/parent', { email, pwd: password })
}

export function loginParent(email: string, password: string): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/api/v1/auth/parent', { email, pwd: password })
}
