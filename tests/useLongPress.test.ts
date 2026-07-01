import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useLongPress } from '../src/composables/useLongPress'

// Mock Vue's onUnmounted (no component context in unit tests)
vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return { ...actual, onUnmounted: vi.fn() }
})

function createTouchEvent(type: string, x = 0, y = 0): TouchEvent {
  return {
    type,
    touches: [{ clientX: x, clientY: y }],
  } as unknown as TouchEvent
}

describe('useLongPress', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('fires callback after default threshold (500ms)', () => {
    const callback = vi.fn()
    const { start } = useLongPress(callback)

    start(createTouchEvent('touchstart', 100, 100))
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledOnce()
  })

  it('respects custom threshold', () => {
    const callback = vi.fn()
    const { start } = useLongPress(callback, { threshold: 300 })

    start(createTouchEvent('touchstart', 100, 100))
    vi.advanceTimersByTime(299)
    expect(callback).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(callback).toHaveBeenCalledOnce()
  })

  it('cancels on touchend before threshold', () => {
    const callback = vi.fn()
    const { start, end } = useLongPress(callback)

    start(createTouchEvent('touchstart', 100, 100))
    vi.advanceTimersByTime(300)
    end()
    vi.advanceTimersByTime(300)

    expect(callback).not.toHaveBeenCalled()
  })

  it('cancels when finger moves beyond tolerance', () => {
    const callback = vi.fn()
    const { start, move } = useLongPress(callback, { moveTolerance: 10 })

    start(createTouchEvent('touchstart', 100, 100))
    vi.advanceTimersByTime(200)
    move(createTouchEvent('touchmove', 115, 100)) // 15px > 10px tolerance
    vi.advanceTimersByTime(400)

    expect(callback).not.toHaveBeenCalled()
  })

  it('does not cancel when finger moves within tolerance', () => {
    const callback = vi.fn()
    const { start, move } = useLongPress(callback, { moveTolerance: 10 })

    start(createTouchEvent('touchstart', 100, 100))
    vi.advanceTimersByTime(200)
    move(createTouchEvent('touchmove', 105, 103)) // 5px, 3px - within tolerance
    vi.advanceTimersByTime(300)

    expect(callback).toHaveBeenCalledOnce()
  })

  it('triggers haptic feedback when available', () => {
    const vibrateMock = vi.fn()
    Object.defineProperty(navigator, 'vibrate', { value: vibrateMock, configurable: true })

    const callback = vi.fn()
    const { start } = useLongPress(callback, { vibrationDuration: 50 })

    start(createTouchEvent('touchstart', 0, 0))
    vi.advanceTimersByTime(500)

    expect(vibrateMock).toHaveBeenCalledWith(50)
  })

  it('skips haptic when vibrationDuration is 0', () => {
    const vibrateMock = vi.fn()
    Object.defineProperty(navigator, 'vibrate', { value: vibrateMock, configurable: true })

    const callback = vi.fn()
    const { start } = useLongPress(callback, { vibrationDuration: 0 })

    start(createTouchEvent('touchstart', 0, 0))
    vi.advanceTimersByTime(500)

    expect(vibrateMock).not.toHaveBeenCalled()
    expect(callback).toHaveBeenCalledOnce()
  })

  it('sets pressing to true during hold and false after', () => {
    const callback = vi.fn()
    const { start, pressing } = useLongPress(callback)

    expect(pressing.value).toBe(false)
    start(createTouchEvent('touchstart', 0, 0))
    expect(pressing.value).toBe(true)

    vi.advanceTimersByTime(500)
    expect(pressing.value).toBe(false)
  })

  it('sets pressing to false on cancel', () => {
    const callback = vi.fn()
    const { start, end, pressing } = useLongPress(callback)

    start(createTouchEvent('touchstart', 0, 0))
    expect(pressing.value).toBe(true)
    end()
    expect(pressing.value).toBe(false)
  })
})
