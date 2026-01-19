## ADDED Requirements

### Requirement: Intention Creation with Payment Redirect
After successfully creating a purchase intention, the system SHALL automatically initiate the payment flow by creating a payment preference and redirecting the user to Mercado Pago checkout.

#### Scenario: Successful intention creation triggers payment
- **WHEN** user completes the intention creation form and clicks "Publicar e Pagar"
- **AND** the intention is successfully created in the backend
- **THEN** the system creates a payment preference via the API
- **AND** redirects the user to the Mercado Pago checkout URL

#### Scenario: Payment preference creation fails
- **WHEN** user creates an intention successfully
- **AND** the payment preference API call fails
- **THEN** the system displays an error toast with the failure reason
- **AND** shows a "Tentar novamente" button to retry payment
- **AND** the intention remains in PENDENTE_PAGAMENTO status

### Requirement: Payment Result Handling
The system SHALL provide pages to handle Mercado Pago payment callbacks and redirect users appropriately.

#### Scenario: Payment success callback
- **WHEN** user completes payment in Mercado Pago
- **AND** Mercado Pago redirects to /pagamento/sucesso
- **THEN** the system displays a success message
- **AND** automatically redirects user to the feed page after 3 seconds
- **AND** provides a manual link to go to feed immediately

#### Scenario: Payment error callback
- **WHEN** payment fails in Mercado Pago
- **AND** Mercado Pago redirects to /pagamento/erro
- **THEN** the system displays an error message explaining the failure
- **AND** provides a "Tentar novamente" button that goes to the intention detail page
- **AND** provides a link to return to the feed

#### Scenario: Payment pending callback
- **WHEN** payment is pending (e.g., boleto generated)
- **AND** Mercado Pago redirects to /pagamento/pendente
- **THEN** the system displays a message that payment is being processed
- **AND** explains the intention will be activated once payment is confirmed
- **AND** redirects user to the feed page after 5 seconds

### Requirement: Intention Payment Price Display
The system SHALL display the correct payment price of R$ 2,00 for publishing an intention.

#### Scenario: Price shown in review page
- **WHEN** user is on the intention review page before payment
- **THEN** the system displays "R$ 2,00" as the publication fee
- **AND** explains the intention is valid for 30 days after payment

### Requirement: Pay Pending Intentions from List
Users SHALL be able to pay for pending intentions directly from the My Intentions page.

#### Scenario: Pay for pending intention
- **WHEN** user views their intentions in My Intentions page
- **AND** an intention has status PENDENTE_PAGAMENTO
- **THEN** the system displays a "Pagar Agora" button on that intention card
- **WHEN** user clicks "Pagar Agora"
- **THEN** the system creates a payment preference and redirects to Mercado Pago
