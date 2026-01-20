# Design: Fix Frontend Issues Batch 2

## Overview
This document describes the technical approach for fixing multiple frontend issues and adding new filtering capabilities.

## Architecture

### 1. Favorites on Intention Detail Page
**Current State**: `IntentionDetailsClient` uses local `useState(false)` for favorites.
**Solution**: Import and use `useSavedIntentions` hook (already created in previous change).

```tsx
// Before
const [isSaved, setIsSaved] = useState(false);

// After
const { isSaved, toggleSave } = useSavedIntentions();
const saved = isSaved(intention.id);
```

### 2. Delete Intention UI
**Current State**: Backend has `DELETE /v1/anuncios/{id}` endpoint. Frontend has `useDeleteIntention` hook. No UI.
**Solution**: Add delete button to intention cards in my-intentions page with confirmation dialog.

Flow:
1. User clicks trash icon on their intention card
2. Confirmation dialog appears
3. On confirm, call `deleteIntention` mutation
4. Invalidate queries and show success toast

### 3. City/State in Intention Creation
**Current State**: Contact info (city/state) comes from user profile, not intention-specific.
**Solution**: Add optional city/state fields in the review step of intention creation that override profile defaults.

### 4. Payment Webhook Fix
**Current State**: Payment received but status stays PENDENTE_PAGAMENTO.
**Potential Issues**:
- Webhook URL not reachable from Mercado Pago
- Webhook secret not configured
- IPN notifications not enabled

**Solution**:
- Add logging to webhook endpoint
- Verify webhook URL is publicly accessible
- Consider polling as fallback when user returns from payment

### 5. Remove Sidebar Type Filter
**Current State**: Sidebar has vehicle type filter that duplicates IntentionFilters component.
**Solution**: Remove the filter section from sidebar, keep only navigation items.

### 6. Add Mileage Range Filter
**Current State**: No mileage field in VeiculoInfo model.
**Solution**:
- Backend: Add `quilometragemMinima` and `quilometragemMaxima` to VeiculoInfo domain model
- Frontend: Add mileage range inputs to specs page and filter component

### 7. Add Model Filter to Feed
**Current State**: Feed filters by vehicle type only.
**Solution**: 
- Add brand/model cascading dropdowns to IntentionFilters
- Pass marca/modelo as query params to API
- Backend already supports filtering by these fields

## Data Flow

```
User creates intention with location
           ↓
CreateAnuncioRequest includes cidade/estado
           ↓
Backend saves location with intention
           ↓
Feed can filter by location (future)
```

## Dependencies
- useSavedIntentions hook (already exists)
- useDeleteIntention hook (already exists)
- Backend delete endpoint (already exists)
