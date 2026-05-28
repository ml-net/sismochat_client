# SiSMoChat Client

Secure parent-controlled messaging app — Vue 3 PWA client.

## Overview

SiSMoChat is a privacy-first messaging platform designed for families. Parents control who their children can communicate with, while end-to-end encryption ensures message privacy.

This repository contains the definitive client application, built as a Progressive Web App.

## Stack

- **Vue 3** (Composition API) — UI framework
- **Vite** — build tool
- **Tailwind CSS** + **PrimeVue** — styling and components
- **Pinia** — state management
- **Vue Router** — navigation
- **vue-i18n** — internationalization
- **vite-plugin-pwa** — Service Worker and PWA manifest

## Prerequisites

- Node.js >= 22.22.1
- npm >= 9

## Local development

```bash
git clone git@github.com:ml-net/sismochat_client.git
cd sismochat_client
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

### Environment variables

Create a `.env` file:

```
VITE_API_URL=http://localhost:3000/api/v1
VITE_VAPID_PUBLIC_KEY=your_vapid_public_key
```

- `VITE_API_URL` — SiSMoChat API base URL
- `VITE_VAPID_PUBLIC_KEY` — VAPID public key for push subscription (same as server)

## Build

```bash
npm run build
```

Output in `dist/` — static files ready for deployment.

## Deployment

Deployed on Render as a static site. Deploy is triggered by version tags (`v*`).

Production URL: TBD (will be `https://chat.marcolupi.net` or similar)

## Architecture

- **PWA** — installable, works offline, receives push notifications
- **Service Worker** — handles push events, caching strategy
- **E2E encryption** — RSA key pairs managed client-side (server cannot read messages)
- **Client is source of truth** — messages stored locally, server is a relay
- **State certificate** — JWT-based backup of family state, stored in localStorage

## API

The client communicates with [sismochat_api](https://github.com/ml-net/sismochat_api) (v0.10.0+).

API documentation: [Swagger](https://sismochat-api.onrender.com/api-docs)

## Contributing

Same conventions as the API repo:
- Conventional Commits (feat, fix, docs, chore, etc.)
- Branch naming: `type/issue-short-desc`
- Draft PRs, squash merge, delete branch after merge
- i18n: all user-facing strings must use translation keys

## License

[GNU Affero General Public License v3.0](LICENSE)
