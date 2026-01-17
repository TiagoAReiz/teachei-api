# Spec: API Security

## ADDED Requirements

### Requirement: CORS Protection
The system SHALL restrict Cross-Origin Resource Sharing (CORS) to explicitly allowed origins only.

#### Scenario: Request from allowed origin
- **GIVEN** a frontend deployed at `https://teachei.com.br`
- **WHEN** the origin is configured in `app.cors.allowed-origins`
- **AND** a cross-origin request is made
- **THEN** the request SHALL be allowed with proper CORS headers

#### Scenario: Request from unauthorized origin
- **GIVEN** an attacker site at `https://evil.com`
- **WHEN** a cross-origin request is made to the API
- **THEN** the request SHALL be rejected with no CORS headers

#### Scenario: Development mode
- **GIVEN** the application is running in development profile
- **WHEN** a request comes from `http://localhost:3000`
- **THEN** the request SHALL be allowed

---

### Requirement: Security Headers
The system SHALL include security headers in all HTTP responses to prevent common web vulnerabilities.

#### Scenario: Response includes protective headers
- **WHEN** any HTTP response is returned
- **THEN** the following headers SHALL be present:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `X-XSS-Protection: 1; mode=block`

#### Scenario: HSTS in production
- **GIVEN** the application is running in production profile with HTTPS
- **WHEN** any HTTP response is returned
- **THEN** the header `Strict-Transport-Security: max-age=31536000; includeSubDomains` SHALL be present

---

### Requirement: Rate Limiting for Authentication
The system SHALL limit authentication attempts to prevent brute force attacks.

#### Scenario: Login rate limiting
- **GIVEN** an IP address has made 5 failed login attempts in the last minute
- **WHEN** another login attempt is made from the same IP
- **THEN** the request SHALL be rejected with HTTP 429 Too Many Requests
- **AND** a `Retry-After` header SHALL indicate when to retry

#### Scenario: Registration rate limiting
- **GIVEN** an IP address has made 3 registration attempts in the last hour
- **WHEN** another registration attempt is made from the same IP
- **THEN** the request SHALL be rejected with HTTP 429 Too Many Requests

#### Scenario: Successful login resets counter
- **GIVEN** an IP address has made 3 failed login attempts
- **WHEN** a successful login occurs from the same IP
- **THEN** the failed attempt counter SHALL be reset

---

### Requirement: Input Validation for Contact Fields
The system SHALL validate social media and contact fields to prevent injection attacks and ensure data quality.

#### Scenario: Valid WhatsApp number
- **GIVEN** a profile update request with `whatsapp: "+5511999998888"`
- **WHEN** the request is processed
- **THEN** the update SHALL succeed

#### Scenario: Invalid WhatsApp format
- **GIVEN** a profile update request with `whatsapp: "<script>alert('xss')</script>"`
- **WHEN** the request is processed
- **THEN** the request SHALL be rejected with validation error

#### Scenario: Valid Instagram handle
- **GIVEN** a profile update request with `instagram: "@teachei_oficial"`
- **WHEN** the request is processed
- **THEN** the update SHALL succeed

#### Scenario: Invalid Instagram format
- **GIVEN** a profile update request with `instagram: "javascript:void(0)"`
- **WHEN** the request is processed
- **THEN** the request SHALL be rejected with validation error

---

### Requirement: Password Complexity
The system SHALL enforce password complexity requirements to ensure account security.

#### Scenario: Strong password accepted
- **GIVEN** a registration request with `senha: "Senha@123"`
- **WHEN** the password contains:
  - At least 8 characters
  - At least 1 uppercase letter
  - At least 1 lowercase letter
  - At least 1 digit
- **THEN** the registration SHALL proceed

#### Scenario: Weak password rejected
- **GIVEN** a registration request with `senha: "12345678"`
- **WHEN** the password lacks required complexity
- **THEN** the request SHALL be rejected with message explaining requirements

---

### Requirement: Webhook Signature Validation
The system SHALL validate Mercado Pago webhook signatures to prevent unauthorized payment confirmations.

#### Scenario: Valid webhook signature
- **GIVEN** a webhook request with valid `x-signature` header
- **WHEN** the signature matches the configured secret
- **THEN** the webhook SHALL be processed

#### Scenario: Invalid webhook signature
- **GIVEN** a webhook request with invalid or missing `x-signature` header
- **WHEN** the system is running in production profile
- **THEN** the webhook SHALL be rejected with HTTP 401

#### Scenario: Missing secret in production
- **GIVEN** the environment variable `MERCADOPAGO_WEBHOOK_SECRET` is not set
- **WHEN** the application starts in production profile
- **THEN** startup SHALL fail with configuration error

---

### Requirement: Intention Visibility Control
The system SHALL control intention visibility based on status and ownership to protect user privacy.

