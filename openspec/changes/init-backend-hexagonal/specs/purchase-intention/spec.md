# Capability: Purchase Intention (Anúncio de Compra)

## ADDED Requirements

### Requirement: Purchase Intention Creation
The system SHALL allow authenticated users to create purchase intentions (anúncios) for vehicles.

#### Scenario: Successful intention creation
- **WHEN** an authenticated user submits a valid intention with:
  - Tipo (CARRO, MOTO, CAMINHAO)
  - Marca (from FIPE)
  - Modelo (from FIPE)
  - Anos (array of acceptable years)
  - Cores (array of acceptable colors)
  - Preço máximo
  - Observações (optional notes)
- **THEN** the system MUST create the intention in PENDENTE_PAGAMENTO status
- **AND** store it in the NoSQL database (Cosmos DB)
- **AND** return the intention ID for payment processing

#### Scenario: Multi-select validation
- **WHEN** anos or cores arrays are provided
- **THEN** the system MUST accept multiple values
- **AND** validate that at least one year is selected
- **AND** validate that at least one color is selected

#### Scenario: Price validation
- **WHEN** precoMax is provided
- **THEN** the system MUST validate it is greater than 0
- **AND** optionally compare against FIPE reference price

### Requirement: Intention Status Lifecycle
The system SHALL manage intention status through defined states.

#### Scenario: Status transitions
- **WHEN** an intention is created
- **THEN** status MUST be PENDENTE_PAGAMENTO
- **WHEN** payment is confirmed
- **THEN** status MUST change to ATIVO
- **WHEN** expiration date is reached
- **THEN** status MUST change to EXPIRADO
- **WHEN** user manually cancels
- **THEN** status MUST change to CANCELADO

#### Scenario: Active intention expiration
- **WHEN** an intention is activated after payment
- **THEN** the system MUST set expiration date (default: 60 days)
- **AND** the intention MUST remain searchable until expiration

### Requirement: Intention Listing and Search
The system SHALL allow searching and filtering of active intentions.

#### Scenario: List all active intentions
- **WHEN** a user requests the intention list without filters
- **THEN** the system MUST return paginated ATIVO intentions
- **AND** order by creation date (newest first)

#### Scenario: Filter by vehicle type
- **WHEN** a user filters by tipo (e.g., CARRO)
- **THEN** the system MUST return only intentions matching that type

#### Scenario: Filter by brand and model
- **WHEN** a user filters by marca and/or modelo
- **THEN** the system MUST return only matching intentions

#### Scenario: Filter by year
- **WHEN** a seller has a 2021 vehicle and filters by year
- **THEN** the system MUST return intentions where 2021 is in the anos array

#### Scenario: Filter by price range
- **WHEN** a seller filters by minimum price
- **THEN** the system MUST return intentions where precoMax >= seller's minimum

#### Scenario: Filter by location
- **WHEN** a user filters by cidade/estado
- **THEN** the system MUST return intentions from users in that location

### Requirement: Intention Details
The system SHALL provide detailed view of individual intentions.

#### Scenario: View intention details
- **WHEN** a user requests intention details by ID
- **THEN** the system MUST return:
  - Full vehicle specifications
  - Buyer's public profile (with WhatsApp link)
  - Creation and expiration dates
  - Status

### Requirement: Intention Document Structure
The system SHALL store intentions as flexible documents in Cosmos DB.

#### Scenario: Document schema
- **WHEN** an intention is persisted
- **THEN** the document MUST include:
  - id (UUID)
  - userId (reference to PostgreSQL user)
  - nicho ("VEICULO" for MVP)
  - tipo (CARRO, MOTO, CAMINHAO)
  - status (PENDENTE_PAGAMENTO, ATIVO, EXPIRADO, CANCELADO)
  - detalhes (flexible object with marca, modelo, anos, cores, precoMax)
  - contato (whatsapp, instagram copied from profile)
  - criadoEm (timestamp)
  - expiraEm (timestamp)
  - transacaoId (payment reference)

