const API_BASE: string = (import.meta.env.VITE_API_URL as string) || 'http://localhost:3000'

export interface ApiError {
  errCode: number
  errDesc: string
}

export async function apiPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data: unknown = await res.json()
  if (!res.ok) throw data
  return data as T
}
