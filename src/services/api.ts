import { useAuthStore } from '../stores/auth'
import router from '../router'

export const API_BASE: string = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000'

export interface ApiError {
  errCode: number
  errDesc: string
}

export class ApiRequestError extends Error implements ApiError {
  errCode: number
  errDesc: string;
  [key: string]: unknown
  constructor(errCode: number, errDesc: string, extra?: Record<string, unknown>) {
    super(errDesc)
    this.errCode = errCode
    this.errDesc = errDesc
    if (extra) Object.assign(this, extra)
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.status === 401) {
    const authStore = useAuthStore()
    authStore.clearAuth()
    void router.replace({ name: 'login' })
    throw new ApiRequestError(401, 'Session expired')
  }
  if (res.status === 204 || (res.ok && !(res.headers.get('content-type') || '').includes('application/json'))) {
    return undefined as T
  }
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new ApiRequestError(-1, 'Unexpected response from server')
  }
  let data: unknown
  try {
    data = await res.json()
  } catch {
    throw new ApiRequestError(-1, 'Invalid response from server')
  }
  if (!res.ok) {
    const err = data as Record<string, unknown>
    const code = typeof err.errCode === 'number' ? err.errCode : -1
    const desc = typeof err.errDesc === 'string' ? err.errDesc : 'Unknown error'
    const extra = Object.fromEntries(
      Object.entries(err).filter(([k]) => k !== 'errCode' && k !== 'errDesc'),
    )
    throw new ApiRequestError(code, desc, extra)
  }
  return data as T
}

function getAuthHeaders(): Record<string, string> {
  const authStore = useAuthStore()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (authStore.token) {
    headers.Authorization = `Bearer ${authStore.token}`
  }
  return headers
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: getAuthHeaders(),
  })
  return handleResponse<T>(res)
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  })
  return handleResponse<T>(res)
}

export async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(res)
}

export async function apiPatch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  return handleResponse<T>(res)
}
