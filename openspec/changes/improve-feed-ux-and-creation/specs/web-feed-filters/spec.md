## ADDED Requirements

### Requirement: Debounced Search
The search input SHALL trigger a search automatically after the user stops typing for 200ms.

#### Scenario: User types search term
- **WHEN** user types a search term with at least 2 characters
- **AND** stops typing for 200ms
- **THEN** a search request SHALL be triggered automatically
- **AND** the URL SHALL be updated with the search parameter

#### Scenario: User types quickly
- **WHEN** user types continuously without pausing
- **THEN** no search requests SHALL be made until typing stops for 200ms

#### Scenario: Search term too short
- **WHEN** user types less than 2 characters
- **THEN** no search request SHALL be triggered
- **AND** existing search results SHALL remain visible

### Requirement: Filter Sidebar
The feed page SHALL provide a "Filtrar" button that opens a sidebar with advanced filter options.

#### Scenario: Open filter sidebar
- **WHEN** user clicks the "Filtrar" button
- **THEN** a sidebar panel SHALL slide in from the right
- **AND** the sidebar SHALL display all available filter options

#### Scenario: Filter options available
- **WHEN** user opens the filter sidebar
- **THEN** the following filter options SHALL be available:
  - Tipo de veículo (CARRO, MOTO, CAMINHÃO)
  - Marca (fetched from backend based on tipo)
  - Modelo (fetched from backend based on marca)
  - Opcionais (multi-select checkboxes)
  - Faixa de preço (mínimo e máximo)
  - Faixa de ano (mínimo e máximo)

#### Scenario: Apply filters
- **WHEN** user selects filter values
- **AND** clicks "Aplicar Filtros"
- **THEN** the sidebar SHALL close
- **AND** the URL SHALL be updated with selected filter parameters
- **AND** the feed SHALL refresh with filtered results

#### Scenario: Clear filters
- **WHEN** user clicks "Limpar Filtros"
- **THEN** all filter values SHALL be reset to defaults
- **AND** the feed SHALL show unfiltered results

#### Scenario: Active filters indicator
- **WHEN** one or more filters are applied
- **THEN** the "Filtrar" button SHALL display a badge with the count of active filters

### Requirement: Filter Sidebar Responsive Behavior
The filter sidebar SHALL adapt to screen size.

#### Scenario: Mobile view
- **WHEN** viewport width is less than 768px (md breakpoint)
- **THEN** the sidebar SHALL occupy full screen width

#### Scenario: Desktop view
- **WHEN** viewport width is 768px or greater
- **THEN** the sidebar SHALL have a fixed width of 400px
- **AND** a semi-transparent overlay SHALL appear behind the sidebar

## MODIFIED Requirements

### Requirement: Vehicle Type Filter
The feed page SHALL allow filtering intentions by vehicle type via the filter sidebar.

#### Scenario: Filter by vehicle type
- **WHEN** user selects a vehicle type in the filter sidebar
- **THEN** the type SHALL be stored as a pending filter
- **AND** dependent filters (marca, modelo) SHALL reset

#### Scenario: No type filter applied
- **WHEN** user does not select a specific vehicle type
- **THEN** intentions of all vehicle types SHALL be displayed
