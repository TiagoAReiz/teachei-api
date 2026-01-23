# Capability: Web Feed Filters - Delta

## MODIFIED Requirements

### Requirement: Model Filter Selection
The feed filters SHALL group models by base name and allow optional version selection, matching the intention creation UX.

#### Scenario: Models grouped by base name
- **WHEN** user selects a brand in the filter
- **THEN** models SHALL be grouped by base name (e.g., "Onix", "HB20")
- **AND** each group SHALL show the number of versions available

#### Scenario: Version selection is optional
- **WHEN** user selects a base model (e.g., "Onix")
- **THEN** a version selector SHALL appear with available versions
- **AND** user MAY select a specific version or leave empty to match all versions

#### Scenario: Filter with base model only
- **WHEN** user selects base model "Onix" without selecting a version
- **THEN** feed SHALL show intentions for all "Onix" versions (1.0 LT, 1.0 LTZ, Plus, etc.)

#### Scenario: Filter with specific version
- **WHEN** user selects base model "Onix" and version "1.0 LT 5p"
- **THEN** feed SHALL show only intentions matching that specific version

## ADDED Requirements

### Requirement: Dynamic Year Options in Filters
The feed filters SHALL generate year options dynamically to include next year.

#### Scenario: Year options include next year
- **WHEN** displaying year filter options in January 2026
- **THEN** year options SHALL range from 1996 to 2027

#### Scenario: Year options update automatically
- **WHEN** the current year changes
- **THEN** year filter options SHALL update without code changes
