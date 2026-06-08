# ADR 002 — Visual design direction

## Status

Accepted

## Context

SiSMoChat's primary target audience is pre-teens (10–13 years old). The app must feel appealing enough that kids *want* to use it, despite the underlying parental control features. A "corporate" or flat UI would fail to engage this demographic.

Research on Gen Z / young teen design preferences (PageFlows, DesignRush, 2024–2026 trends) indicates a strong affinity for:
- Dark interfaces (Discord, gaming apps, TikTok)
- Neon/vibrant accent colors (purple, cyan, magenta)
- Glassmorphism (frosted glass, backdrop blur, depth)
- Personalization (themes, customizable appearance)
- Mobile-first, responsive, fast

Reference apps that resonate with this age group: Discord, Telegram, game launchers (Steam, Epic), Spotify.

## Options explored

Three visual variants were prototyped (branch `spike/design-exploration`):

### 1. Dark + Neon

- Dark gray background (#030712), animated gradient blobs
- Solid dark card with subtle glow border
- Input fields with colored glow on focus
- CTA button: gradient with glow shadow
- **Feeling:** gaming, energetic, modern

### 2. Glassmorphism

- Very dark navy background (#0f0f23), large colorful blobs (fuchsia/blue/emerald)
- Semi-transparent card (backdrop-blur, white/5 bg, white/10 border)
- Inputs inherit the glass effect
- CTA button: translucent gradient fuchsia → blue
- **Feeling:** futuristic, premium, depth

### 3. Blurple (Discord-like)

- Solid indigo/violet background (#5865F2)
- Dark card (#313338), minimal decoration
- Standard dark inputs, no glow effects
- CTA button: solid blurple
- **Feeling:** clean, familiar, but less distinctive

## Decision

**Dark + Neon** with **Emerald (green-blue)** as default color palette.

User testing feedback (target audience, pre-teen tester):
- Preferred the Dark+Neon style over Glassmorphism and Blurple
- Requested green-blue palette instead of the original purple-cyan
- Expressed interest in being able to choose colors (e.g. violet for sent messages)

This led to the decision to support **selectable color themes** as a personalization feature. The design shell (dark background, glow effects, card structure, animations) remains constant — only the accent color pair changes.

### Default palette: Emerald

| Role | Value |
|------|-------|
| Background | gray-950 (#030712) |
| Card bg | gray-900/80 |
| Card border | emerald-500/20 |
| Primary accent (buttons, sent messages, active nav) | emerald-600 → emerald-500 |
| Secondary accent (focus glow, links, timestamps) | blue-500 → blue-400 |
| Glow/shadow | rgba(16, 185, 129, 0.3) |
| Text | white, gray-300, gray-400 |

### Selectable color themes (future)

| Theme | Primary (sent bubbles, CTA, accents) | Secondary (focus, links, details) |
|-------|--------------------------------------|-----------------------------------|
| 🟢 Emerald (default) | emerald/green neon | blue |
| 🟣 Violet | purple/violet | cyan |
| 🔵 Ocean | blue electric | cyan/teal |

Additional themes may be added later. Implementation via CSS custom properties on `:root`, with user preference stored in localStorage.

### Design principles

| Principle | Implementation |
|-----------|---------------|
| Dark-first | Dark backgrounds, light text, reduced eye strain |
| Vibrant accents | Neon/gradient colors for interactive elements |
| Depth & glow | Shadows, blurs, glow effects to create visual interest |
| Mobile-first | 320px minimum, touch-friendly tap targets (44px+) |
| Accessible | WCAG AA contrast on text, focus indicators, aria attributes |
| Animated but not distracting | Subtle transitions (300ms), hover/focus feedback, no autoplay |
| Personalizable | Selectable color themes (CSS variables) |

### Message bubbles

- **Sent (mine):** right-aligned, primary accent gradient, glow shadow
- **Received (theirs):** left-aligned, neutral dark (gray-800/80), subtle border

### Typography

- Font: Inter (or system-ui as fallback) — clean, modern, highly readable
- Sizes: base 16px, responsive scaling
- App name: bold, glow/shadow effect in primary accent color

### Layout structure

- **Auth pages:** full-screen background + centered card (max-w-sm)
- **App shell (post-auth):** header + content + bottom nav (mobile-first)
- No traditional header/navbar on auth pages

## Implementation approach

- All design tokens as Tailwind theme extensions (CSS custom properties)
- PrimeVue components styled via `pt` (passthrough) to match the dark theme
- Glow/blur effects via Tailwind utilities (shadow, backdrop-blur, ring)
- Background decorations as absolute-positioned divs (blobs/gradients)
- Theme switching: swap CSS variable set on `:root` based on user selection

## Consequences

- Dark theme requires careful contrast testing (WCAG AA compliance)
- Glow effects are CSS-only (no JS runtime cost; may incur minor paint/compositing overhead on low-end devices)
- Parents using the app (registration, dashboard) will see the same dark theme — acceptable since they interact briefly
- Theme personalization is a dedicated story in the personalization epic (post-v0.4.0)

## Open questions

- [ ] Logo/mascot — not blocking for v0.2.0, text-only app name for now
- [ ] Should the parent dashboard have a different (lighter) theme?

## Related

- Spike branch: `spike/design-exploration`
- Story #40: Auth UI layout
- Epic #2: Authentication
