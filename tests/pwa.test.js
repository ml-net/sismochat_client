import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

describe('PWA Configuration', () => {
  const distDir = resolve(__dirname, '../dist')
  const manifestPath = resolve(distDir, 'manifest.webmanifest')

  it('generates manifest.webmanifest in build output', () => {
    expect(existsSync(manifestPath)).toBe(true)
  })

  it('manifest contains required PWA fields', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
    expect(manifest.name).toBe('SiSMoChat')
    expect(manifest.short_name).toBe('SiSMoChat')
    expect(manifest.display).toBe('standalone')
    expect(manifest.start_url).toBe('/')
    expect(manifest.theme_color).toBe('#4f46e5')
  })

  it('manifest includes required icon sizes', () => {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
    const sizes = manifest.icons.map((i) => i.sizes)
    expect(sizes).toContain('192x192')
    expect(sizes).toContain('512x512')
  })

  it('generates service worker', () => {
    expect(existsSync(resolve(distDir, 'sw.js'))).toBe(true)
  })

  it('generates registerSW.js', () => {
    expect(existsSync(resolve(distDir, 'registerSW.js'))).toBe(true)
  })
})
