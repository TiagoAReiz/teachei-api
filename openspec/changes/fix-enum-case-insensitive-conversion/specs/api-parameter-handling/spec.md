## ADDED Requirements

### Requirement: Case-Insensitive TipoVeiculo Conversion

The system SHALL accept `TipoVeiculo` enum values in any case (uppercase, lowercase, or mixed) when provided as path variables or request parameters.

When an invalid value is provided, the system SHALL return a 400 Bad Request response with a descriptive error message indicating the valid enum values.

#### Scenario: Lowercase enum value in path variable

- **GIVEN** a request to `/v1/veiculos/{tipo}/marcas`
- **WHEN** the `tipo` path variable is `moto` (lowercase)
- **THEN** the system SHALL convert it to `TipoVeiculo.MOTO`
- **AND** return a 200 OK response with the list of brands

#### Scenario: Uppercase enum value in path variable

- **GIVEN** a request to `/v1/veiculos/{tipo}/marcas`
- **WHEN** the `tipo` path variable is `MOTO` (uppercase)
- **THEN** the system SHALL convert it to `TipoVeiculo.MOTO`
- **AND** return a 200 OK response with the list of brands

#### Scenario: Mixed case enum value in path variable

- **GIVEN** a request to `/v1/veiculos/{tipo}/marcas`
- **WHEN** the `tipo` path variable is `Moto` or `MoTo` (mixed case)
- **THEN** the system SHALL convert it to `TipoVeiculo.MOTO`
- **AND** return a 200 OK response with the list of brands

#### Scenario: Invalid enum value in path variable

- **GIVEN** a request to `/v1/veiculos/{tipo}/marcas`
- **WHEN** the `tipo` path variable is `bicicleta` (invalid value)
- **THEN** the system SHALL return a 400 Bad Request response
- **AND** the response body SHALL contain an error message indicating valid values: `CARRO`, `MOTO`, `CAMINHAO`

#### Scenario: Lowercase enum value in request parameter

- **GIVEN** a request to `/v1/anuncios` with query parameter `tipo=carro`
- **WHEN** the `tipo` parameter is `carro` (lowercase)
- **THEN** the system SHALL convert it to `TipoVeiculo.CARRO`
- **AND** filter the results by vehicle type accordingly
