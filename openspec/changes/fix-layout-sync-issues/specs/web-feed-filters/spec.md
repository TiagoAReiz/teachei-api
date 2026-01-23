# Capability: Web Feed Filters - Delta

## MODIFIED Requirements

### Requirement: Model Filter Uses Version Codes
The model filter SHALL send proper version codes to the backend.

#### Scenario: Base model selected without version
- **WHEN** user selects a base model (e.g., "Onix") without selecting a specific version
- **THEN** the system SHALL send ALL version codes for that model to the backend
- **AND** the backend SHALL return intentions matching ANY of those versions

#### Scenario: Specific version selected
- **WHEN** user selects a base model AND a specific version
- **THEN** the system SHALL send only that version code to the backend
- **AND** the backend SHALL return only intentions matching that version

#### Scenario: Base model grouping in UI
- **WHEN** displaying model options in the filter
- **THEN** models SHALL be grouped by base name for display (e.g., "Onix (15)")
- **AND** the version selector SHALL appear after base model selection
