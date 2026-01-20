# Change: Remove Intention Payment Flow

## Why
With the pivot to the seller subscription model (pivot-seller-subscription-model), buyers no longer pay to create purchase intentions. Intentions are now created as ATIVO immediately. The old payment flow code for intentions is dead code that adds complexity and confusion. This cleanup:

1. **Removes dead code** - No more PENDENTE_PAGAMENTO status, no intention payment endpoints
2. **Simplifies maintenance** - Fewer code paths to understand and test
3. **Clarifies the model** - Payment system is now exclusively for seller subscriptions
4. **Ensures consistency** - All existing PENDENTE_PAGAMENTO intentions become ATIVO

## What Changes

### **BREAKING** - Remove Intention Payment Flow

#### Backend Cleanup
1. **Remove `PENDENTE_PAGAMENTO` status** from `StatusAnuncio` enum
2. **Remove intention payment preference creation**:
   - `ProcessarPagamentoUseCase.criarPreferencia(UUID, String)`
   - `ProcessarPagamentoUseCaseImpl.criarPreferencia()`
   - `PagamentoController.criarPreferencia()` endpoint
3. **Remove intention payment webhook processing**:
   - `ProcessarPagamentoUseCaseImpl.processarPagamentoAnuncio()`
4. **Remove legacy intention creation methods**:
   - `Anuncio.criar()` (legacy, replaced by `criarAtivo()`)
   - `AnuncioService.ativarAnuncio()` (no longer needed)
5. **Simplify update/delete rules**:
   - Allow updates for ATIVO intentions (not just PENDENTE_PAGAMENTO)
   - Allow deletion for ATIVO intentions
6. **Remove unused config**:
   - `precoAnuncio` configuration parameter
   - `PagamentoResponse` DTO (for intentions)

#### Frontend Cleanup
1. **Remove `/pagamento/` pages**:
   - `/pagamento/sucesso/page.tsx`
   - `/pagamento/erro/page.tsx`
   - `/pagamento/pendente/page.tsx`
2. **Remove intention payment hooks/libs**:
   - `hooks/use-payments.ts`
   - `lib/payments.ts`
3. **Simplify my-intentions page**:
   - Remove "Pagar" button and payment flow
   - Remove PENDENTE_PAGAMENTO from status filters
   - Add delete button for ATIVO intentions
   - Show expiration date ("Expira em X dias")
4. **Show expiration date**:
   - Display expiration date on my-intentions page
   - Display expiration date on intention detail page (for owner)
5. **Clean up types**:
   - Remove `PagamentoResponse` type (for intentions)

#### Data Migration
- Run migration to set all PENDENTE_PAGAMENTO intentions to ATIVO
- This is a one-time operation (migration already drafted in V2)

## Impact

### Affected Capabilities
- `purchase-intention` → Simplified lifecycle (no payment state)
- `payment-integration` → Now exclusively for seller subscriptions

### Affected Code

**Backend (to remove/modify):**
- `StatusAnuncio.java` - Remove PENDENTE_PAGAMENTO
- `ProcessarPagamentoUseCase.java` - Remove criarPreferencia method
- `ProcessarPagamentoUseCaseImpl.java` - Major cleanup
- `PagamentoController.java` - Remove preferencia endpoint
- `Anuncio.java` - Remove legacy criar method
- `AnuncioService.java` - Remove ativarAnuncio method
- `AtualizarAnuncioUseCaseImpl.java` - Allow ATIVO updates
- `ExcluirAnuncioUseCaseImpl.java` - Allow ATIVO deletion
- `BeanConfiguration.java` - Remove precoAnuncio wiring
- `PagamentoResponse.java` - Remove (for intentions)
- `MigrarIntencoesPendentesUseCase.java` - Simplify or remove

**Frontend (to remove):**
- `app/pagamento/` - Entire folder
- `hooks/use-payments.ts` - File
- `lib/payments.ts` - File
- `app/(main)/my-intentions/page.tsx` - Remove payment imports/logic
- `types/index.ts` - Remove PagamentoResponse

### Risk Assessment
- **Low risk**: This is removal of dead code after business model change
- **Data migration**: Already handled by V2 migration script
- **Subscription payments**: Unaffected (uses separate code paths with "sub_" prefix)
