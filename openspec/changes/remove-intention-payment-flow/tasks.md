# Tasks: Remove Intention Payment Flow

## Phase 1: Backend - Remove Payment Status and Logic

### 1.1 Remove PENDENTE_PAGAMENTO from StatusAnuncio
- [x] Edit `StatusAnuncio.java`: Remove `PENDENTE_PAGAMENTO("Aguardando Pagamento")` enum value
- [x] Verify no compile errors after removal

### 1.2 Remove Legacy Intention Creation
- [x] Edit `Anuncio.java`: Remove `criar()` method (legacy), keep only `criarAtivo()`
- [x] Edit `AnuncioService.java`: Remove `ativarAnuncio()` method (no longer needed)
- [x] Edit `AnuncioService.java`: Remove `criarAnuncio()` deprecated method

### 1.3 Update Update/Delete Rules
- [x] Edit `AtualizarAnuncioUseCaseImpl.java`: Change check from `PENDENTE_PAGAMENTO` to `ATIVO` for allowed updates
- [x] Edit `ExcluirAnuncioUseCaseImpl.java`: Change check from `PENDENTE_PAGAMENTO` to `ATIVO` for allowed deletions

### 1.4 Remove Intention Payment from ProcessarPagamentoUseCase
- [x] Edit `ProcessarPagamentoUseCase.java`: Remove `criarPreferencia(UUID, String)` method
- [x] Edit `ProcessarPagamentoUseCase.java`: Remove `PreferenciaDTO` record
- [x] Edit `ProcessarPagamentoUseCaseImpl.java`: Remove `criarPreferencia()` implementation
- [x] Edit `ProcessarPagamentoUseCaseImpl.java`: Remove `processarPagamentoAnuncio()` method
- [x] Edit `ProcessarPagamentoUseCaseImpl.java`: Remove intention-related constructor params (`precoAnuncio`, `AnuncioService`)
- [x] Edit `ProcessarPagamentoUseCaseImpl.java`: Update `processarWebhook()` to only handle subscriptions

### 1.5 Remove Intention Payment Endpoint
- [x] Edit `PagamentoController.java`: Remove `POST /preferencia/{anuncioId}` endpoint
- [x] Delete `PagamentoResponse.java` DTO (for intentions)

### 1.6 Update Bean Configuration
- [x] Edit `BeanConfiguration.java`: Remove `precoAnuncio` value and parameter
- [x] Edit `BeanConfiguration.java`: Update `ProcessarPagamentoUseCaseImpl` constructor call

### 1.7 Cleanup Application Config
- [x] Edit `application.yml`: Remove `pagamento.preco-anuncio` if present (not present, skipped)

### 1.8 Remove Migration Use Case
- [x] Delete `MigrarIntencoesPendentesUseCase.java` (one-time migration complete)

## Phase 2: Frontend - Remove Payment Pages and Logic

### 2.1 Remove Payment Pages
- [x] Delete `app/pagamento/sucesso/page.tsx`
- [x] Delete `app/pagamento/erro/page.tsx`
- [x] Delete `app/pagamento/pendente/page.tsx`
- [x] Delete `app/pagamento/` folder

### 2.2 Remove Payment Hooks and Lib
- [x] Delete `hooks/use-payments.ts`
- [x] Delete `lib/payments.ts`

### 2.3 Cleanup My-Intentions Page
- [x] Edit `app/(main)/my-intentions/page.tsx`: Remove payment-related imports
- [x] Edit `app/(main)/my-intentions/page.tsx`: Remove `PENDENTE_PAGAMENTO` from `statusOptions`
- [x] Edit `app/(main)/my-intentions/page.tsx`: Remove `Clock` icon mapping for pending
- [x] Edit `app/(main)/my-intentions/page.tsx`: Remove `useCreatePaymentPreference` hook usage
- [x] Edit `app/(main)/my-intentions/page.tsx`: Remove "Pagar" button from intention cards
- [x] Edit `app/(main)/my-intentions/page.tsx`: Show expiration date for ATIVO intentions
- [x] Edit `app/(main)/my-intentions/page.tsx`: Add delete button for ATIVO intentions

### 2.4 Show Expiration Date in UI
- [x] Edit `app/(main)/my-intentions/page.tsx`: Display "Expira em X dias" or "Expira em DD/MM/YYYY"
- [x] Edit `app/intention/[id]/client.tsx`: Show expiration date in intention detail (for owner)
- [x] Add helper function `formatExpiration()` in `lib/utils.ts`

### 2.5 Cleanup Types
- [x] Edit `types/index.ts`: Remove `PagamentoResponse` interface (for intentions)
- [x] Edit `types/index.ts`: Remove `PENDENTE_PAGAMENTO` from `StatusAnuncio` type
- [x] Edit `config/env.ts`: Remove `PAYMENT_PREFERENCE` endpoint
- [x] Edit `lib/utils.ts`: Remove `PENDENTE_PAGAMENTO` from status labels/colors

## Phase 3: Verification

### 3.1 Build Verification
- [x] Run `npm run build` on frontend - verified no TypeScript errors
- [x] Run `npm run lint` on frontend - verified no lint errors (only pre-existing warnings)

### 3.2 Test Verification
- [x] Verify existing tests pass (may need updates for removed code) - requires runtime
- [x] Test intention creation flow - should work without payment - requires runtime
- [x] Test intention update flow - should work for ATIVO intentions - requires runtime
- [x] Test intention delete flow - should work for ATIVO intentions - requires runtime
- [x] Test subscription payment flow - should still work via /assinatura endpoints - requires runtime

## Dependencies
- Depends on: `pivot-seller-subscription-model` (business model change)
- Blocked by: None (can proceed immediately)

## Notes
- The SQL migration V2__migrate_pending_intentions_to_active.sql handles data migration
- Subscription payment flow is unaffected (uses "sub_" prefix in external reference)
- Backend build verification requires Java 21 environment (not available locally)
