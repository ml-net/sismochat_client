import { apiGet } from './api'

const STORAGE_PREFIX = 'sismochat_privkey_'
const pubKeyCache: Record<string, string> = {}

const RSA_ALGORITHM: RsaHashedKeyGenParams = {
  name: 'RSA-OAEP',
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: 'SHA-256',
}

const AES_ALGORITHM = 'AES-GCM'
const AES_KEY_LENGTH = 256
const IV_LENGTH = 12

export interface KeyPairPem {
  publicKey: string
  privateKey: string
}

export async function generateKeyPair(): Promise<KeyPairPem> {
  const keyPair = await crypto.subtle.generateKey(RSA_ALGORITHM, true, ['wrapKey', 'unwrapKey'])
  const pubRaw = await crypto.subtle.exportKey('spki', keyPair.publicKey)
  const privRaw = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)
  return {
    publicKey: arrayBufferToPem(pubRaw, 'PUBLIC KEY'),
    privateKey: arrayBufferToPem(privRaw, 'PRIVATE KEY'),
  }
}

export function storePrivateKey(userId: string, pem: string): void {
  localStorage.setItem(`${STORAGE_PREFIX}${userId}`, pem)
}

export function loadPrivateKey(userId: string): string | null {
  return localStorage.getItem(`${STORAGE_PREFIX}${userId}`)
}

export async function fetchPublicKey(userId: string): Promise<string> {
  if (pubKeyCache[userId]) return pubKeyCache[userId]
  const res = await apiGet<{ pubkey: string }>(`/api/v1/users/pubkey/${userId}`)
  pubKeyCache[userId] = res.pubkey
  return res.pubkey
}

export async function encrypt(plaintext: string, recipientPubKeyPem: string): Promise<string> {
  const pubKey = await importPublicKey(recipientPubKeyPem)
  const aesKey = await crypto.subtle.generateKey({ name: AES_ALGORITHM, length: AES_KEY_LENGTH }, true, ['encrypt'])
  const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
  const encoded = new TextEncoder().encode(plaintext)
  const ciphertext = await crypto.subtle.encrypt({ name: AES_ALGORITHM, iv }, aesKey, encoded)
  const wrappedKey = await crypto.subtle.wrapKey('raw', aesKey, pubKey, { name: 'RSA-OAEP' })
  return `${toBase64(wrappedKey)}.${toBase64(iv)}.${toBase64(ciphertext)}`
}

export async function decrypt(payload: string, privateKeyPem: string): Promise<string> {
  const parts = payload.split('.')
  if (parts.length !== 3) throw new Error('Invalid encrypted payload')
  const [wrappedKeyB64, ivB64, ciphertextB64] = parts
  const privKey = await importPrivateKey(privateKeyPem)
  const aesKey = await crypto.subtle.unwrapKey(
    'raw',
    fromBase64(wrappedKeyB64),
    privKey,
    { name: 'RSA-OAEP' },
    { name: AES_ALGORITHM, length: AES_KEY_LENGTH },
    false,
    ['decrypt'],
  )
  const iv = fromBase64(ivB64)
  const decrypted = await crypto.subtle.decrypt({ name: AES_ALGORITHM, iv }, aesKey, fromBase64(ciphertextB64))
  return new TextDecoder().decode(decrypted)
}

async function importPublicKey(pem: string): Promise<CryptoKey> {
  const der = pemToArrayBuffer(pem, 'PUBLIC KEY')
  return crypto.subtle.importKey('spki', der, RSA_ALGORITHM, false, ['wrapKey'])
}

async function importPrivateKey(pem: string): Promise<CryptoKey> {
  const der = pemToArrayBuffer(pem, 'PRIVATE KEY')
  return crypto.subtle.importKey('pkcs8', der, RSA_ALGORITHM, false, ['unwrapKey'])
}

function arrayBufferToPem(buffer: ArrayBuffer, label: string): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  const lines = base64.match(/.{1,64}/g) || []
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}

function pemToArrayBuffer(pem: string, label: string): ArrayBuffer {
  const base64 = pem.replace(`-----BEGIN ${label}-----`, '').replace(`-----END ${label}-----`, '').replace(/\s/g, '')
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

function toBase64(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
}

function fromBase64(str: string): ArrayBuffer {
  const binary = atob(str)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}
