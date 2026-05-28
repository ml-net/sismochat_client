import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

// Precache static assets injected by vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST)

// Offline fallback for navigation requests
const navigationHandler = new NetworkFirst({
  cacheName: 'navigations',
})

registerRoute(new NavigationRoute(navigationHandler, {
  denylist: [/^\/__/],
}))

// Push event — show notification
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {}
  const title = data.title || 'SiSMoChat'
  const options = {
    body: data.body || '',
    icon: '/icons/pwa-192x192.png',
    badge: '/icons/pwa-192x192.png',
    data: data.url || '/',
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

// Notification click — open or focus the app
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data || '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => c.url.includes(url) && 'focus' in c)
      if (existing) return existing.focus()
      return self.clients.openWindow(url)
    })
  )
})
