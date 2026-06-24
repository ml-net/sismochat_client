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
- [ ] 9.9 Child profile: cannot access /dashboard (gear icon hidden or route blocked)

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

- [ ] 12.1 `/` → splash
- [ ] 12.2 `/login` → login page (immediately, no lazy-load delay)
- [ ] 12.3 `/register` → register page
- [ ] 12.4 `/reset-password` → reset password page
- [ ] 12.5 `/change-password` → change password page
- [ ] 12.6 `/dashboard` → dashboard layout with nested routes
- [ ] 12.7 `/dashboard/children` → children list
- [ ] 12.8 `/chat` → chat placeholder
- [ ] 12.9 `/nonexistent` → 404 page
- [ ] 12.10 Browser back/forward navigation works

## 13. Dashboard Layout

- [ ] 13.1 `/dashboard` shows sidebar with navigation links
- [ ] 13.2 Sidebar links: Home, Children, Connections, Settings, Chat, Logout
- [ ] 13.3 Active link highlighted in sidebar
- [ ] 13.4 Nested routing: clicking sidebar links changes content area
- [ ] 13.5 Home view shows welcome message
- [ ] 13.6 Responsive: sidebar collapses on mobile

## 14. Children Management

- [ ] 14.1 `/dashboard/children` shows loading state initially
- [ ] 14.2 Children fetched from API and displayed as list
- [ ] 14.3 Empty state shown when no children exist
- [ ] 14.4 Each child shows nickname with edit and delete buttons
- [ ] 14.5 Add child: enter nickname + submit → child appears in list
- [ ] 14.6 Add child: empty nickname → button disabled
- [ ] 14.7 Add child: API error → error message shown
- [ ] 14.8 Edit child: click edit → inline input with save/cancel
- [ ] 14.9 Edit child: save → nickname updated in list
- [ ] 14.10 Edit child: Escape or cancel → reverts without saving
- [ ] 14.11 Delete child: click delete → confirmation dialog
- [ ] 14.12 Delete child: confirm → child removed from list
- [ ] 14.13 Delete child: cancel → nothing happens
- [ ] 14.14 Rate limit (429) handled gracefully with message
- [ ] 14.15 API error on any action handled gracefully (no crash)

## 15. Build & Deploy

- [ ] 15.1 No console errors on any page
- [ ] 15.2 No console warnings (except expected deprecations)
- [ ] 15.3 Lighthouse PWA score ≥ 90
- [ ] 15.4 All assets load (no 404s in network tab)
- [ ] 15.5 HTTPS enforced on production URL

## 16. Chat — Contact List

- [ ] 16.1 `/chat` shows contact list (connected users)
- [ ] 16.2 Loading state shown while fetching
- [ ] 16.3 Empty state when no connections
- [ ] 16.4 Each contact shows avatar initial + nickname
- [ ] 16.5 Last message preview shown under nickname
- [ ] 16.6 Online/offline indicator dot visible in header
- [ ] 16.7 Indicator turns green when WebSocket connected
- [ ] 16.8 Indicator turns gray when disconnected
- [ ] 16.9 Settings gear navigates to dashboard

## 17. Chat — Conversation

- [ ] 17.1 `/chat/:contactId` shows conversation view
- [ ] 17.2 Header shows contact initial + nickname + back arrow
- [ ] 17.3 Empty state when no messages
- [ ] 17.4 Send message: type text + submit → message appears as sent bubble (right, green)
- [ ] 17.5 Send message: empty input → button disabled
- [ ] 17.6 Received messages appear as incoming bubble (left, gray)
- [ ] 17.7 Each message shows timestamp
- [ ] 17.8 Messages auto-scroll to bottom on new message
- [ ] 17.9 Messages persist after page reload (IndexedDB)
- [ ] 17.10 Back arrow returns to contact list

## 18. Messaging — Real-time & Persistence

- [ ] 18.1 WebSocket connects on entering chat section
- [ ] 18.2 WebSocket disconnects on leaving chat section
- [ ] 18.3 New message from other user arrives in real-time (no page refresh)
- [ ] 18.4 Relay cycle: fetch → store → ACK works (message disappears from server)
- [ ] 18.5 WebSocket auto-reconnects after network drop
- [ ] 18.6 Messages survive app restart (stored in IndexedDB)
- [ ] 18.7 No duplicate messages after reconnect/relay

## 19. E2E Encryption

- [ ] 19.1 Creating a child generates RSA key pair (no server-side key generation)
- [ ] 19.2 Public key sent to server during child creation
- [ ] 19.3 Private key stored in localStorage
- [ ] 19.4 Messages sent are encrypted (ciphertext visible in server DB)
- [ ] 19.5 Messages received are decrypted (plaintext visible in chat UI)
- [ ] 19.6 Decryption failure shows placeholder (e.g. key mismatch)
- [ ] 19.7 Long messages (>190 bytes) encrypt/decrypt correctly (hybrid AES)
