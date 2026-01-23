# Tasks: Simplify Year Selection and Add Model Grouping to Filters

## 1. Web Year Selection
- [x] 1.1 Create utility function to generate year options (current year - 30 to current year + 1)
- [x] 1.2 Remove `useAnos` hook usage from `teachei-web/app/create/specs/page.tsx`
- [x] 1.3 Replace `yearOptions` useMemo with static year generation
- [x] 1.4 Remove `isLoadingAnos` and FIPE year loading states from UI
- [x] 1.5 Remove "(anos FIPE)" success indicator from year label

## 2. Mobile Year Selection
- [x] 2.1 Update `YEARS` constant in `teachei-mobile/app/create/specs.tsx` to use dynamic year calculation
- [x] 2.2 Change from hardcoded `2024 - i` to `new Date().getFullYear() + 1 - i`

## 3. Web Filter Model Grouping
- [x] 3.1 Import `groupModelsByBase` and `getVersionName` in `filter-panel.tsx`
- [x] 3.2 Add `modeloBase` and `versao` to FilterState (replace single `modelo` field)
- [x] 3.3 Group models using `groupModelsByBase` when building options
- [x] 3.4 Show base model selector first, then optional version selector
- [x] 3.5 Update URL params to use `modelo` (base) and `versao` (optional)
- [x] 3.6 Apply same changes to `filter-sidebar.tsx` (mobile sidebar)

## 4. Update Year Options in Filters
- [x] 4.1 Update `filter-panel.tsx` year options to include next year
- [x] 4.2 Update `filter-sidebar.tsx` year options to include next year

## 5. Validation
- [x] 5.1 Test year selector shows correct range (includes next year)
- [x] 5.2 Verify year range validation still works (min <= max)
- [x] 5.3 Test model grouping in filters shows correct groups
- [x] 5.4 Verify version selector appears after selecting base model
- [x] 5.5 Confirm filter results work correctly with new model/version params
