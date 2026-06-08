# Release Verification Checklist

Use this checklist after every deploy to verify no regressions.

## 1. PWA Foundation

- [ ] 1.1 App loads at root URL without errors
- [ ] 1.2 Web app manifest served at `/manifest.webmanifest`
- [ ] 1.3 Manifest contains correct name, icons, start_url, display
- [ ] 1.4 Service worker registers successfully
- [ ] 1.5 App is installable (browser shows install prompt or A2HS)
- [ ] 1.6 Offline fallback: airplane mode after first load → app shell still visible
- [ ] 1.7 Icons (192x192, 512x512) load correctly

## 2. Splash Screen

- [ ] 2.1 Root URL `/` shows splash screen
- [ ] 2.2 App name displayed correctly
- [ ] 2.3 Tagline displayed (localized)
- [ ] 2.4 "Parent login" link visible and clickable
- [ ] 2.5 Auto-redirect to `/login` after ~2.5s (no profile in localStorage)
- [ ] 2.6 Auto-redirect to `/dashboard` if `__parent__` profile in localStorage
- [ ] 2.7 Auto-redirect to `/chat` if child profile in localStorage
- [ ] 2.8 Malformed JSON in localStorage → graceful redirect to `/login`

## 3. Auth UI Layout

- [ ] 3.1 Login page renders (dark bg, animated blobs, centered card)
- [ ] 3.2 Register page renders with AuthLayout
- [ ] 3.3 Reset password page renders with AuthLayout
- [ ] 3.4 Change password page renders with AuthLayout
- [ ] 3.5 App name shown via constant (not hardcoded text)
- [ ] 3.6 Form inputs show label, placeholder, focus glow
- [ ] 3.7 Button shows gradient styling
- [ ] 3.8 Navigation links work (login ↔ register, login → reset)
- [ ] 3.9 Responsive: renders correctly on 320px width
- [ ] 3.10 Responsive: renders correctly on desktop

## 4. Theming

- [ ] 4.1 Default Emerald theme applied (green accents, blue secondary)
- [ ] 4.2 No CSS conflicts between PrimeVue and Tailwind (utilities apply correctly)
- [ ] 4.3 Glow effects visible on card border and button
- [ ] 4.4 Background blobs animate (pulse)

## 5. Internationalization

- [ ] 5.1 English locale loads (browser language = en)
- [ ] 5.2 Italian locale loads (browser language = it)
- [ ] 5.3 All visible text on login page is localized (no raw keys shown)
- [ ] 5.4 Email placeholder renders correctly (no `@` parsing error)
- [ ] 5.5 Fallback to English for unsupported browser languages

## 6. Routing

- [ ] 6.1 `/` → splash
- [ ] 6.2 `/login` → login page (immediately, no lazy-load delay)
- [ ] 6.3 `/register` → register page
- [ ] 6.4 `/reset-password` → reset password page
- [ ] 6.5 `/change-password` → change password page
- [ ] 6.6 `/dashboard` → dashboard placeholder
- [ ] 6.7 `/chat` → chat placeholder
- [ ] 6.8 `/nonexistent` → 404 page
- [ ] 6.9 Browser back/forward navigation works

## 7. Build & Deploy

- [ ] 7.1 No console errors on any page
- [ ] 7.2 No console warnings (except expected deprecations)
- [ ] 7.3 Lighthouse PWA score ≥ 90
- [ ] 7.4 All assets load (no 404s in network tab)
- [ ] 7.5 HTTPS enforced on production URL
