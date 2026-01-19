## ADDED Requirements

### Requirement: FIPE Year Selection
When creating a vehicle intention, the system SHALL fetch and display available years from FIPE for the selected model.

#### Scenario: Model selection loads available years
- **WHEN** user selects a vehicle model in the creation flow
- **THEN** the system fetches available years from FIPE API
- **AND** populates the year selection with FIPE years

#### Scenario: FIPE years API fails gracefully
- **WHEN** the FIPE years API fails or returns no data
- **THEN** the system falls back to manual year range input
- **AND** user can still complete intention creation

#### Scenario: User selects from FIPE years
- **WHEN** FIPE years are successfully loaded
- **THEN** user can select a year range from the available options
- **AND** only valid year combinations are allowed (min <= max)

## MODIFIED Requirements

### Requirement: Intention Review and Payment
The intention review page SHALL display the publication fee and initiate payment upon confirmation.

#### Scenario: Review page shows correct price
- **WHEN** user reaches the review step
- **THEN** the system displays R$ 2,00 as the publication fee
- **AND** shows that the intention is valid for 30 days

#### Scenario: Publish triggers payment flow
- **WHEN** user clicks "Publicar e Pagar" on review page
- **AND** intention is created successfully
- **THEN** the system immediately creates a payment preference
- **AND** redirects user to Mercado Pago checkout
- **AND** does not navigate to intention detail page first

#### Scenario: All user intentions are visible
- **WHEN** user navigates to My Intentions page
- **THEN** the system displays ALL user intentions
- **AND** includes intentions with PENDENTE_PAGAMENTO status
- **AND** includes intentions with ATIVO status
- **AND** includes intentions with FINALIZADO status
- **AND** includes intentions with EXPIRADO status
