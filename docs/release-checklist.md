# Release Verification Checklist

Use this checklist after every deploy to verify no regressions.

## 1. PWA & Installation
- [ ] 1.1 App loads at production URL
- [ ] 1.2 "Install app" prompt appears (or manual install via browser menu)
- [ ] 1.3 Installed app opens in standalone mode (no browser chrome)
- [ ] 1.4 App icon and name correct on home screen
- [ ] 1.5 Service Worker registers successfully (DevTools → Application → SW)

## 2. Offline Behavior
- [ ] 2.1 Disconnect network → offline fallback page shown
- [ ] 2.2 Reconnect → app resumes normally
- [ ] 2.3 Previously visited pages load from cache while offline

## 3. Push Notifications
- [ ] 3.1 Push permission prompt appears when expected
- [ ] 3.2 Push subscription created successfully (no console errors)
- [ ] 3.3 Notification received when app is in background
- [ ] 3.4 Notification click opens/focuses the app
- [ ] 3.5 Push disabled gracefully when VAPID key missing (no crash)

## 4. Routing & Navigation
- [ ] 4.1 Login page loads at `/`
- [ ] 4.2 Dashboard loads at `/dashboard`
- [ ] 4.3 Chat loads at `/chat`
- [ ] 4.4 Invalid URL shows 404 page
- [ ] 4.5 Browser back/forward navigation works

## 5. Internationalization
- [ ] 5.1 Italian browser → UI in Italian
- [ ] 5.2 English browser → UI in English
- [ ] 5.3 All visible text uses translation keys (no hardcoded strings)
