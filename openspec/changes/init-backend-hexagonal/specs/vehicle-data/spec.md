# Capability: Vehicle Data (FIPE Integration)

## ADDED Requirements

### Requirement: Brand Listing
The system SHALL provide a list of vehicle brands from the FIPE table.

#### Scenario: Get brands by vehicle type
- **WHEN** a user requests brands for a vehicle type (CARRO, MOTO, CAMINHAO)
- **THEN** the system MUST return a list of brands
- **AND** each brand MUST include codigo and nome

#### Scenario: Brands caching
- **WHEN** brands are requested
- **THEN** the system MUST cache the response for 24 hours
- **AND** subsequent requests MUST use cached data

### Requirement: Model Listing
The system SHALL provide a list of vehicle models for a given brand.

#### Scenario: Get models by brand
- **WHEN** a user requests models for a specific brand
- **THEN** the system MUST return a list of models
- **AND** each model MUST include codigo and nome

#### Scenario: Models caching
- **WHEN** models are requested
- **THEN** the system MUST cache the response for 24 hours

### Requirement: Year Listing
The system SHALL provide available years for a specific model.

#### Scenario: Get years by model
- **WHEN** a user requests years for a specific brand and model
- **THEN** the system MUST return a list of available years
- **AND** each year MUST include codigo and nome (e.g., "2021 Gasolina")

### Requirement: FIPE Price Reference
The system SHALL provide the FIPE reference price for a specific vehicle configuration.

#### Scenario: Get FIPE price
- **WHEN** a user requests the price for marca + modelo + ano
- **THEN** the system MUST return the current FIPE value
- **AND** include the reference month/year of the table

#### Scenario: Price as buyer guidance
- **WHEN** a buyer creates an intention
- **THEN** the UI SHOULD display the FIPE price as reference
- **AND** the system MAY warn if offered price differs significantly

### Requirement: API Resilience
The system SHALL handle FIPE API failures gracefully.

#### Scenario: Circuit breaker activation
- **WHEN** the FIPE API fails 5 consecutive times
- **THEN** the circuit breaker MUST open
- **AND** requests MUST fail fast for 30 seconds
- **AND** after 30 seconds, one request MUST be allowed through (half-open)

#### Scenario: Fallback on API failure
- **WHEN** the FIPE API is unavailable
- **THEN** the system MUST allow manual vehicle data entry
- **AND** the intention MUST be marked as "dados manuais"

#### Scenario: Cache serving during outage
- **WHEN** the FIPE API is unavailable but cached data exists
- **THEN** the system MUST serve cached data
- **AND** log a warning about stale data

### Requirement: VehicleDataPort Interface
The system SHALL define a port interface for vehicle data access.

#### Scenario: Port definition
- **WHEN** vehicle data is needed
- **THEN** the application layer MUST use the VeiculoDataPort interface
- **AND** the FIPE adapter MUST implement this port
- **AND** the port MUST define methods: getMarcas, getModelos, getAnos, getPrecoFipe



