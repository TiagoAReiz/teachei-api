# Capability: Payment Integration (Mercado Pago)

## ADDED Requirements

### Requirement: Payment Preference Creation
The system SHALL create Mercado Pago payment preferences for intention activation.

#### Scenario: Create payment for intention
- **WHEN** a user has created an intention in PENDENTE_PAGAMENTO status
- **THEN** the system MUST create a Mercado Pago preference
- **AND** the preference MUST include:
  - Item description (e.g., "Anúncio de Compra - Honda Civic")
  - Fixed price per announcement
  - External reference (intention ID)
  - Success/failure/pending redirect URLs
- **AND** return the preference ID and checkout URL

#### Scenario: Multiple payment methods
- **WHEN** a payment preference is created
- **THEN** it MUST support:
  - PIX (immediate confirmation)
  - Credit card
  - Boleto (deferred confirmation)

### Requirement: Payment Webhook Processing
The system SHALL process Mercado Pago webhooks for payment status updates.

#### Scenario: Successful payment notification
- **WHEN** Mercado Pago sends a webhook with status "approved"
- **THEN** the system MUST:
  - Validate the webhook signature
  - Find the intention by external reference
  - Update intention status to ATIVO
  - Set expiration date (60 days from now)
  - Record the transaction in PostgreSQL

#### Scenario: Failed payment notification
- **WHEN** Mercado Pago sends a webhook with status "rejected"
- **THEN** the system MUST:
  - Keep intention in PENDENTE_PAGAMENTO status
  - Allow user to retry payment

#### Scenario: Pending payment notification
- **WHEN** Mercado Pago sends a webhook with status "pending" (e.g., boleto)
- **THEN** the system MUST keep intention in PENDENTE_PAGAMENTO status
- **AND** wait for final confirmation

#### Scenario: Idempotent webhook processing
- **WHEN** Mercado Pago sends the same webhook multiple times
- **THEN** the system MUST process it idempotently
- **AND** NOT create duplicate transactions
- **AND** NOT change status if already ATIVO

### Requirement: Transaction Recording
The system SHALL record all payment transactions for audit purposes.

#### Scenario: Transaction persistence
- **WHEN** a payment is confirmed
- **THEN** the system MUST store in PostgreSQL:
  - Transaction ID (Mercado Pago reference)
  - User ID
  - Intention ID
  - Amount
  - Payment method
  - Status
  - Timestamps (created, updated)

#### Scenario: Transaction history
- **WHEN** a user requests their transaction history
- **THEN** the system MUST return all their payment transactions
- **AND** order by date (newest first)

### Requirement: Payment Port Interface
The system SHALL define a port interface for payment processing.

#### Scenario: Port definition
- **WHEN** payment processing is needed
- **THEN** the application layer MUST use the PagamentoPort interface
- **AND** the Mercado Pago adapter MUST implement this port
- **AND** the port MUST define methods:
  - criarPreferencia(anuncioId, valor) -> PreferenciaDTO
  - processarWebhook(payload) -> void
  - consultarStatus(transacaoId) -> StatusPagamento

### Requirement: Payment Configuration
The system SHALL support environment-based payment configuration.

#### Scenario: Sandbox vs Production
- **WHEN** the application runs in dev/test environment
- **THEN** it MUST use Mercado Pago sandbox credentials
- **WHEN** the application runs in production
- **THEN** it MUST use production credentials
- **AND** credentials MUST be loaded from environment variables

