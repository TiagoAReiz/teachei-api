# Capability: Feed Filters - Delta

## ADDED Requirements

### Requirement: Available Filter Options Endpoint
The backend SHALL provide an endpoint that returns only filter options with existing active intentions.

#### Scenario: Get all available types
- **GIVEN** there are active intentions for CARRO and MOTO but not CAMINHAO
- **WHEN** client requests available filters without parameters
- **THEN** the response SHALL include only CARRO and MOTO in the tipos array
- **AND** the response SHALL NOT include CAMINHAO

#### Scenario: Get available brands for a type
- **GIVEN** there are active CARRO intentions for Chevrolet and Volkswagen but not Fiat
- **WHEN** client requests available filters with tipo=CARRO
- **THEN** the response SHALL include only Chevrolet and Volkswagen in the marcas array
- **AND** the response SHALL NOT include Fiat

#### Scenario: Get available models for a brand
- **GIVEN** there are active CARRO/Chevrolet intentions for Onix and Tracker but not Cruze
- **WHEN** client requests available filters with tipo=CARRO and marcaCodigo=23
- **THEN** the response SHALL include only Onix and Tracker in the modelos array
- **AND** the response SHALL NOT include Cruze

### Requirement: Filter UI Shows Only Available Options
The filter UI SHALL display only vehicle types, brands, and models that have active intentions.

#### Scenario: Vehicle type buttons
- **GIVEN** there are only CARRO intentions in the system
- **WHEN** user views the filter panel
- **THEN** only the "Carros" button SHALL be shown (besides "Todos")
- **AND** "Motos" and "Caminhões" buttons SHALL be hidden or disabled

#### Scenario: Brand dropdown
- **GIVEN** user selected CARRO type
- **AND** there are only Chevrolet and Volkswagen CARRO intentions
- **WHEN** user opens the brand dropdown
- **THEN** only Chevrolet and Volkswagen SHALL appear in the list

#### Scenario: Model dropdown
- **GIVEN** user selected CARRO type and Chevrolet brand
- **AND** there are only Onix intentions for Chevrolet
- **WHEN** user opens the model dropdown
- **THEN** only Onix SHALL appear in the list

### Requirement: Intention Creation Uses Full FIPE Data
The intention creation flow SHALL continue using the full FIPE API data, not the filtered options.

#### Scenario: Creating intention shows all brands
- **WHEN** user is creating a new intention
- **AND** selects CARRO type
- **THEN** all FIPE brands SHALL be available for selection
- **AND** the available brands SHALL NOT be limited by existing intentions
