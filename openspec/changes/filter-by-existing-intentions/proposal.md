# Change: Filter by Existing Intentions Only

## Why
Currently, the filter dropdowns show all vehicle types, brands, and models from the FIPE API, which includes many options that have zero intentions in the system. This creates a poor user experience as users select filters only to find no results. The filter should only display options that actually have active intentions, making the filter more useful and the interface cleaner.

## What Changes

### Backend
- New endpoint `/api/v1/anuncios/filtros` that returns available filter options based on existing active intentions
- Returns only vehicle types, brands, and models that have at least one active intention
- Cascading filters: available brands depend on selected type, available models depend on selected brand

### Frontend
- New hook `useAvailableFilters` to fetch filter options from the new endpoint
- Replace `useMarcas`/`useModelos` with the new endpoint in filter components
- Filter options are now dynamic based on what's actually in the system

## Impact
- Affected specs: `feed-filters` (new capability)
- Affected code:
  - **Backend**:
    - `AnuncioController.java` - new endpoint
    - `AnuncioService.java` - aggregation logic
    - `AnuncioRepository.java` - query for distinct values
  - **Frontend**:
    - `teachei-web/hooks/use-intentions.ts` - new hook
    - `teachei-web/components/layout/filter-panel.tsx`
    - `teachei-web/components/intentions/filter-sidebar.tsx`
- **No breaking changes** - FIPE hooks remain for intention creation flow
