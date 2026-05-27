# ADR 001 — Client technology stack

## Status

Accepted

## Context

SiSMoChat needs a definitive client to replace the proof-of-concept (vanilla JS). The client must be a PWA with push notification support, work on all platforms (mobile-first), and support future native packaging via Capacitor.

## Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Vue 3 (Composition API) | Low learning curve, SFC model, team familiarity |
| Build | Vite | Fast dev server, native ESM, excellent Vue integration |
| UI | Tailwind CSS + PrimeVue | Utility-first styling + ready-made accessible components |
| State | Pinia | Official Vue store, simple API, devtools support |
| Routing | Vue Router 4 | Standard, supports guards for auth flows |
| i18n | vue-i18n 11 | Mature, supports lazy-loading locales |
| PWA | vite-plugin-pwa (Workbox) | Service Worker generation, push subscription, offline |
| Native (future) | Capacitor | Same codebase, no rewrite needed for app stores |

### Distribution strategy

- **Primary:** PWA (Add to Home Screen) — zero cost, all platforms
- **Android:** APK via GitHub Releases (Capacitor build) for beta testers
- **iOS:** PWA on Safari (iOS 16.4+ supports Web Push when added to Home Screen)
- **Deploy:** Render static site, triggered by version tag

## Consequences

- Vue ecosystem is the standard for this project — no mixing frameworks
- Tailwind requires learning utility classes but eliminates CSS architecture decisions
- PrimeVue provides accessible components out of the box (a11y compliance)
- Service Worker adds complexity but is required for push notifications and offline
- Capacitor remains an escape hatch — not needed until app store distribution is required

## Related

- API repo: [sismochat_api](https://github.com/ml-net/sismochat_api)
- ADR 013 (API) — Notification strategy (defines push payload contract)
