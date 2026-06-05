# ADR 003 — Authentication flow and device identity

## Status

Accepted

## Context

SiSMoChat has two user roles with fundamentally different authentication needs:

- **Parent**: traditional email/password authentication, manages family settings
- **Child**: no credentials, identity is bound to the device (provisioned by parent)

The client must handle both roles on any device, with a single app binary (PWA).

## Decision

### Identity model

| Role | Auth method | localStorage profile | Home view |
|------|-------------|---------------------|-----------|
| Parent | Email/password login | `__parent__` | Dashboard (admin) |
| Child | Device binding (provisioned by parent) | child profile object | Chat list (user) |

### App startup flow

```
App open → Splash screen (always)
  - Show branding / animation
  - Display "Login parent" link (always visible)
  - Background: load localStorage, check network, init SW
  - After splash (few seconds) →
      └─ localStorage has user profile?
           ├─ YES (__parent__) → Dashboard (admin mode)
           ├─ YES (child) → Chat list (user mode)
           └─ NO → Login screen (parent auth)
```

### Parent device

- Parent installs app → no profile → sees login screen after splash
- Authenticates with email/password → `__parent__` profile stored in localStorage
- **Dashboard (admin mode)**: create/manage child profiles, authorize contacts, provisioning
- **Chat (user mode)**: parent chats with children as `__parent__`
- Navigation between admin and user mode via tab/menu (not an identity switch)

### Child device

- Parent provisions child from dashboard → generates activation (link/QR/code)
- Child device receives association → child profile stored in localStorage
- App opens → splash → enters chat directly (no login)
- No dashboard, no admin mode

### Reprovisioning

- Device lost or changed: parent re-provisions from dashboard
- Old device association is invalidated

### Splash screen

Serves multiple purposes:
- Branding and "advertising" space
- Always shows "Login parent" link (useful on child device if parent needs access)
- Provides time for async initialization (localStorage read, network check, SW registration)
- Displayed for a fixed short duration (2–3 seconds), then routes based on profile state

### Settings menu

Available to both roles, hosts:
- Color theme selection (see ADR 002)
- Login parent (on child devices, or to switch accounts)
- Future features (notifications, privacy, etc.)

## Consequences

- No child authentication logic needed in v0.2.0 — auth milestone covers parent only
- Child onboarding (provisioning) belongs to the parent dashboard (v0.3.0)
- The splash screen is a mandatory route, not optional — every cold start passes through it
- Parent can access any device (child's included) via "Login parent" without disrupting the child profile
- Device loss = parent action required (reprovisioning), no self-service for child

## Related

- ADR 002: Visual design direction
- Epic #2: Authentication (parent only)
- Epic #3: Parent dashboard (child provisioning)
- Epic #4: Messaging (user mode for both roles)
