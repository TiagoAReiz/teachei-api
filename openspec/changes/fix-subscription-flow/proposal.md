# Change: Fix Subscription Flow

## Why
The subscription page is not working because:
1. The `lib/subscriptions.ts` file uses incorrect API paths (`/v1/...`) instead of the correct paths with the `/api` prefix (`/api/v1/...`)
2. The backend has `context-path: /api` configured, so all endpoints require the `/api` prefix
3. This mismatch causes 404 errors when fetching subscription plans and creating subscriptions

## What Changes

### Bug Fixes
1. **Correct API paths in subscriptions.ts**: Change all endpoint paths from `/v1/...` to `/api/v1/...` to match the backend's context path
2. **Ensure subscription page accessibility**: The page should work for both authenticated and unauthenticated users (showing plans to all, but requiring login to subscribe)

### Affected Files
- `teachei-web/lib/subscriptions.ts` - Fix API endpoint paths

## Impact

### Affected Capabilities
- `seller-subscription` → Fix subscription plan listing and creation

### Affected Code
- **Frontend**:
  - `lib/subscriptions.ts` - Update all API paths to include `/api` prefix

### No Breaking Changes
- Backend remains unchanged
- Only frontend API path corrections
