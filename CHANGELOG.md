# Changelog

All notable changes to this project are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [v0.3.1] - 2026-06-19 — API v0.11.0 Compatibility

### Changed

- All API paths updated to plural form for API v0.11.0 compatibility (`/parents`, `/users`, `/messages`, `/connections`, `/devices`) (#114)
- Connection lists now display actual nicknames for both children (from API `fromNick`/`toNick` fields) (#114)

## [v0.3.0] - 2026-06-19 — Parent Dashboard

### Added

- Dashboard layout with desktop sidebar and mobile bottom nav (#71)
- Nested routing for dashboard sections (#71)
- Dashboard home view with welcome message (#71)
- Children management: list, add, edit nickname, delete (#72)
- Device provisioning: auto-provision on child creation, activation dialog, revoke (#73)
- Child profile persistence and parent virtual user (__parent__) (#73)
- Discovery: search parent by email, view their children (#74)
- Connection requests: send, accept, reject, remove (#75)
- Incoming requests and sent/active connections UI with status badges (#75)
- Child nickname resolution in connection lists (own children) (#112)
- Refresh button for connections view (#113)
- Pending notifications badge on connections nav item (#76)
- i18n translations for all dashboard flows (English + Italian)

### Changed

- API service layer: handle non-JSON success responses (201 without body)

## [v0.2.0] - 2026-06-10 — Authentication

### Added

- Splash screen with branding, auto-redirect based on stored profile (#40)
- Auth layout shell with animated background blobs and centered card (#40)
- Shared form components: AppInput (label, error, aria) and AppButton (loading state) (#40)
- Design tokens and CSS theme system (Emerald, Violet, Ocean palettes) (#40)
- PrimeVue CSS layer ordering for Tailwind v4 coexistence (#40)
- Parent registration form with client-side validation (#41)
- API service layer (fetch wrapper, VITE_API_URL, error handling) (#41)
- Parent login with JWT, remember me (localStorage/sessionStorage), store hydration (#42)
- Pinia auth store with session persistence and rehydration on boot (#42)
- Two-step password reset via OTP with localized error messages (#43)
- Rate limit error handling for reset requests (#43)
- Change password form for authenticated users (#44)
- Logout button with auth state clearing (#45)
- Vue Router navigation guards: protected and guest-only routes (#46)
- Centralized auth header attachment in API helpers (#46)
- Auto-logout on 401 API responses with redirect to login (#46)
- i18n translations for all auth flows (English + Italian)
- Release verification checklist (manual QA steps in docs/release-checklist.md)

### Changed

- LoginView is now statically imported (not lazy-loaded) for instant availability
- Brand name uses APP_NAME constant from src/constants.ts (not hardcoded)

## [v0.1.0] - 2026-05-28 — Project Foundation

### Added

- Vue 3 + TypeScript (strict) + Vite project setup
- Tailwind CSS v4 with @tailwindcss/vite plugin
- PrimeVue 4 with Aura theme
- Pinia state management
- Vue Router with lazy-loaded views
- vue-i18n with English and Italian locales
- PWA support: vite-plugin-pwa, service worker (injectManifest), web manifest
- Installable PWA with offline fallback
- ESLint (typescript-eslint recommendedTypeChecked) + commitlint + husky
- GitHub Actions CI (lint + type-check + build + test on PR, deploy on tag)
- Render static site deployment (tag-triggered)
- Vitest build-output tests (PWA manifest, icons, SW, offline, fallback)
- AGPL-3.0 license

[v0.3.1]: https://github.com/ml-net/sismochat_client/compare/v0.3.0...v0.3.1
[v0.3.0]: https://github.com/ml-net/sismochat_client/compare/v0.2.0...v0.3.0
[v0.2.0]: https://github.com/ml-net/sismochat_client/compare/v0.1.0...v0.2.0
[v0.1.0]: https://github.com/ml-net/sismochat_client/releases/tag/v0.1.0

