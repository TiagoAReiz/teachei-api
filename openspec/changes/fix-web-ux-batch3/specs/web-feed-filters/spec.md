## ADDED Requirements

### Requirement: Range Filter Validation
The filter system SHALL validate that minimum values do not exceed maximum values for range filters (year and price).

#### Scenario: Year range validation
- **WHEN** user selects a minimum year
- **THEN** the maximum year dropdown SHALL only show years >= minimum year

#### Scenario: Price range validation
- **WHEN** user enters a minimum price greater than maximum price
- **THEN** the system SHALL show an inline error message "Preço mínimo não pode ser maior que máximo"
- **AND** the filter SHALL NOT be applied until corrected

### Requirement: Range Filter Removal
The filter tag X button SHALL remove both minimum and maximum values in a single navigation when removing a range filter.

#### Scenario: Remove year range filter
- **WHEN** user clicks X on the "Faixa de ano" filter tag
- **THEN** both `anoMin` and `anoMax` SHALL be removed from URL in a single navigation
- **AND** the filter SHALL be immediately cleared from the UI

#### Scenario: Remove price range filter
- **WHEN** user clicks X on the "Faixa de preço" filter tag
- **THEN** both `precoMin` and `precoMax` SHALL be removed from URL in a single navigation
- **AND** the filter SHALL be immediately cleared from the UI

### Requirement: Search Debounce Optimization
The search input SHALL use optimized debounce to prevent infinite request loops.

#### Scenario: Search debounce behavior
- **WHEN** user types in the search field
- **THEN** the system SHALL wait 500ms after the user stops typing before triggering a search
- **AND** the search SHALL only trigger when the debounced value differs from the current URL search param

#### Scenario: Search by model only
- **WHEN** user searches for a vehicle
- **THEN** the search SHALL match against brand name (marca) and base model name (modeloBaseNome) only
- **AND** specific version names SHALL NOT be matched by text search

## MODIFIED Requirements

### Requirement: Optional Features Filter
The optional features filter SHALL correctly pass selected optionals to the API and filter intentions.

#### Scenario: Apply optionals filter
- **WHEN** user selects one or more optional features (e.g., "Ar Condicionado", "Direção Hidráulica")
- **THEN** the selected optionals SHALL be passed as comma-separated values in the `opcionais` URL parameter
- **AND** the API request SHALL include the `opcionais` parameter
- **AND** only intentions containing ALL selected optionals SHALL be returned

#### Scenario: Clear optionals filter
- **WHEN** user removes all optional feature selections
- **THEN** the `opcionais` parameter SHALL be removed from the URL
- **AND** all intentions SHALL be shown regardless of optional features
