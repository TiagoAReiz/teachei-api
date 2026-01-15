# Capability: Core Domain

## ADDED Requirements

### Requirement: Hexagonal Architecture Structure
The system SHALL follow hexagonal architecture (Ports & Adapters) with clear layer separation.

#### Scenario: Domain layer isolation
- **WHEN** domain models are implemented
- **THEN** they MUST NOT contain framework annotations (JPA, Spring, etc.)
- **AND** they MUST be pure Java POJOs with business logic only

#### Scenario: Port interfaces definition
- **WHEN** external dependencies are needed (database, APIs)
- **THEN** the domain layer MUST interact through port interfaces
- **AND** implementations MUST reside in the adapter layer

### Requirement: Package Structure Convention
The system SHALL use the package `com.teachei.api` as the base package with sub-packages following hexagonal layers.

#### Scenario: Package organization
- **WHEN** code is organized
- **THEN** domain code MUST be in `com.teachei.api.domain`
- **AND** application ports MUST be in `com.teachei.api.application.ports`
- **AND** adapters MUST be in `com.teachei.api.adapter`
- **AND** configuration MUST be in `com.teachei.api.config`

### Requirement: Domain Exception Handling
The system SHALL use domain-specific exceptions for business rule violations.

#### Scenario: Business rule violation
- **WHEN** a domain rule is violated (e.g., invalid price, missing required field)
- **THEN** a domain exception MUST be thrown
- **AND** the exception MUST contain a clear error message

#### Scenario: Exception translation at adapter boundary
- **WHEN** a domain exception reaches the web adapter
- **THEN** it MUST be translated to an appropriate HTTP response
- **AND** the response MUST include error code and message



