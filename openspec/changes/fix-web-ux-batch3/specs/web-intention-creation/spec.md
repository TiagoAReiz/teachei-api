## ADDED Requirements

### Requirement: Required Fields Validation
The intention creation form SHALL enforce required fields with clear validation messages.

#### Scenario: Year is required
- **WHEN** user attempts to proceed from specs step without selecting at least one year
- **THEN** the system SHALL display an error message "Selecione pelo menos um ano"
- **AND** the user SHALL NOT be allowed to proceed to the next step

#### Scenario: Price is required
- **WHEN** user attempts to proceed from specs step without entering a maximum price
- **THEN** the system SHALL display an error message "Informe o preço máximo"
- **AND** the user SHALL NOT be allowed to proceed to the next step

#### Scenario: Default color option
- **WHEN** user reaches the specs step
- **THEN** the color selection SHALL default to "Qualquer cor" (any color)
- **AND** user MAY optionally select specific colors

### Requirement: Step-by-Step Validation
The intention creation form SHALL validate all required fields before allowing navigation to the next step.

#### Scenario: Step 1 validation (Category)
- **WHEN** user is on the category selection step
- **THEN** the system SHALL require vehicle type selection before proceeding
- **AND** validation errors SHALL be shown inline below the field

#### Scenario: Step 2 validation (Vehicle)
- **WHEN** user is on the vehicle selection step
- **THEN** the system SHALL require brand and at least one version selection before proceeding
- **AND** validation errors SHALL be shown inline below each field

#### Scenario: Step 3 validation (Specs)
- **WHEN** user is on the specs step
- **THEN** the system SHALL require year range and maximum price before proceeding
- **AND** the system SHALL validate year range (min <= max) and mileage range (min <= max)
- **AND** validation errors SHALL be shown inline below each field

### Requirement: Review Page Validation Timing
The review page SHALL only show validation errors for optional fields after the user attempts to publish.

#### Scenario: City/State error display timing
- **WHEN** user arrives at the review page
- **THEN** city and state fields SHALL NOT show error styling initially
- **WHEN** user clicks "Publicar" without filling city/state
- **THEN** city and state fields SHALL show error styling (red border)
- **AND** an error toast message "Cidade e estado são obrigatórios" SHALL be displayed

#### Scenario: Successful validation
- **WHEN** user fills all required fields on review page
- **AND** clicks "Publicar"
- **THEN** the intention SHALL be created successfully
- **AND** user SHALL be redirected to the feed
