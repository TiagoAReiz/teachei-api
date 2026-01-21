# Change: Fix Subscription Cards Alignment

## Why
The subscription plan cards on `/assinatura` page are misaligned:
1. The middle card (Trimestral) uses `md:-translate-y-2` to appear elevated
2. The "Recomendado" badge uses `absolute -top-3` positioning
3. The grid container has no top padding to accommodate these styles
4. Result: The badge is cut off and cards appear misaligned

## What Changes

### UI Fix
1. **Add top padding to the grid container**: Add `pt-6` to accommodate the elevated card and badge
2. **Adjust card alignment**: Ensure all cards align at the bottom using `items-end` on the grid

### Affected Files
- `teachei-web/app/assinatura/page.tsx` - Fix grid container styles

## Impact

### Affected Capabilities
- `seller-subscription` → Fix subscription page UI

### No Breaking Changes
- Pure CSS/styling fix
- No logic changes
