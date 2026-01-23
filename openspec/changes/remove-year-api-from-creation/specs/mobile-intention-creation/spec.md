# Capability: Mobile Intention Creation - Delta

## MODIFIED Requirements

### Requirement: Year Selection
When creating a vehicle intention, the system SHALL provide year options generated dynamically from (current year - 9) to (current year + 1).

#### Scenario: Year options include next year
- **WHEN** creating an intention in January 2026
- **THEN** the year selector SHALL include years from 2017 to 2027 (11 options)

#### Scenario: Year options update automatically each year
- **WHEN** the current year changes (e.g., 2026 to 2027)
- **THEN** the year selector SHALL automatically include the new range without code changes

#### Scenario: Fix hardcoded year
- **WHEN** the YEARS constant was previously hardcoded to 2024
- **THEN** the system SHALL use `new Date().getFullYear()` to calculate years dynamically
