# Capability: Intention Lifecycle

## MODIFIED Requirements

### Requirement: Intention Status States
The system SHALL support the following intention statuses ONLY.

#### Scenario: Valid intention statuses
- **GIVEN** the intention status enum
- **THEN** the valid values MUST be:
  - `ATIVO` - Created and visible to all users
  - `EXPIRADO` - Past expiration date (60 days from creation)
  - `CANCELADO` - User cancelled the intention
  - `FINALIZADO` - User found what they wanted
- **AND** `PENDENTE_PAGAMENTO` MUST NOT exist

### Requirement: Free Intention Creation
The system SHALL create intentions as immediately active.

#### Scenario: Create intention without payment
- **WHEN** a user creates a purchase intention
- **THEN** the intention MUST be created with status `ATIVO`
- **AND** the intention MUST be immediately visible to all users
- **AND** no payment preference MUST be created
- **AND** no payment flow MUST be triggered

### Requirement: Intention Update Rules
The system SHALL allow updates to active intentions.

#### Scenario: Owner updates ATIVO intention
- **GIVEN** a user owns an intention with status `ATIVO`
- **WHEN** the user requests to update the intention
- **THEN** the system MUST allow the update

#### Scenario: Owner cannot update terminal state
- **GIVEN** a user owns an intention with status `EXPIRADO`, `CANCELADO`, or `FINALIZADO`
- **WHEN** the user requests to update the intention
- **THEN** the system MUST reject with error "Não é possível atualizar uma intenção que não está ativa"

### Requirement: Intention Delete Rules
The system SHALL allow deletion of active intentions.

#### Scenario: Owner deletes ATIVO intention
- **GIVEN** a user owns an intention with status `ATIVO`
- **WHEN** the user requests to delete the intention
- **THEN** the system MUST delete the intention

#### Scenario: Owner cannot delete terminal state
- **GIVEN** a user owns an intention with status `EXPIRADO`, `CANCELADO`, or `FINALIZADO`
- **WHEN** the user requests to delete the intention
- **THEN** the system MUST reject with error "Não é possível excluir uma intenção que não está ativa"

### Requirement: Expiration Date Visibility
The system SHALL display the expiration date for intentions.

#### Scenario: Show expiration on my-intentions page
- **GIVEN** a user views their list of intentions
- **WHEN** an intention has status `ATIVO`
- **THEN** the UI MUST display "Expira em X dias" or the expiration date
- **AND** the calculation MUST be based on `expiraEm` field from backend

#### Scenario: Show expiration on intention detail page
- **GIVEN** a user views their own intention detail
- **WHEN** the intention has status `ATIVO`
- **THEN** the UI MUST display the expiration date
- **AND** show days remaining until expiration

#### Scenario: Expired intention visual indicator
- **GIVEN** an intention has status `EXPIRADO`
- **WHEN** displayed in the UI
- **THEN** it MUST show "Expirado" badge with error styling
- **AND** no delete option should be available

## REMOVED Requirements

### Requirement: Payment for Intention Publication (REMOVED)
~~The system SHALL require payment before an intention becomes visible.~~

**Reason**: Business model changed to free intention creation with seller subscriptions.

### Requirement: PENDENTE_PAGAMENTO Status (REMOVED)
~~The system SHALL create intentions with PENDENTE_PAGAMENTO status until payment is confirmed.~~

**Reason**: No payment gate for intentions anymore.

### Requirement: Intention Payment Preference (REMOVED)
~~The system SHALL create a Mercado Pago payment preference for pending intentions.~~

**Reason**: Payment integration now only handles seller subscriptions.

### Requirement: Intention Payment Webhook (REMOVED)  
~~The system SHALL process payment webhooks to activate intentions.~~

**Reason**: Webhooks now only process subscription payments (prefix "sub_").
