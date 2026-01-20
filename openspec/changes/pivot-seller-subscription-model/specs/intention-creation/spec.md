# Capability: Intention Creation

## MODIFIED Requirements

### Requirement: Purchase Intention Creation
The system SHALL allow authenticated users to create purchase intentions (anúncios) for vehicles WITHOUT requiring payment.

#### Scenario: Successful intention creation (free)
- **WHEN** an authenticated user submits a valid intention with:
  - Tipo (CARRO, MOTO, CAMINHAO)
  - Marca (from FIPE)
  - Modelo (from FIPE)
  - Anos (array of acceptable years) with valid range
  - Cores (array of acceptable colors)
  - Preço máximo
  - Localização (cidade AND estado - REQUIRED)
  - Opcionais (optional array of vehicle features)
  - Observações (optional notes)
- **THEN** the system MUST create the intention with status ATIVO immediately
- **AND** store it in the NoSQL database (Cosmos DB)
- **AND** return the intention ID
- **AND** the intention MUST be visible to all users immediately

#### Scenario: Location required
- **WHEN** an intention is submitted without cidade or estado
- **THEN** the system MUST reject with HTTP 400
- **AND** return error message: "Localização (cidade e estado) é obrigatória"

#### Scenario: Year range validation
- **WHEN** both anoMinimo and anoMaximo are provided
- **AND** anoMinimo is greater than anoMaximo
- **THEN** the system MUST reject with HTTP 400
- **AND** return error message: "Ano mínimo não pode ser maior que ano máximo"

#### Scenario: Mileage range validation
- **WHEN** both quilometragemMinima and quilometragemMaxima are provided
- **AND** quilometragemMinima is greater than quilometragemMaxima
- **THEN** the system MUST reject with HTTP 400
- **AND** return error message: "Quilometragem mínima não pode ser maior que máxima"

#### Scenario: Multi-select validation
- **WHEN** anos or cores arrays are provided
- **THEN** the system MUST accept multiple values
- **AND** validate that at least one year is selected
- **AND** validate that at least one color is selected

#### Scenario: Price validation
- **WHEN** precoMax is provided
- **THEN** the system MUST validate it is greater than 0
- **AND** optionally compare against FIPE reference price

## REMOVED Requirements

### Requirement: Payment-Gated Intention Creation
**Reason**: Business model pivot - intentions are now free for buyers. Monetization moved to seller subscriptions.
**Migration**: Existing PENDENTE_PAGAMENTO intentions will be migrated to ATIVO status.

## ADDED Requirements

### Requirement: Vehicle Optional Features
The system SHALL support specifying desired optional features for vehicle intentions.

#### Scenario: Optional features selection
- **WHEN** an intention includes opcionais array
- **THEN** the system MUST store the list of desired features
- **AND** valid options MUST include:
  - VIDRO_ELETRICO
  - AR_CONDICIONADO
  - DIRECAO_HIDRAULICA
  - DIRECAO_ELETRICA
  - TETO_SOLAR
  - BANCOS_COURO
  - SENSOR_ESTACIONAMENTO
  - CAMERA_RE
  - MULTIMIDIA
  - BLUETOOTH
  - AIRBAG
  - ABS
  - ALARME
  - RODAS_LIGA
  - PILOTO_AUTOMATICO

#### Scenario: Optional features in response
- **WHEN** an intention is retrieved
- **THEN** the response MUST include opcionais array with selected features
- **AND** features MUST be returned as-is (same format as submitted)
