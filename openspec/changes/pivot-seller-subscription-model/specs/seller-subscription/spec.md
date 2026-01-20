# Capability: Seller Subscription

## ADDED Requirements

### Requirement: Subscription Plan Configuration
The system SHALL provide configurable subscription plans for sellers to access buyer contact information.

#### Scenario: Plan types available
- **WHEN** the subscription plans are configured
- **THEN** the system MUST support three plan types:
  - INDIVIDUAL: R$15.00 for 30 days (one-time payment)
  - TRIMESTRAL: R$30.00 for 90 days (recurring)
  - ANUAL: R$90.00 for 365 days (recurring)
- **AND** prices MUST be configurable via application.yml or environment variables
- **AND** prices MUST be stored in centavos for precision (1500, 3000, 9000)

#### Scenario: Plan listing endpoint
- **WHEN** any user requests GET `/v1/assinaturas/planos`
- **THEN** the system MUST return all available plans with:
  - id (INDIVIDUAL, TRIMESTRAL, ANUAL)
  - nome (display name in Portuguese)
  - preco (in centavos)
  - duracaoDias (30, 90, 365)
  - recorrente (boolean)
- **AND** the endpoint MUST be publicly accessible (no auth required)

### Requirement: Subscription Creation
The system SHALL allow authenticated sellers to create subscriptions via Mercado Pago.

#### Scenario: Create subscription payment preference
- **WHEN** an authenticated user requests POST `/v1/assinaturas` with `{ plano: "INDIVIDUAL" }`
- **THEN** the system MUST create a Mercado Pago payment preference
- **AND** the preference MUST include:
  - Item description (e.g., "TeAchei - Assinatura Individual")
  - Price from configuration
  - External reference (format: `sub_{userId}_{plano}_{timestamp}`)
  - Success/failure/pending redirect URLs
  - Webhook notification URL
- **AND** return the preference ID and checkout URL

#### Scenario: Invalid plan selection
- **WHEN** user requests subscription with invalid plan
- **THEN** the system MUST return HTTP 400 with error message

### Requirement: Subscription Status Tracking
The system SHALL track subscription status for each user.

#### Scenario: Subscription activation via webhook
- **WHEN** Mercado Pago sends a webhook with status "approved" for subscription payment
- **THEN** the system MUST:
  - Create/update subscription record in PostgreSQL
  - Set status to ATIVO
  - Set dataInicio to current timestamp
  - Set dataFim based on plan duration
  - Store transacaoId for reference

#### Scenario: Check current subscription
- **WHEN** authenticated user requests GET `/v1/assinaturas/minha`
- **THEN** the system MUST return:
  - Current subscription status (ATIVO, EXPIRADO, CANCELADO, or null if never subscribed)
  - Plan details if active
  - Expiration date if active
  - Boolean `assinaturaAtiva` for quick check

#### Scenario: Subscription expiration
- **WHEN** current date exceeds subscription dataFim
- **THEN** the system MUST treat subscription as EXPIRADO
- **AND** user MUST lose access to buyer contact information
- **AND** user MAY renew by creating new subscription

### Requirement: Subscription Cancellation
The system SHALL allow users to cancel recurring subscriptions.

#### Scenario: Cancel subscription
- **WHEN** authenticated user requests DELETE `/v1/assinaturas/{id}`
- **AND** the subscription belongs to the user
- **THEN** the system MUST:
  - Set status to CANCELADO
  - NOT refund payment
  - Allow access until dataFim (subscription remains valid until expiration)
- **AND** if recurring, cancel future auto-renewals with Mercado Pago

#### Scenario: Cancel other user's subscription
- **WHEN** user tries to cancel subscription that doesn't belong to them
- **THEN** the system MUST return HTTP 403 Forbidden

### Requirement: Subscription Persistence
The system SHALL store subscription data in PostgreSQL.

#### Scenario: Subscription entity structure
- **WHEN** a subscription is persisted
- **THEN** the record MUST include:
  - id (UUID)
  - userId (reference to usuario table)
  - plano (INDIVIDUAL, TRIMESTRAL, ANUAL)
  - status (ATIVO, EXPIRADO, CANCELADO)
  - dataInicio (timestamp)
  - dataFim (timestamp)
  - transacaoId (Mercado Pago reference)
  - criadoEm (timestamp)
  - atualizadoEm (timestamp)

#### Scenario: Query active subscription
- **WHEN** checking if user has active subscription
- **THEN** the system MUST query for subscription where:
  - userId matches
  - status = ATIVO
  - dataFim > current timestamp
