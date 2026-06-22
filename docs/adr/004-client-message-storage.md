# ADR 004 — Client-side message storage with IndexedDB

## Status

Accepted — implementation in v0.4.0 (Story #121, Task #126).

## Context

SiSMoChat uses a relay pattern: messages are fetched from the server, stored locally, and ACK'd (deleted from server). The client becomes the source of truth for message history.

Initial implementation used `localStorage`, but this has critical limitations:

- **Size limit**: 5–10 MB depending on browser (Chrome 5 MB, Safari 5 MB, Firefox 10 MB)
- **E2E encryption overhead**: messages are base64-encoded ciphertext (+33% size)
- **Synchronous API**: blocks the main thread on large reads/writes
- **No indexing**: retrieving messages by contact requires parsing the entire dataset

For a chat application, even moderate usage (hundreds of messages with media references) would exhaust localStorage quickly.

## Options considered

| Option | Capacity | Complexity | Notes |
|--------|----------|-----------|-------|
| localStorage | 5–10 MB | Low | Already hitting limits with encrypted messages |
| **IndexedDB** | Hundreds of MB (browser-managed) | Medium | Standard for PWA structured data, async, indexed |
| SQLite WASM (wa-sqlite, sql.js) | Same as IndexedDB (backed by OPFS/IDB) | High | Powerful queries, but overkill for key-value by contact |

## Decision

Use **IndexedDB** via the `idb` wrapper library for message persistence.

### Storage structure

- Database: `sismochat_messages_{userId}`
- Object store: `messages`, keyPath: `id`
- Index: `by-contact` on a `contactId` field for efficient per-conversation retrieval

### Interface

The `useMessageStore` Pinia store keeps the same public API (`hydrate`, `send`, `relay`, `getMessages`, etc.). Only the internal persistence layer changes from localStorage to IndexedDB. This isolates the storage decision from the rest of the application.

### Migration

On first load, if localStorage contains legacy message data (`sismochat_messages_*` keys), migrate to IndexedDB and remove the old keys.

## Consequences

- Message storage scales to realistic chat volumes without browser quota issues
- Async reads/writes do not block the UI thread
- Adds `idb` as a dependency (~1 KB gzipped)
- Future: could add more indexes (by timestamp, by type) without redesigning the store
- IndexedDB data is still clearable by the user (browser settings) — this is acceptable since the app already warns that message history is device-bound

## Related

- ADR 003: Authentication flow and device identity (profile storage remains in localStorage — small, non-growing data)
- Story #121: Messaging service and local storage
- Issue #101: Private key storage evaluation (same IndexedDB could host keys in future)
