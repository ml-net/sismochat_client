# Contributing to SiSMoChat Client

## Local Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:ml-net/sismochat_client.git
   cd sismochat_client
   ```

2. Create a `.env` file:
   ```
   VITE_API_URL=http://localhost:3000/api/v1
   VITE_VAPID_PUBLIC_KEY=your_vapid_public_key
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

   App available at http://localhost:5173

## Building

```bash
npm run build
```

Output in `dist/` — preview with `npm run preview`.

## Git Workflow

1. Create a branch from `main`:
   ```bash
   git checkout -b <type>/<short-description>
   ```

2. Make your changes and commit following [Conventional Commits](https://www.conventionalcommits.org/):
   ```
   <type>(<scope>): <description>
   ```

   Allowed types:
   - `feat` — new feature
   - `fix` — bug fix
   - `refactor` — code change that neither fixes a bug nor adds a feature
   - `docs` — documentation only
   - `chore` — maintenance (deps, config, CI)
   - `test` — adding or updating tests
   - `style` — formatting, no code change
   - `perf` — performance improvement

   Examples:
   ```
   feat(auth): add login view
   fix(chat): handle empty message input
   docs: update README with env vars
   ```

3. Push and open a PR:
   ```bash
   git push -u origin <branch-name>
   ```

4. Wait for CI to pass, then squash merge.

## Branch Protection

- Direct pushes to `main` are blocked
- All changes go through PRs with CI checks

## i18n

All user-facing strings must use translation keys via `vue-i18n`. Never hardcode text in templates.

```vue
<template>
  <p>{{ t('chat.noMessages') }}</p>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>
```

Locale files are in `src/i18n/locales/`.

## Get in Touch

- Open a [GitHub Discussion](https://github.com/ml-net/sismochat_client/discussions) for questions, ideas, or feedback
- Open an [Issue](https://github.com/ml-net/sismochat_client/issues) for bugs or feature requests
- Email: [marco@marcolupi.net](mailto:marco@marcolupi.net)

## Team

| Name | Role | GitHub |
|------|------|--------|
| Marco Lupi | Creator & maintainer | [@ml-net](https://github.com/ml-net) |
