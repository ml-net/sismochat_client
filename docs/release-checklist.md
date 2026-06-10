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
- [ ] 3.11 Tab key navigates through form fields in logical order
- [ ] 3.12 Focus indicator visible on all interactive elements

## 4. Registration

- [ ] 4.1 Register with valid email + password (≥6 chars) → redirected to login
- [ ] 4.2 Validation: empty email → inline error shown
- [ ] 4.3 Validation: invalid email format → inline error shown
- [ ] 4.4 Validation: empty password → inline error shown
- [ ] 4.5 Validation: password < 6 chars → inline error shown
- [ ] 4.6 Validation: passwords don't match → inline error shown
- [ ] 4.7 API error: duplicate email → clear error message displayed
- [ ] 4.8 API error: server unavailable → generic error message displayed
- [ ] 4.9 Loading state shown during API call (button spinner)
- [ ] 4.10 "Already have an account?" link navigates to login

## 5. Login

- [ ] 5.1 Login with valid credentials → redirected to dashboard
- [ ] 5.2 Validation: empty email → inline error
- [ ] 5.3 Validation: empty password → inline error
- [ ] 5.4 Wrong password → "Invalid email or password"
- [ ] 5.5 Non-existent email → "Invalid email or password"
- [ ] 5.6 Server unreachable → generic error message
- [ ] 5.7 Loading state shown during API call
- [ ] 5.8 "Remember me" checked → token in localStorage, survives browser restart
- [ ] 5.9 "Remember me" unchecked → token in sessionStorage, cleared on tab close
- [ ] 5.10 After login with remember me: reload → splash redirects to /dashboard
- [ ] 5.11 Links to register and reset password work

## 6. Password Reset

- [ ] 6.1 Request reset: enter email → "code sent" message, advances to step 2
- [ ] 6.2 Request reset: empty email → inline validation error
- [ ] 6.3 Request reset: non-existent email → same success message (no info leak)
- [ ] 6.4 Step 2: valid OTP + new password → redirected to login
- [ ] 6.5 Step 2: invalid OTP → API error message displayed
- [ ] 6.6 Step 2: expired OTP → error message
- [ ] 6.7 Step 2: password < 6 chars → inline validation error
- [ ] 6.8 Step 2: empty OTP → inline validation error
- [ ] 6.9 "Back to login" link works
- [ ] 6.10 Login with new password after successful reset
- [ ] 6.11 Rate limit (too many requests) → localized error message

## 7. Change Password

- [ ] 7.1 Change password with valid old + new → success message
- [ ] 7.2 Empty old password → inline error
- [ ] 7.3 New password < 6 chars → inline error
- [ ] 7.4 New password = old password → inline error
- [ ] 7.5 Confirm doesn't match → inline error
- [ ] 7.6 Wrong old password → API error displayed
- [ ] 7.7 Server unreachable → generic error message
- [ ] 7.8 "Back to dashboard" link works
- [ ] 7.9 Login with new password after change

## 8. Logout

- [ ] 8.1 Logout button visible on dashboard
- [ ] 8.2 Click logout → redirected to login
- [ ] 8.3 After logout: localStorage cleared (no auth token, no profile)
- [ ] 8.4 After logout: navigating to /dashboard redirects to login (requires route guards, #46)
- [ ] 8.5 After logout: refresh stays on login

## 9. Route Guards

- [ ] 9.1 Unauthenticated: /dashboard → redirected to /login
- [ ] 9.2 Unauthenticated: /chat → redirected to /login
- [ ] 9.3 Unauthenticated: /change-password → redirected to /login
- [ ] 9.4 Authenticated: /login → redirected to /dashboard
- [ ] 9.5 Authenticated: /register → redirected to /dashboard
- [ ] 9.6 Authenticated: /reset-password → redirected to /dashboard
- [ ] 9.7 Expired JWT on API call → auto-logout + redirect to /login
- [ ] 9.8 Session rehydration: reload with valid token → stays authenticated

## 10. Theming

- [ ] 10.1 Default Emerald theme applied (green accents, blue secondary)
- [ ] 10.2 No CSS conflicts between PrimeVue and Tailwind (utilities apply correctly)
- [ ] 10.3 Glow effects visible on card border and button
- [ ] 10.4 Background blobs animate (pulse)

## 11. Internationalization

- [ ] 11.1 English locale loads (browser language = en)
- [ ] 11.2 Italian locale loads (browser language = it)
- [ ] 11.3 All visible text on login page is localized (no raw keys shown)
- [ ] 11.4 Email placeholder renders correctly (no `@` parsing error)
- [ ] 11.5 Fallback to English for unsupported browser languages

## 12. Routing

- [ ] 11.1 `/` → splash
- [ ] 11.2 `/login` → login page (immediately, no lazy-load delay)
- [ ] 11.3 `/register` → register page
- [ ] 11.4 `/reset-password` → reset password page
- [ ] 11.5 `/change-password` → change password page
- [ ] 11.6 `/dashboard` → dashboard placeholder
- [ ] 11.7 `/chat` → chat placeholder
- [ ] 11.8 `/nonexistent` → 404 page
- [ ] 11.9 Browser back/forward navigation works

## 13. Build & Deploy

- [ ] 12.1 No console errors on any page
- [ ] 12.2 No console warnings (except expected deprecations)
- [ ] 12.3 Lighthouse PWA score ≥ 90
- [ ] 12.4 All assets load (no 404s in network tab)
- [ ] 12.5 HTTPS enforced on production URL
