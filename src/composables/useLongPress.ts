import { ref, onUnmounted } from 'vue'

export interface LongPressOptions {
  /** Threshold in ms before triggering (default: 500) */
  threshold?: number
  /** Movement tolerance in px before cancelling (default: 10) */
  moveTolerance?: number
  /** Vibration duration in ms on trigger, 0 to disable (default: 50) */
  vibrationDuration?: number
}

/**
 * Composable for long-press (touch hold) gesture detection.
 *
 * Returns event handler functions to bind on the target element(s).
 * The `onLongPress` callback fires after holding for `threshold` ms
 * without moving beyond `moveTolerance` px.
 */
export function useLongPress(
  onLongPress: () => void,
  options: LongPressOptions = {}
) {
  const { threshold = 500, moveTolerance = 10, vibrationDuration = 50 } = options

  const pressing = ref(false)
  let timer: ReturnType<typeof setTimeout> | null = null
  let startX = 0
  let startY = 0

  function start(e: TouchEvent) {
    const touch = e.touches[0]
    startX = touch.clientX
    startY = touch.clientY
    pressing.value = true

    timer = setTimeout(() => {
      pressing.value = false
      if (vibrationDuration > 0 && navigator.vibrate) {
        navigator.vibrate(vibrationDuration)
      }
      onLongPress()
    }, threshold)
  }

  function move(e: TouchEvent) {
    if (!timer) return
    const touch = e.touches[0]
    const dx = Math.abs(touch.clientX - startX)
    const dy = Math.abs(touch.clientY - startY)
    if (dx > moveTolerance || dy > moveTolerance) {
      cancel()
    }
  }

  function end() {
    cancel()
  }

  function cancel() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    pressing.value = false
  }

  onUnmounted(cancel)

  return { pressing, start, move, end, cancel }
}
