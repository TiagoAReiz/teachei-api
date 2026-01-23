# Capability: Web Intention Creation - Delta

## REMOVED Requirements

### Requirement: FIPE Year Selection
**Reason**: Buyers only need to specify a year range, not specific FIPE year codes. Client-side year generation is simpler, faster, and more reliable than fetching from API.
**Migration**: Replace with static year options generated client-side.

## ADDED Requirements

### Requirement: Static Year Selection
When creating a vehicle intention, the system SHALL provide year options generated client-side from (current year - 30) to (current year + 1).

#### Scenario: Year options include next year
- **WHEN** creating an intention in January 2026
- **THEN** the year selector SHALL include years from 1996 to 2027

#### Scenario: Year options update automatically each year
- **WHEN** the current year changes (e.g., 2026 to 2027)
- **THEN** the year selector SHALL automatically include the new range without code changes

#### Scenario: Year range validation
- **WHEN** user selects anoMinimo greater than anoMaximo
- **THEN** the system SHALL display a validation error
- **AND** prevent form submission
