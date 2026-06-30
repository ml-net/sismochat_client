import { API_BASE, ApiRequestError } from './api'
import { loadPrivateKey } from './crypto'

interface ChildProfile {
  role: string
  id: string
  nick: string
  deviceId: string
}

interface DeviceAuthResponse {
  token: string
}

/**
 * Authenticate a child device via POST /api/v1/auth/user.
 * The token is composed of: base64(userId).base64(deviceId).signedDeviceId
 * where signedDeviceId = RSA private-encrypt of deviceId (PKCS#1 v1.5 signature).
 */
export async function authenticateDevice(profile: ChildProfile): Promise<string> {
  const privateKeyPem = loadPrivateKey(profile.id)
  if (!privateKeyPem) {
    throw new Error('Private key not found for device auth')
  }

  const signedDeviceId = await signWithPrivateKey(profile.deviceId, privateKeyPem)
  const token = `${btoa(profile.id)}.${btoa(profile.deviceId)}.${signedDeviceId}`

  const res = await fetch(`${API_BASE}/api/v1/auth/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  })

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>
    throw new ApiRequestError(
      typeof data.errCode === 'number' ? data.errCode : 401,
      typeof data.errDesc === 'string' ? data.errDesc : 'Device authentication failed',
    )
  }

  const data = (await res.json()) as DeviceAuthResponse
  return data.token
}

/**
 * Sign data with RSA private key using PKCS#1 v1.5 (equivalent to Node's crypto.privateEncrypt).
 * The server verifies with crypto.publicDecrypt.
 */
async function signWithPrivateKey(data: string, privateKeyPem: string): Promise<string> {
  const keyData = pemToArrayBuffer(privateKeyPem)
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    keyData,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA256' },
    false,
    ['sign'],
  )
  const encoded = new TextEncoder().encode(data)
  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', privateKey, encoded)
  return arrayBufferToBase64(signature)
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '')
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}
