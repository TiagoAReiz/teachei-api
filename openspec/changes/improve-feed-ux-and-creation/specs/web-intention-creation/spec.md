## MODIFIED Requirements

### Requirement: Vehicle Model Selection
The intention creation flow SHALL allow users to select a base model and optionally choose specific versions.

#### Scenario: Display grouped models
- **WHEN** user selects a brand during intention creation
- **THEN** models SHALL be displayed grouped by base name
- **AND** each group SHALL show the base model name and version count (e.g., "Onix (5 versões)")

#### Scenario: Select base model
- **WHEN** user clicks on a grouped model
- **THEN** the base model SHALL be selected
- **AND** a version selection panel SHALL appear below

#### Scenario: Version selection options
- **WHEN** a base model is selected
- **THEN** all versions of that model SHALL be displayed with checkboxes
- **AND** a "Selecionar todas as versões" option SHALL be available at the top
- **AND** versions SHALL be displayed in a scrollable list

#### Scenario: Select all versions
- **WHEN** user checks "Selecionar todas as versões"
- **THEN** all version checkboxes SHALL be checked
- **AND** the store SHALL record that all versions are accepted

#### Scenario: Select specific versions
- **WHEN** user manually selects one or more version checkboxes
- **THEN** only selected versions SHALL be stored
- **AND** "Selecionar todas as versões" SHALL be unchecked if not all are selected

#### Scenario: At least one version required
- **WHEN** a base model is selected
- **THEN** user MUST select at least one version or "todas as versões" to continue
- **AND** the continue button SHALL be disabled until selection is made

## ADDED Requirements

### Requirement: Model Grouping Algorithm
The system SHALL group FIPE models by their base name for improved selection UX.

#### Scenario: Group by first term
- **WHEN** models are fetched from FIPE API
- **THEN** models SHALL be grouped by the first word of their name
- **AND** remaining text SHALL be treated as the version name

#### Scenario: Single version model
- **WHEN** a base name has only one version
- **THEN** it SHALL still be displayed in the grouped format
- **AND** the version selection step SHALL show only one option

### Requirement: Multiple Version Storage
The creation store SHALL support storing multiple selected versions.

#### Scenario: Store multiple versions
- **WHEN** user selects multiple versions
- **THEN** the store SHALL maintain an array of selected version codes and names
- **AND** the store SHALL track if "todas as versões" was selected

#### Scenario: Creation request with versions
- **WHEN** intention is submitted with multiple versions
- **THEN** the first selected version SHALL be used as the primary modeloCodigo
- **AND** additional versions SHALL be mentioned in the observacoes field
- **AND** if "todas as versões" was selected, observacoes SHALL include "Aceito qualquer versão do modelo"
