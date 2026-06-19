import { apiPost, apiPatch } from './api'

export const ERR_EMAIL_TAKEN = 2
export const ERR_INVALID_OTP = 5
export const ERR_RATE_LIMIT = 15
export const ERR_WRONG_PASSWORD = 12

export interface RegisterResponse {
  ID: number
  virtualUser: {
    id: number
    deviceId: number
    keys: { public: string; private: string }
  }
  stateCert: string
}

export interface LoginResponse {
  token: string
  stateCert: unknown
}

export function registerParent(email: string, password: string): Promise<RegisterResponse> {
  return apiPost<RegisterResponse>('/api/v1/parents', { email, pwd: password })
}

export function loginParent(email: string, password: string): Promise<LoginResponse> {
  return apiPost<LoginResponse>('/api/v1/auth/parent', { email, pwd: password })
}

export function requestPasswordReset(email: string): Promise<{ msg: string }> {
  return apiPost<{ msg: string }>('/api/v1/parents/reset-request', { email })
}

export function resetPassword(email: string, otp: string, newPassword: string): Promise<void> {
  return apiPost<void>('/api/v1/parents/reset', { email, otp, newPassword })
}

export function changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
  return apiPatch<unknown>('/api/v1/parents/password', { oldPassword, newPassword })
}
