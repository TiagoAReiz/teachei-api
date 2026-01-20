# Design: Remove Intention Payment Flow

## Context
The TeAchei platform pivoted from a pay-per-intention model (buyers pay to publish) to a seller subscription model (sellers pay to see contacts). The intention payment code is now dead but still present, causing confusion.

## Key Decisions

### Decision 1: Remove PENDENTE_PAGAMENTO Status Entirely
**Rationale**: With free intention creation, there's no state where an intention is "waiting for payment". The lifecycle simplifies to:
- `ATIVO` → Created and visible
- `EXPIRADO` → Past expiration date
- `CANCELADO` → User cancelled
- `FINALIZADO` → User marked as completed (found what they wanted)

**Alternative considered**: Keep status for backwards compatibility
**Rejected because**: Dead code is worse than breaking changes - no intention should ever be in this state again.

### Decision 2: Keep Webhook Handler, Remove Intention Processing
**Rationale**: The webhook endpoint (`POST /v1/pagamentos/webhook`) is still needed for subscription payments. We only remove the intention-specific processing branch.

```
Webhook flow:
├── type=payment
│   ├── externalReference starts with "sub_" → processarPagamentoAssinatura() [KEEP]
│   └── externalReference is anuncioId → processarPagamentoAnuncio() [REMOVE]
```

### Decision 3: Allow ATIVO Intention Updates
**Rationale**: Previously, only PENDENTE_PAGAMENTO intentions could be updated (pre-payment). Now intentions are created as ATIVO, but users should still be able to update their specifications while active.

**Business rule**: Owner can update ATIVO intentions. Once EXPIRADO/CANCELADO/FINALIZADO, no updates allowed.

### Decision 4: Data Migration Strategy
**Rationale**: Existing PENDENTE_PAGAMENTO intentions (if any) should become ATIVO so buyers aren't blocked.

**Approach**:
1. SQL migration already exists (V2__migrate_pending_intentions_to_active.sql)
2. This runs on Cosmos DB via the MigrarIntencoesPendentesUseCase
3. After migration, PENDENTE_PAGAMENTO enum value can be safely removed

### Decision 5: Frontend Cleanup Scope
**Rationale**: Remove all `/pagamento/` pages since they're only for intention payment callbacks. Subscription payment callbacks use `/assinatura/` routes.

**Pages to remove**:
- `/pagamento/sucesso` → Intention payment success
- `/pagamento/erro` → Intention payment error
- `/pagamento/pendente` → Intention payment pending

**Pages to keep**:
- `/assinatura/sucesso` → Subscription payment success (already exists)
- `/assinatura/erro` → Subscription payment error (to create if needed)
- `/assinatura/pendente` → Subscription payment pending (to create if needed)

## Component Diagram After Cleanup

```
┌─────────────────────────────────────────────────────────────┐
│                     Payment System                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────┐    ┌────────────────────────────┐ │
│  │ AssinaturaController│    │ PagamentoController        │ │
│  │ POST /assinaturas   │    │ POST /pagamentos/webhook   │ │
│  └──────────┬──────────┘    └─────────────┬──────────────┘ │
│             │                              │                │
│             ▼                              ▼                │
│  ┌─────────────────────┐    ┌────────────────────────────┐ │
│  │CriarAssinaturaUseCase│   │ProcessarPagamentoUseCase   │ │
│  │  (create sub pref)   │   │  (webhook only now)        │ │
│  └──────────┬──────────┘    └─────────────┬──────────────┘ │
│             │                              │                │
│             ▼                              ▼                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              PagamentoPort (Mercado Pago)           │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Legend:
  [REMOVED] POST /pagamentos/preferencia/{anuncioId}
  [REMOVED] ProcessarPagamentoUseCase.criarPreferencia()
  [REMOVED] processarPagamentoAnuncio()
```

## Removed Files Summary

| File | Reason |
|------|--------|
| `app/pagamento/*` | Intention payment callbacks - dead routes |
| `hooks/use-payments.ts` | Intention payment hooks - unused |
| `lib/payments.ts` | Intention payment API calls - unused |

## Modified Files Summary

| File | Change |
|------|--------|
| `StatusAnuncio.java` | Remove PENDENTE_PAGAMENTO |
| `ProcessarPagamentoUseCase.java` | Remove criarPreferencia |
| `ProcessarPagamentoUseCaseImpl.java` | Remove intention payment logic |
| `PagamentoController.java` | Remove preferencia endpoint |
| `Anuncio.java` | Remove legacy criar() |
| `AnuncioService.java` | Remove ativarAnuncio() |
| `AtualizarAnuncioUseCaseImpl.java` | Allow ATIVO updates |
| `ExcluirAnuncioUseCaseImpl.java` | Allow ATIVO deletion |
| `BeanConfiguration.java` | Remove precoAnuncio |
| `my-intentions/page.tsx` | Remove payment button/filter |
| `types/index.ts` | Remove PagamentoResponse |
