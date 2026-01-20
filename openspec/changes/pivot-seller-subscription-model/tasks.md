# Tasks: Pivot to Seller Subscription Model

## 1. Backend - Subscription Domain

- [x] 1.1 Create `PlanoAssinatura` enum/model with plan types (INDIVIDUAL, TRIMESTRAL, ANUAL)
- [x] 1.2 Add subscription plan configuration to `application.yml` with prices and durations
- [x] 1.3 Create `Assinatura` domain entity (id, userId, plano, dataInicio, dataFim, status, transacaoId)
- [x] 1.4 Create `AssinaturaEntity` JPA entity for PostgreSQL
- [x] 1.5 Create `AssinaturaJpaRepository` with find by userId and check active methods
- [x] 1.6 Create `AssinaturaRepositoryPort` interface in application layer
- [x] 1.7 Create `AssinaturaJpaAdapter` implementing the port

## 2. Backend - Subscription Use Cases

- [x] 2.1 Create `BuscarPlanosUseCase` to return available plans with prices from config
- [x] 2.2 Create `CriarAssinaturaUseCase` to initiate subscription payment
- [x] 2.3 Create `VerificarAssinaturaUseCase` to check if user has active subscription
- [x] 2.4 Create `CancelarAssinaturaUseCase` for subscription cancellation
- [x] 2.5 Extend `ProcessarPagamentoUseCase` to handle subscription webhook events

## 3. Backend - Subscription API

- [x] 3.1 Create `AssinaturaController` with endpoints:
  - GET `/v1/assinaturas/planos` - List plans with prices (public)
  - GET `/v1/assinaturas/minha` - Get current user subscription status
  - POST `/v1/assinaturas` - Create new subscription (body: { plano: "INDIVIDUAL" })
  - DELETE `/v1/assinaturas/{id}` - Cancel subscription
- [x] 3.2 Create `PlanoResponse` DTO with id, nome, preco, duracao, recorrente
- [x] 3.3 Create `AssinaturaResponse` DTO with status, dataFim, plano details
- [x] 3.4 Create `CriarAssinaturaRequest` DTO

## 4. Backend - Intention Creation Changes

- [x] 4.1 Modify `CriarAnuncioUseCase` to create intention with status ATIVO (no payment)
- [x] 4.2 Remove payment preference creation from intention creation flow
- [x] 4.3 Add location validation: cidade AND estado required for creation
- [x] 4.4 Add year range validation: anoMinimo ≤ anoMaximo (if both provided)
- [x] 4.5 Add km range validation: quilometragemMinima ≤ quilometragemMaxima (if both provided)

## 5. Backend - Contact Visibility

- [x] 5.1 Modify `BuscarAnuncioUseCase` to check subscription status of requesting user
- [x] 5.2 Create `AnuncioMapper` logic to strip contact info for non-subscribers
- [x] 5.3 Ensure owner always sees their own contact info
- [x] 5.4 Add `assinaturaAtiva` field to response for frontend conditional rendering

## 6. Backend - Vehicle Optional Features

- [x] 6.1 Create `OpcionalVeiculo` enum (VIDRO_ELETRICO, AR_CONDICIONADO, DIRECAO_HIDRAULICA, TETO_SOLAR, etc.)
- [x] 6.2 Add `opcionais: List<String>` to `CriarAnuncioRequest`
- [x] 6.3 Store opcionais in intention document (Cosmos DB `detalhes.opcionais`)
- [x] 6.4 Return opcionais in `AnuncioResponse`

## 7. Backend - Mercado Pago Webhook Fix

- [x] 7.1 Investigate "Voltar à loja" issue - check auto_return configuration
- [x] 7.2 Verify webhook is receiving all payment types (subscription events)
- [x] 7.3 Add subscription status update on webhook approval
- [x] 7.4 Handle subscription expiration (scheduled job or webhook)

## 8. Frontend - Intention Creation Changes

- [x] 8.1 Remove payment flow from `/create/review` page
- [x] 8.2 Make location fields (cidade, estado) required in review step
- [x] 8.3 Move location input to dedicated section (not with vehicle info)
- [x] 8.4 Add year range validation UI: show error if anoMinimo > anoMaximo
- [x] 8.5 Add km range validation UI: show error if kmMinima > kmMaxima
- [x] 8.6 Update success flow: redirect to `/` or intention detail directly

## 9. Frontend - Vehicle Selection Improvements

- [x] 9.1 Add optional features multi-select component to `/create/specs`
- [x] 9.2 Create constants for optional features list with labels
- [x] 9.3 Update `CreateIntentionStore` with `opcionais: string[]`
- [x] 9.4 Pass opcionais to backend on creation

## 10. Frontend - Intention Detail Visibility

- [x] 10.1 Update `Anuncio` type to include `assinaturaAtiva?: boolean`
- [x] 10.2 Modify `/intention/[id]/client.tsx` to conditionally show contact info
- [x] 10.3 Show "Assine para ver contato" CTA for non-subscribers
- [x] 10.4 Show city-only location for non-subscribers
- [x] 10.5 Redirect to subscription page on CTA click

## 11. Frontend - Subscription Management

- [x] 11.1 Create `/assinatura` page for sellers
- [x] 11.2 Fetch plans from `GET /v1/assinaturas/planos`
- [x] 11.3 Display plan cards with prices and features
- [x] 11.4 Handle plan selection and redirect to Mercado Pago
- [x] 11.5 Create `/assinatura/sucesso` success page
- [x] 11.6 Show current subscription status on profile/settings
- [x] 11.7 Add subscription status indicator in header for sellers

## 12. Frontend - API Integration

- [x] 12.1 Add subscription API functions in `lib/subscriptions.ts`
- [x] 12.2 Create `useSubscription` hook for status checking
- [x] 12.3 Create `usePlans` hook for fetching plan list
- [x] 12.4 Update `types/index.ts` with subscription types

## 13. Data Migration

- [x] 13.1 Create migration script: PENDENTE_PAGAMENTO → ATIVO for existing intentions
- [x] 13.2 Add `assinaturas` table to PostgreSQL schema (auto-created by JPA)
- [x] 13.3 Document rollback procedure

## 14. Testing

- [ ] 14.1 Unit tests for subscription use cases
- [ ] 14.2 Integration tests for subscription flow
- [ ] 14.3 Test Mercado Pago sandbox with subscription creation
- [ ] 14.4 Test webhook processing for subscription approval
- [ ] 14.5 E2E test: buyer creates intention → seller subscribes → sees contact

## 15. Documentation

- [x] 15.1 Update API documentation with new endpoints
- [x] 15.2 Document subscription plan configuration
- [x] 15.3 Update README with new business model description
