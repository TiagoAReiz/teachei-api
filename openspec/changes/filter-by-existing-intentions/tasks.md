# Tasks: Filter by Existing Intentions Only

## 1. Backend - New Endpoint
- [x] 1.1 Create `FiltrosDisponiveisResponse` DTO with tipos, marcas, modelos
- [x] 1.2 Add repository method to aggregate distinct filter values from active intentions
- [x] 1.3 Add service method `getFiltrosDisponiveis(tipo?, marcaCodigo?)` 
- [x] 1.4 Add controller endpoint `GET /api/v1/anuncios/filtros`
- [x] 1.5 Write integration tests for the new endpoint

## 2. Frontend - New Hook
- [x] 2.1 Add `INTENTION_FILTERS` endpoint to `config/env.ts`
- [x] 2.2 Create `getAvailableFilters` function in `lib/intentions.ts`
- [x] 2.3 Create `useAvailableFilters` hook in `hooks/use-intentions.ts`
- [x] 2.4 Add types `AvailableFilters` to `types/index.ts`

## 3. Frontend - Update Filter Components
- [x] 3.1 Update `filter-panel.tsx` to use `useAvailableFilters` instead of `useMarcas`/`useModelos`
- [x] 3.2 Update `filter-sidebar.tsx` to use `useAvailableFilters` instead of `useMarcas`/`useModelos`
- [x] 3.3 Ensure vehicle type buttons only show types with intentions
- [x] 3.4 Ensure brand dropdown only shows brands with intentions
- [x] 3.5 Ensure model dropdown only shows models with intentions

## 4. Validation
- [x] 4.1 Test filter shows only options with existing intentions
- [x] 4.2 Verify cascading behavior (selecting type filters brands, selecting brand filters models)
- [x] 4.3 Verify empty state when no intentions exist for a category
- [x] 4.4 Verify intention creation still uses FIPE API (unchanged)
