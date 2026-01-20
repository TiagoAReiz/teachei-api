# Change: Pivot to Seller Subscription Model

## Why
The current pay-per-intention model for buyers creates friction in the marketplace. Switching to a seller subscription model removes this barrier, allowing buyers to freely post purchase intentions while monetizing sellers who want to access buyer contact information. This aligns the business model with the value proposition: sellers gain access to qualified leads.

## What Changes

### **BREAKING** - Business Model Pivot
1. **Remove buyer payment requirement**: Purchase intentions are now created and immediately visible to all (no PENDENTE_PAGAMENTO status, no payment flow on creation)
2. **Add seller subscription**: Sellers must subscribe to view buyer contact information (WhatsApp, Instagram, phone)
3. **Contact visibility restriction**: Non-subscribed sellers see only city location, subscribed sellers see full contact details

### Subscription Plans (configurable in backend)
- **Individual Monthly**: R$15/month (single payment)
- **Quarterly Recurring**: R$30/3 months (auto-renews)
- **Annual Recurring**: R$90/year (auto-renews)

Prices stored in backend config, frontend fetches dynamically for display.

### Vehicle Selection Improvements
- Change flow: Select model first, then specify variants/years
- Add optional features selector (vidro elétrico, ar condicionado, direção hidráulica, etc.)
- Validate year range: anoMinimo ≤ anoMaximo
- Validate mileage range: quilometragemMinima ≤ quilometragemMaxima

### Location & UX Fixes
- Require location (cidade/estado) to create intention
- Fix bug: location input should appear in dedicated section, not with vehicle info
- Investigate/fix "Voltar à loja" not working in Mercado Pago

### Mercado Pago Integration
- Repurpose existing payment infrastructure for seller subscriptions
- Support one-time and recurring payments via Mercado Pago
- Verify webhook handling for subscription status updates

## Impact

### Affected Capabilities
- `purchase-intention` → Intent creation no longer requires payment
- `payment-integration` → Repurposed for seller subscriptions
- `vehicle-data` → Enhanced with optional features
- `user-profile` → Subscription status tracking

### Affected Code
- **Backend**:
  - `AnuncioService`, `AnuncioController` - Remove payment-gate on creation
  - New `AssinaturaService`, `AssinaturaController` - Subscription management
  - New `PlanoAssinatura` domain model
  - `PagamentoPort` - Extended for subscriptions
  - Webhook processing for subscription events
  - New endpoint to fetch subscription plans and prices
  
- **Frontend Web**:
  - `/create/*` pages - Remove payment flow, add location requirement
  - `/intention/[id]` - Conditional contact visibility
  - New `/assinatura` page - Subscription management for sellers
  - Vehicle selection flow refactor

- **Database**:
  - New `assinaturas` table (PostgreSQL)
  - New `planos_assinatura` config table or application.yml config
