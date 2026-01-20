# Design: Seller Subscription Model

## Context
TeAchei currently charges buyers R$2 per purchase intention (anúncio). This creates friction and potentially limits the marketplace's growth. The pivot moves monetization to sellers who benefit from accessing qualified buyer leads.

### Stakeholders
- **Buyers**: Create free intentions, maintain privacy until seller subscribes
- **Sellers**: Pay subscription to access contact info, view all intentions freely
- **Business**: Revenue from seller subscriptions instead of buyer fees

## Goals / Non-Goals

### Goals
- Remove buyer payment friction entirely
- Implement tiered seller subscription with Mercado Pago
- Protect buyer contact info behind subscription paywall
- Make pricing easily configurable without code changes
- Maintain existing Mercado Pago integration patterns
- Improve vehicle selection UX with model-first approach
- Add validation for year and mileage ranges

### Non-Goals
- Seller ratings/reviews (future feature)
- Advanced subscription features (leads limit, analytics)
- Bulk discounts or enterprise plans
- Multi-user/team subscriptions

## Decisions

### Decision 1: Subscription Storage
**What**: Store subscription data in PostgreSQL, not Cosmos DB
**Why**: Subscriptions are financial/transactional data tied to users (already in PostgreSQL). Cosmos DB is for flexible intention documents.

### Decision 2: Pricing Configuration
**What**: Store plan prices in `application.yml` with ability to override via environment variables
**Why**: Simple to change without database migration, can be different per environment

```yaml
subscription:
  plans:
    individual:
      price: 1500  # centavos = R$15.00
      duration-days: 30
      recurring: false
    quarterly:
      price: 3000  # centavos = R$30.00
      duration-days: 90
      recurring: true
    annual:
      price: 9000  # centavos = R$90.00
      duration-days: 365
      recurring: true
```

### Decision 3: Mercado Pago Recurring Payments
**What**: Use Mercado Pago Subscriptions API for recurring plans
**Why**: Native support for recurring billing, handles retries, cancellation, etc.

**Alternatives considered**:
- Manual recurring via scheduled jobs: More complex, error-prone
- Separate payment provider: Inconsistent UX, more integration work

### Decision 4: Contact Visibility Check
**What**: Backend always controls contact visibility. Frontend fetches intention with contact info only if authorized.
**Why**: Security - can't trust frontend to hide data, must be server-enforced.

**Implementation**:
- GET `/v1/anuncios/{id}` checks if requesting user has active subscription
- If not subscribed: return intention WITHOUT `contato.whatsapp`, `contato.instagram`, only `contato.cidade`, `contato.estado`
- If subscribed or owner: return full contact info

### Decision 5: Vehicle Selection Flow Change
**What**: Model selection before brand, with optional features multi-select
**Why**: Better UX - users often know the model they want (e.g., "Civic") before thinking about brand

**Updated Flow**:
1. Select vehicle type (CARRO/MOTO/CAMINHAO)
2. Select brand (still needed for FIPE API)
3. Select model 
4. Select specific variants (multiple selection for model years)
5. Select optional features from predefined list
6. Specify year range, km range, price, colors

### Decision 6: Auto-return "Voltar à Loja" Investigation
**What**: The `autoReturn("approved")` setting should return user automatically, but may not work in all scenarios
**Investigation needed**:
- Check if sandbox vs production behavior differs
- Verify URL format and HTTPS requirement
- Test with different payment methods (PIX vs card)

## Risks / Trade-offs

### Risk: Existing Pending Intentions
**Impact**: Users with PENDENTE_PAGAMENTO intentions lose their pending ads
**Mitigation**: 
- Migrate PENDENTE_PAGAMENTO → ATIVO for existing intentions
- Send notification about free publishing

### Risk: Revenue Model Validation
**Impact**: Sellers may not subscribe if intentions volume is low
**Mitigation**: Focus on buyer acquisition first (now friction-free), seller value follows

### Risk: Mercado Pago Recurring Complexity
**Impact**: Subscriptions API is different from Preferences API
**Mitigation**: Phase 1 uses one-time payments with manual renewal, add true recurring later

## Migration Plan

### Phase 1: Backend Changes
1. Add subscription domain model and persistence
2. Add plan configuration to application.yml
3. Create subscription endpoints (plans, create, check, cancel)
4. Modify intention creation to skip payment
5. Modify intention retrieval to check subscription for contact visibility
6. Update webhook to handle subscription payments

### Phase 2: Frontend Changes
1. Remove payment flow from intention creation
2. Add location requirement to creation
3. Update intention detail page for conditional contact
4. Create subscription management page
5. Update vehicle selection flow
6. Add range validation (year, km)

### Phase 3: Testing & Rollout
1. Test with Mercado Pago sandbox
2. Migrate existing pending intentions
3. Deploy and monitor
4. Iterate on UX based on feedback

### Rollback
- Feature flag `subscription.enabled=false` disables new model
- Keep old payment flow code until stable (deprecated, not removed)

## Open Questions

1. **Recurring payment handling**: Use Mercado Pago preapproval API or manage manually?
   - Initial decision: Start with one-time payments, add recurring in v2
   
2. **Grace period**: What happens when subscription expires mid-contact?
   - Decision needed: Immediate cutoff vs 24h grace
   
3. **Refund policy**: What if seller wants refund?
   - Decision needed: No refunds for digital service, or pro-rata for annual?
