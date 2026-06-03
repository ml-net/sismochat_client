import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute, NavigationRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

// Precache static assets injected by vite-plugin-pwa
precacheAndRoute(self.__WB_MANIFEST)

const OFFLINE_URL = '/offline.html'

// Offline fallback for navigation requests
const navigationHandler = new NetworkFirst({
  cacheName: 'navigations',
})

const navigationRoute = new NavigationRoute(
  async (params) => {
    try {
      return await navigationHandler.handle(params)
    } catch {
      return caches.match(OFFLINE_URL)
    }
  },
  { denylist: [/^\/__/] },
)
registerRoute(navigationRoute)

// Push event — show notification
self.addEventListener('push', (event) => {
  let data
  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = {}
  }
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
  const urlPath = event.notification.data || '/'
  const targetUrl = new URL(urlPath, self.location.origin)
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((c) => {
        const clientUrl = new URL(c.url)
        return clientUrl.origin === targetUrl.origin && clientUrl.pathname === targetUrl.pathname && 'focus' in c
      })
      if (existing) return existing.focus()
      return self.clients.openWindow(targetUrl.href)
    }),
  )
})
