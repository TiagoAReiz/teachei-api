# Change: Simplify Year Selection and Add Model Grouping to Filters

## Why
1. **Year Selection**: The current intention creation flow fetches FIPE years from the API, but buyers only need to specify a year range (e.g., "2020 to 2024") rather than specific FIPE year codes. A client-side year generator is simpler, faster, and more reliable.

2. **Model Filters**: The feed filters show a flat list of all models, while intention creation groups models by base name (e.g., "Onix") with optional version selection. This inconsistency confuses users. The filters should work the same way as intention creation for a consistent UX.

## What Changes

### Year Selection
- **Web**: Remove `useAnos` hook usage from `/create/specs` page
- **Web**: Replace FIPE year fetching with client-side year generation (current year - 30 to current year + 1)
- **Mobile**: Update static `YEARS` constant to use dynamic year calculation (currently hardcoded to 2024)
- Remove loading states and FIPE-specific year UI indicators

### Model Filter Grouping
- **Web Filters**: Group models by base name in `filter-panel.tsx` and `filter-sidebar.tsx`
- Add optional version selection after selecting base model
- Reuse existing `groupModelsByBase` and `getVersionName` utilities from `lib/vehicles.ts`

## Impact
- Affected specs: `web-intention-creation`, `web-feed-filters`
- Affected code:
  - `teachei-web/app/create/specs/page.tsx` (year selection)
  - `teachei-mobile/app/create/specs.tsx` (year selection)
  - `teachei-web/components/layout/filter-panel.tsx` (model grouping)
  - `teachei-web/components/intentions/filter-sidebar.tsx` (model grouping)
- **No backend changes required**
- **No breaking changes** - this improves UX without affecting API contracts