#### Scenario: Public listing shows only active intentions
- **GIVEN** the database contains intentions with various statuses
- **WHEN** an unauthenticated user lists intentions via `GET /v1/anuncios`
- **THEN** only intentions with status `ATIVO` SHALL be returned

#### Scenario: Owner sees all their intentions
- **GIVEN** a user has created intentions with statuses ATIVO, PENDENTE_PAGAMENTO, and FINALIZADO
- **WHEN** the user calls `GET /v1/anuncios/meus`
- **THEN** all their intentions SHALL be returned regardless of status

#### Scenario: Non-owner cannot access pending payment intention
- **GIVEN** user A created an intention with status `PENDENTE_PAGAMENTO`
- **WHEN** user B (or anonymous) requests `GET /v1/anuncios/{id}`
- **THEN** HTTP 404 Not Found SHALL be returned

#### Scenario: Owner can access their pending intention
- **GIVEN** user A created an intention with status `PENDENTE_PAGAMENTO`
- **WHEN** user A requests `GET /v1/anuncios/{id}`
- **THEN** the intention details SHALL be returned

---

### Requirement: Intention CRUD Authorization
The system SHALL enforce ownership checks for intention modification operations.

#### Scenario: Owner can update their pending intention
- **GIVEN** user A has an intention with status `PENDENTE_PAGAMENTO`
- **WHEN** user A calls `PUT /v1/anuncios/{id}` with valid updates
- **THEN** the intention SHALL be updated

#### Scenario: Non-owner cannot update intention
- **GIVEN** user A has an intention
- **WHEN** user B calls `PUT /v1/anuncios/{id}`
- **THEN** HTTP 403 Forbidden SHALL be returned

#### Scenario: Owner can delete their pending intention
- **GIVEN** user A has an intention with status `PENDENTE_PAGAMENTO`
- **WHEN** user A calls `DELETE /v1/anuncios/{id}`
- **THEN** the intention SHALL be deleted

#### Scenario: Cannot delete active intention
- **GIVEN** user A has an intention with status `ATIVO`
- **WHEN** user A calls `DELETE /v1/anuncios/{id}`
- **THEN** HTTP 400 Bad Request SHALL be returned with appropriate message

#### Scenario: Owner can finalize their active intention
- **GIVEN** user A has an intention with status `ATIVO`
- **WHEN** user A calls `POST /v1/anuncios/{id}/finalizar`
- **THEN** the intention status SHALL change to `FINALIZADO`

---

### Requirement: Public Profile Privacy
The system SHALL limit exposed profile information for non-owners to protect user privacy.

#### Scenario: Owner views own profile
- **GIVEN** user A is authenticated
- **WHEN** user A calls `GET /v1/perfil`
- **THEN** the full profile including WhatsApp SHALL be returned

#### Scenario: User views another user's profile
- **GIVEN** user A is authenticated
- **WHEN** user A calls `GET /v1/perfil/{userBId}`
- **THEN** only public fields (nome, bio, cidade, estado, avaliacaoMedia) SHALL be returned
- **AND** WhatsApp SHALL NOT be included in response

#### Scenario: Anonymous views profile
- **GIVEN** an unauthenticated request
- **WHEN** `GET /v1/perfil/{userId}` is called
- **THEN** only public fields SHALL be returned

---

## ADDED Requirements (API Contract)

### Requirement: Pagination Response Structure
The system SHALL use consistent pagination response structure aligned with Spring Data conventions.

#### Scenario: Paginated response format
- **WHEN** a paginated endpoint returns results
- **THEN** the response SHALL contain:
  - `content`: Array of items
  - `page`: Current page number (0-indexed)
  - `size`: Page size
  - `totalElements`: Total item count
  - `totalPages`: Total page count
  - `hasNext`: Boolean indicating more pages
  - `hasPrevious`: Boolean indicating previous pages

---

### Requirement: Query Parameter Compatibility
The system SHALL accept both legacy and standard pagination parameter names for backward compatibility.

#### Scenario: Standard parameter names
- **WHEN** a request includes `page=0&size=20`
- **THEN** the parameters SHALL be processed correctly

#### Scenario: Legacy parameter names
- **WHEN** a request includes `pagina=0&tamanho=20`
- **THEN** the parameters SHALL be processed correctly

#### Scenario: Mixed parameter names
- **WHEN** a request includes `page=0&tamanho=20`
- **THEN** standard names SHALL take precedence for each parameter

---

### Requirement: Vehicle Type Case Insensitivity
The system SHALL accept vehicle type in any case to improve API usability.

#### Scenario: Uppercase vehicle type
- **WHEN** a request includes `tipo=CARRO`
- **THEN** the request SHALL be processed correctly

#### Scenario: Lowercase vehicle type
- **WHEN** a request includes `tipo=carro`
- **THEN** the request SHALL be processed correctly

#### Scenario: Mixed case vehicle type
- **WHEN** a request includes `tipo=Carro`
- **THEN** the request SHALL be processed correctly


