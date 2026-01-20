# Capability: payment-webhook

## MODIFIED Requirements

### Requirement: Payment Status Synchronization
The system SHALL ensure payment status is synchronized when the user returns from payment.

#### Scenario: Webhook processing
Given a payment is completed on Mercado Pago
When the webhook is received
Then the system SHALL log the webhook payload for debugging
And the system SHALL update the intention status to ATIVO if payment is approved

#### Scenario: Fallback polling on return
Given the user returns from payment to /pagamento/sucesso
When the page loads
Then the system SHALL poll the intention status for up to 30 seconds
And if status changes to ATIVO the success message SHALL be shown
And if status remains PENDENTE_PAGAMENTO a retry option SHALL be offered

### Requirement: Webhook Debugging
The webhook endpoint SHALL include enhanced logging for troubleshooting.

#### Scenario: Webhook logging
Given a webhook request is received
When the request is processed
Then the system SHALL log: request headers, payload type, payment ID, and processing result
And errors SHALL be logged with full stack trace
