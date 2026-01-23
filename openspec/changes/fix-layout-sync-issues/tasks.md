# Tasks: Fix Layout Sync Issues, Filters, and Intention Display

## 1. Synchronize Sidebar State
- [x] 1.1 Move sidebar collapsed state management to `MainLayout`
- [x] 1.2 Pass `isCollapsed` and `onToggleCollapse` as props to `Sidebar`
- [x] 1.3 Pass `isCollapsed` and `onToggleCollapse` to `FilterPanel` from `Sidebar`
- [x] 1.4 Update `MainLayout` to listen for storage events and update its state

## 2. Content Layout Adjustment
- [x] 2.1 When sidebar is collapsed, add max-width and centering to content
- [x] 2.2 Ensure smooth transition when sidebar collapses/expands

## 3. Save Location to Profile
- [x] 3.1 In `review/page.tsx`, check if cidade/estado differs from user profile
- [x] 3.2 Update profile with new location when publishing intention (silently, no dialog)
- [x] 3.3 Include cidade and estado in the updateProfile call alongside whatsapp

## 4. Fix Model Filter
- [x] 4.1 In `filter-panel.tsx`, when applying filters: if versao is empty, send all version codes for selected modelo
- [x] 4.2 If versao is selected, send only that version code
- [x] 4.3 Apply same logic in `filter-sidebar.tsx`
- [x] 4.4 Update URL params to use `modelos` (comma-separated codes) or single `modeloCodigo`
- [x] 4.5 Update `page.tsx` to handle the new filter format

## 5. Fix Intention Creation Data
- [x] 5.1 In `review/page.tsx`, ensure `modeloBaseNome` is sent to backend
- [x] 5.2 Ensure `versoes` array is properly populated with selected versions
- [x] 5.3 Verify intention card shows versions as chips (already implemented)

## 6. Validation
- [ ] 6.1 Test sidebar collapse/expand updates content layout
- [ ] 6.2 Verify localStorage persistence works across page reloads
- [ ] 6.3 Test intention publishing redirects to feed correctly
- [ ] 6.4 Verify location is saved to profile after publishing intention
- [ ] 6.5 Test model filter returns correct results
- [ ] 6.6 Verify intention displays all versions as chips
