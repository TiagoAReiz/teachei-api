# Capability: Frontend API Integration

## ADDED Requirements

### Requirement: Backend-Aligned Type Contracts
Both mobile and web frontends SHALL use type definitions that match backend DTOs.

#### Scenario: AuthResponse handling
- **WHEN** a user logs in successfully
- **THEN** the frontend MUST receive `{token, usuarioId, email, expiresIn, tokenType}`
- **AND** MUST fetch full profile via `GET /v1/perfil` to get user details
- **AND** MUST store both token and user data appropriately

#### Scenario: AnuncioResponse mapping
- **WHEN** intentions are fetched from the API
- **THEN** the frontend MUST handle nested structure `{veiculo: {...}, contato: {...}}`
- **AND** MUST map to internal Anuncio type for component consumption

#### Scenario: Vehicle data unwrapping
- **WHEN** FIPE data is fetched
- **THEN** the frontend MUST unwrap container objects (e.g., `response.marcas` from `MarcasResponse`)
- **AND** return plain arrays to consuming components

### Requirement: Correct API Endpoint Paths
All API calls SHALL use the correct backend endpoint paths with `/v1` prefix.

#### Scenario: Authentication endpoints
- **WHEN** auth operations are performed
- **THEN** login MUST call `POST /v1/auth/login`
- **AND** register MUST call `POST /v1/auth/registrar`
- **AND** profile MUST call `GET /v1/perfil`

#### Scenario: Intentions endpoints
- **WHEN** intention operations are performed
- **THEN** list MUST call `GET /v1/anuncios`
- **AND** create MUST call `POST /v1/anuncios`
- **AND** my intentions MUST call `GET /v1/anuncios/meus`
- **AND** single intention MUST call `GET /v1/anuncios/{id}`

#### Scenario: Vehicle data endpoints
- **WHEN** vehicle data is fetched
- **THEN** brands MUST call `GET /v1/veiculos/{tipo}/marcas`
- **AND** models MUST call `GET /v1/veiculos/{tipo}/marcas/{marcaCodigo}/modelos`
- **AND** years MUST call `GET /v1/veiculos/{tipo}/marcas/{marcaCodigo}/modelos/{modeloCodigo}/anos`
- **AND** price MUST call `GET /v1/veiculos/{tipo}/marcas/{marcaCodigo}/modelos/{modeloCodigo}/anos/{anoCodigo}/preco`

#### Scenario: Payment endpoints
- **WHEN** payment operations are performed
- **THEN** create preference MUST call `POST /v1/pagamentos/preferencia/{anuncioId}`

### Requirement: Synchronized Type Definitions
Mobile and web frontends SHALL share consistent type definitions.

#### Scenario: User/Profile types
- **WHEN** user data is represented
- **THEN** types MUST include: `id, usuarioId, nome, bio, whatsapp, whatsappLink, instagram, facebook, cidade, estado, avaliacaoMedia, totalAvaliacoes, criadoEm`

#### Scenario: Anuncio types
- **WHEN** intention data is represented
- **THEN** types MUST include: `id, usuarioId, tipo, status, veiculo, contato, observacoes, criadoEm, expiraEm`
- **AND** `veiculo` MUST include: `marcaCodigo, marcaNome, modeloCodigo, modeloNome, anos[], cores[], precoMaximo, precoFipeReferencia, dadosManuais`
- **AND** `contato` MUST include: `whatsapp, whatsappLink, instagram, cidade, estado, localizacao`

#### Scenario: CreateAnuncio request types
- **WHEN** creating an intention
- **THEN** request MUST include: `tipo, marcaCodigo, marcaNome, modeloCodigo, modeloNome, anos[], cores[], precoMaximo, observacoes, dadosManuais`

### Requirement: Authentication Flow Integration
Frontends SHALL implement the correct authentication flow per backend contract.

#### Scenario: Login flow
- **WHEN** user submits login credentials
- **THEN** app MUST call `POST /v1/auth/login` with `{email, senha}`
- **AND** receive `{token, usuarioId, email, expiresIn, tokenType}`
- **AND** store token securely
- **AND** immediately fetch profile via `GET /v1/perfil`
- **AND** store profile data for UI consumption

#### Scenario: Registration flow
- **WHEN** user submits registration
- **THEN** app MUST call `POST /v1/auth/registrar` with `{email, senha, nome}`
- **AND** handle same response as login
- **AND** redirect to role selection after profile fetch

### Requirement: Error Response Handling
Frontends SHALL properly handle backend error responses.

#### Scenario: Validation errors
- **WHEN** backend returns 400 with validation errors
- **THEN** frontend MUST parse error structure `{message, code?, field?}`
- **AND** display appropriate field-level or form-level errors

#### Scenario: Authentication errors
- **WHEN** backend returns 401 Unauthorized
- **THEN** frontend MUST clear stored tokens
- **AND** redirect to login page

#### Scenario: Not found errors
- **WHEN** backend returns 404
- **THEN** frontend MUST display appropriate "not found" message
- **AND** provide navigation back to listing

### Requirement: Pagination Response Handling
Frontends SHALL correctly parse paginated responses.

#### Scenario: List intentions pagination
- **WHEN** paginated intentions are returned
- **THEN** frontend MUST parse `{content[], totalElements, totalPages, page, size}` structure
- **AND** support infinite scroll or page navigation accordingly


