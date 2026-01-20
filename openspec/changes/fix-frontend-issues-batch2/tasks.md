# Tasks: Fix Frontend Issues Batch 2

## 1. Fix Favorites on Intention Detail Page
- [x] 1.1 Update IntentionDetailsClient to import useSavedIntentions hook
- [x] 1.2 Replace useState with useSavedIntentions for save state
- [x] 1.3 Replace Heart icon with Bookmark icon
- [x] 1.4 Update button onClick to use toggleSave
- [ ] 1.5 Test saving/unsaving persists to localStorage

## 2. Add Delete Intention UI
- [x] 2.1 Add Trash2 icon import to my-intentions page
- [x] 2.2 Add delete button to intention cards (only for PENDENTE_PAGAMENTO)
- [x] 2.3 Create confirmation dialog component
- [x] 2.4 Implement delete handler using useDeleteIntention hook
- [x] 2.5 Add success/error toast notifications
- [ ] 2.6 Test delete flow end-to-end

## 3. Remove Sidebar Vehicle Type Filter
- [x] 3.1 Identify filter section in sidebar.tsx
- [x] 3.2 Remove the filter section, keep navigation only
- [x] 3.3 Verify sidebar layout remains correct

## 4. Add City/State to Intention Creation
- [x] 4.1 Add cidade and estado to CreateIntentionState in store
- [x] 4.2 Add location inputs to review page
- [x] 4.3 Pre-fill with user profile data if available
- [x] 4.4 Include location in CreateAnuncioRequest
- [x] 4.5 Update types if needed for request payload
- [ ] 4.6 Test location appears on intention detail

## 5. Add Mileage Range Fields (Backend)
- [x] 5.1 Add quilometragemMinima/quilometragemMaxima to VeiculoInfo domain model
- [x] 5.2 Update CriarAnuncioRequest DTO
- [x] 5.3 Update CriarAnuncioUseCase command
- [x] 5.4 Update AnuncioResponse DTO

## 6. Add Mileage Range Fields (Frontend)
- [x] 6.1 Add mileage fields to CreateIntentionState store
- [x] 6.2 Add mileage range inputs to specs page
- [x] 6.3 Include mileage in CreateAnuncioRequest
- [x] 6.4 Update VeiculoResponse type with mileage

## 7. Add Model Filter to Feed
- [x] 7.1 Update IntentionFilters to include brand dropdown
- [x] 7.2 Add model dropdown (loads on brand selection)
- [x] 7.3 Update URL params handling for marca/modelo
- [x] 7.4 Pass filters to useInfiniteIntentions
- [x] 7.5 Update lib/intentions.ts to pass marca/modelo filters

## 8. Fix Payment Webhook
- [x] 8.1 Add enhanced logging to webhook endpoint
- [x] 8.2 Log request headers and payload
- [ ] 8.3 Verify webhook URL is correct in Mercado Pago config
- [x] 8.4 Implement fallback polling on payment success page
- [x] 8.5 Add retry button if status doesn't update

## 9. Validation
- [ ] 9.1 Test favorites on detail page persists
- [ ] 9.2 Test delete intention flow
- [ ] 9.3 Test city/state saved with intention
- [ ] 9.4 Test mileage fields work
- [ ] 9.5 Test model filter on feed
- [ ] 9.6 Test payment status updates (if webhook works)
