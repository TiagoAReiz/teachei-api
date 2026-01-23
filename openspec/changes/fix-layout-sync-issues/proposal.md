# Change: Fix Layout Sync Issues, Filters, and Intention Display

## Why
1. **Sidebar collapse not syncing with content**: When the filter sidebar is collapsed/expanded, the main content area doesn't adjust its layout. The `MainLayout` has its own `isSidebarCollapsed` state that isn't synced with the `Sidebar` component's state.

2. **Potential redirect issue after publishing**: User reports being redirected to creation page instead of feed after publishing an intention.

3. **Location not saved to profile**: When user fills in cidade/estado during intention creation, this information should be saved to their profile for future use.

4. **Model filter doesn't find results**: The filter now uses base model names (e.g., "Onix") but the backend expects FIPE model codes (`modeloCodigo`). Need to revert to using model codes or implement proper search.

5. **Intention card shows random model**: When multiple versions are selected, the `modeloNome` shows just one version instead of using `modeloBaseNome` and showing versions as chips like colors.

## What Changes

### Sidebar State Synchronization
- Lift the sidebar collapsed state from `Sidebar` to `MainLayout` and pass it down
- Ensure content area adjusts margin/centering when sidebar collapses

### Save Location to Profile
- Update user profile with the new location when publishing intention (silently, no dialog)

### Fix Model Filter
- Keep base model grouping in the filter UI
- When user selects a base model WITHOUT a specific version → send ALL version codes for that model
- When user selects a specific version → send only that version code
- Backend receives comma-separated version codes to match against

### Fix Intention Display
- Ensure `modeloBaseNome` is properly set when creating intention
- Display versions as chips in the intention card (similar to colors)
- Don't show a random version as the main model name

## Impact
- Affected specs: `web-layout`, `web-intention-creation`, `web-feed-filters`
- Affected code:
  - `teachei-web/components/layout/main-layout.tsx`
  - `teachei-web/components/layout/sidebar.tsx`
  - `teachei-web/components/layout/filter-panel.tsx`
  - `teachei-web/components/intentions/filter-sidebar.tsx`
  - `teachei-web/app/create/review/page.tsx`
  - `teachei-web/app/(main)/page.tsx`
- **No backend changes required**
- **No breaking changes**
