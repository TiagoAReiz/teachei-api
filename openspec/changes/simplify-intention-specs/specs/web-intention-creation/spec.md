## MODIFIED Requirements

### Requirement: Price Input with Currency Formatting
The intention creation form SHALL display the maximum price field with Brazilian currency formatting (R$ X.XXX,XX) as the user types.

#### Scenario: User enters price
- **WHEN** user types numbers in the price field
- **THEN** the value is displayed in Brazilian currency format (e.g., "R$ 50.000,00")
- **AND** the underlying value stored is the raw number (e.g., 50000)

#### Scenario: User edits price
- **WHEN** user uses backspace or edits the price field
- **THEN** the formatting updates correctly
- **AND** the cursor position is maintained appropriately

#### Scenario: Price displayed in review
- **WHEN** user reaches the review step
- **THEN** the price is displayed in formatted currency (e.g., "até R$ 50.000,00")

## REMOVED Requirements

### Requirement: Transmission Selection
**Reason**: Transmission type is already specified by the FIPE table when selecting a model+year combination. Manual selection creates redundancy and potential inconsistency.

**Migration**: Field removed from form. Existing intentions with transmission data remain unchanged in database.

#### Scenario: Form no longer shows transmission
- **WHEN** user is on the specs step of intention creation
- **THEN** no transmission dropdown is displayed
- **AND** transmission is not part of the intention data

### Requirement: Fuel Type Selection
**Reason**: Fuel type is already specified by the FIPE table when selecting a model+year combination (e.g., "2024 Gasolina", "2023 Flex"). Manual selection is redundant.

**Migration**: Field removed from form. Existing intentions with fuel data remain unchanged in database.

#### Scenario: Form no longer shows fuel type
- **WHEN** user is on the specs step of intention creation
- **THEN** no fuel type dropdown is displayed
- **AND** fuel type is not part of the intention data
