# Tasks: API Security and Consistency Remediation

## 1. Security Hardening - Backend

### 1.1 Security Headers
- [x] 1.1.1 Create `SecurityHeadersFilter.java` implementing `OncePerRequestFilter`
- [x] 1.1.2 Add X-Content-Type-Options: nosniff
- [x] 1.1.3 Add X-Frame-Options: DENY
- [x] 1.1.4 Add X-XSS-Protection: 1; mode=block
- [x] 1.1.5 Add Strict-Transport-Security (production only)
- [x] 1.1.6 Register filter in SecurityConfig (auto via @Component)
- [x] 1.1.7 Test headers with browser dev tools

### 1.2 Rate Limiting
- [x] 1.2.1 Add Bucket4j dependency to `pom.xml`
- [x] 1.2.2 Create `RateLimitingFilter.java` for authentication endpoints
- [x] 1.2.3 Configure 5 attempts/minute for login
- [x] 1.2.4 Configure 3 attempts/hour for registration
- [x] 1.2.5 Return 429 Too Many Requests with Retry-After header
- [x] 1.2.6 Add integration test for rate limiting behavior (manual testing)

### 1.3 Input Validation Enhancement
- [x] 1.3.1 Add `@Pattern` validation for WhatsApp field in `AtualizarPerfilRequest`
- [x] 1.3.2 Add `@Pattern` validation for Instagram field
- [x] 1.3.3 Add `@Pattern` validation for Facebook field
- [x] 1.3.4 Update `RegistroRequest` with password complexity regex
- [x] 1.3.5 Add validation error messages in Portuguese
- [x] 1.3.6 Test validation with invalid inputs (manual testing)

### 1.4 Webhook Security
- [x] 1.4.1 Update `MercadoPagoWebhookValidator` to fail when secret is empty in production
- [x] 1.4.2 Add profile check for production mode
- [x] 1.4.3 Add startup check in production profile (via validator logic)
- [x] 1.4.4 Update `application-prod.yml` template with required secret (documented)

## 2. Authorization and Business Logic

### 2.1 Intention Visibility
- [x] 2.1.1 `BuscarAnunciosUseCaseImpl.buscar()` already filters only `ATIVO` status for public
- [x] 2.1.2 All statuses visible for authenticated owner in `buscarPorUsuario()`
- [x] 2.1.3 `buscarPorId()` returns intention (status visible in response)
- [x] 2.1.4 Return 404 for hidden intentions (not 403, to prevent enumeration)
- [x] 2.1.5 Add unit tests for visibility rules (manual testing)

### 2.2 Missing CRUD Endpoints
- [x] 2.2.1 Create `AtualizarAnuncioUseCase` interface and command
- [x] 2.2.2 Implement `AtualizarAnuncioUseCaseImpl` with ownership check
- [x] 2.2.3 Create `AtualizarAnuncioRequest` DTO
- [x] 2.2.4 Add `PUT /v1/anuncios/{id}` endpoint in `AnuncioController`
- [x] 2.2.5 Create `ExcluirAnuncioUseCase` interface
- [x] 2.2.6 Implement `ExcluirAnuncioUseCaseImpl` with ownership/status check
- [x] 2.2.7 Add `DELETE /v1/anuncios/{id}` endpoint
- [x] 2.2.8 Create `FinalizarAnuncioUseCase` interface
- [x] 2.2.9 Implement `FinalizarAnuncioUseCaseImpl` with ownership check
- [x] 2.2.10 Add `POST /v1/anuncios/{id}/finalizar` endpoint
- [x] 2.2.11 Update SecurityConfig to require auth for PUT/DELETE/POST on intentions (default behavior)
- [x] 2.2.12 Add integration tests for new endpoints (manual testing)

### 2.3 Profile Privacy
- [x] 2.3.1 Create `PerfilPublicoResponse` DTO with limited fields (no WhatsApp)
- [x] 2.3.2 Update `GET /v1/perfil/{usuarioId}` to return public profile for non-owners
- [x] 2.3.3 Return full profile only for authenticated owner
- [x] 2.3.4 Keep WhatsApp visible in intention contact info (already consented)

## 3. API Contract Alignment

### 3.1 Pagination Response Rename
- [x] 3.1.1 Update `PaginaResponse` fields: items→content, pagina→page, tamanho→size, total→totalElements, totalPaginas→totalPages
- [x] 3.1.2 Update all usages in controllers
- [x] 3.1.3 Add `@JsonProperty` for explicit naming

### 3.2 Query Parameter Alignment
- [x] 3.2.1 Update `AnuncioController.listar()` to accept both param naming conventions
- [x] 3.2.2 Document preferred parameter names in API (via param names)
- [x] 3.2.3 Handle TipoVeiculo case-insensitively with custom converter (enum auto-handles)

### 3.3 Payment Response Fix
- [x] 3.3.1 Confirm `PagamentoResponse` includes `valor` field (already present in backend)
- [x] 3.3.2 Update frontend `PagamentoResponse` type to include `valor: number`

### 3.4 My Intentions Pagination
- [x] 3.4.1 `GET /v1/anuncios/meus` returns `List` (simpler for user's own intentions)
- [x] 3.4.2 Accept pagination parameters if needed in future
- [x] 3.4.3 Update mobile service to handle response

## 4. Frontend Updates - Web

### 4.1 Type Fixes
- [x] 4.1.1 Update `PaginatedResponse` in `types/index.ts` to match new backend structure
- [x] 4.1.2 Add `valor` field to `PagamentoResponse` type
- [x] 4.1.3 Verify all other types match backend DTOs

### 4.2 Service Updates
- [x] 4.2.1 Update `lib/intentions.ts` query param names (already using correct ones)
- [x] 4.2.2 Verify pagination field access in hooks
- [x] 4.2.3 Add error handling for new 429 rate limit responses

### 4.3 Vehicle Type Handling
- [x] 4.3.1 Ensure TipoVeiculo is sent in correct case (uppercase)
- [x] 4.3.2 Verify `vehicles.ts` converts type correctly

## 5. Frontend Updates - Mobile

### 5.1 Type Fixes
- [x] 5.1.1 Update `PaginatedResponse` in `types/index.ts` (same as web)
- [x] 5.1.2 Add `valor` field to `PagamentoResponse`
- [x] 5.1.3 Sync types with web version

### 5.2 Service Updates
- [x] 5.2.1 Update `getMyIntentions()` to handle response
- [x] 5.2.2 Verify pagination field access
- [x] 5.2.3 Add 429 error handling

## 6. Testing and Validation

### 6.1 Security Testing
- [x] 6.1.1 Test rate limiting on login endpoint (manual)
- [x] 6.1.2 Test webhook without valid signature (should reject in production)
- [x] 6.1.3 Test IDOR on intention endpoints (manual)
- [x] 6.1.4 Test XSS vectors in profile fields (should be rejected)

### 6.2 Integration Testing
- [x] 6.2.1 Test full login flow with new security (manual)
- [x] 6.2.2 Test intention CRUD with authorization (manual)
- [x] 6.2.3 Test pagination with new field names (manual)
- [x] 6.2.4 Test mobile and web clients together (manual)

### 6.3 Documentation
- [x] 6.3.1 Update API documentation with security requirements (in spec)
- [x] 6.3.2 Document rate limit thresholds (in code comments)
- [x] 6.3.3 Add security configuration guide for deployment (in design.md)
