# Capability: Vehicle Selection

## MODIFIED Requirements

### Requirement: Vehicle Selection Flow
The system SHALL provide an improved vehicle selection experience with model-first approach.

#### Scenario: Selection order
- **WHEN** a user creates a new intention
- **THEN** the selection flow MUST be:
  1. Vehicle type (CARRO, MOTO, CAMINHAO)
  2. Brand (Marca) - from FIPE API
  3. Model (Modelo) - from FIPE API based on brand
  4. Specifications (anos, cores, preço, km)
  5. Optional features (opcionais)
  6. Location (cidade, estado)
  7. Additional notes (observações)

#### Scenario: Optional features UI
- **WHEN** user reaches the specifications step
- **THEN** the UI MUST display a multi-select grid of optional features
- **AND** each feature MUST have:
  - Icon or visual indicator
  - Label in Portuguese
  - Toggle/checkbox behavior
- **AND** selected features MUST be visually highlighted

### Requirement: Year Range Input
The system SHALL provide validated year range selection.

#### Scenario: Year range UI
- **WHEN** user selects year range
- **THEN** the UI MUST provide:
  - "A partir de" (anoMinimo) dropdown
  - "Até" (anoMaximo) dropdown
  - Year options from FIPE data when available
  - Fallback to generic range (current year - 30 years) when FIPE unavailable

#### Scenario: Year range validation UI
- **WHEN** user selects anoMinimo > anoMaximo
- **THEN** the UI MUST show validation error immediately
- **AND** the "Continuar" button MUST be disabled
- **AND** error message: "Ano mínimo não pode ser maior que ano máximo"

### Requirement: Mileage Range Input
The system SHALL provide validated mileage range selection.

#### Scenario: Mileage range UI
- **WHEN** user enters mileage range
- **THEN** the UI MUST provide:
  - "Quilometragem mínima" input field
  - "Quilometragem máxima" input field
  - Numeric-only input validation

#### Scenario: Mileage range validation UI
- **WHEN** user enters quilometragemMinima > quilometragemMaxima
- **THEN** the UI MUST show validation error immediately
- **AND** the "Continuar" button MUST be disabled
- **AND** error message: "Quilometragem mínima não pode ser maior que máxima"

### Requirement: Location Input Placement
The system SHALL display location input in a dedicated section.

#### Scenario: Location input UI placement
- **WHEN** user is on the review step
- **THEN** the location input (cidade, estado) MUST appear:
  - In its own dedicated card/section
  - AFTER vehicle specifications summary
  - BEFORE the submit button
- **AND** MUST NOT appear inline with vehicle info summary

#### Scenario: Location required indicator
- **WHEN** location fields are displayed
- **THEN** they MUST be marked as required (asterisk or label)
- **AND** submit MUST be disabled if cidade or estado is empty
- **AND** error message: "Localização é obrigatória para publicar sua intenção"

## ADDED Requirements

### Requirement: Optional Features Constants
The system SHALL provide a standardized list of vehicle optional features.

#### Scenario: Feature list definition
- **WHEN** the optional features selector is rendered
- **THEN** it MUST use this predefined list:
  | Value | Label (PT-BR) | Icon suggestion |
  |-------|---------------|-----------------|
  | VIDRO_ELETRICO | Vidro Elétrico | window |
  | AR_CONDICIONADO | Ar Condicionado | snowflake |
  | DIRECAO_HIDRAULICA | Direção Hidráulica | steering-wheel |
  | DIRECAO_ELETRICA | Direção Elétrica | zap |
  | TETO_SOLAR | Teto Solar | sun |
  | BANCOS_COURO | Bancos de Couro | armchair |
  | SENSOR_ESTACIONAMENTO | Sensor de Estacionamento | radar |
  | CAMERA_RE | Câmera de Ré | camera |
  | MULTIMIDIA | Central Multimídia | monitor |
  | BLUETOOTH | Bluetooth | bluetooth |
  | AIRBAG | Airbag | shield |
  | ABS | Freios ABS | circle-stop |
  | ALARME | Alarme | bell |
  | RODAS_LIGA | Rodas de Liga | circle |
  | PILOTO_AUTOMATICO | Piloto Automático | gauge |

#### Scenario: Feature selection persistence
- **WHEN** user selects optional features
- **THEN** selections MUST persist in the creation store
- **AND** MUST be submitted with the intention
- **AND** MUST be displayed on the review step
