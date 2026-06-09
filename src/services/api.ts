const API_BASE: string = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000'

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

export async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (res.status === 204) return undefined as T
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
    const { errCode, errDesc, ...extra } = err
    throw new ApiRequestError(errCode as number, errDesc as string, extra)
  }
  return data as T
}
