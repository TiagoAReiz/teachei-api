# Change: Audit and Fix API Security and Frontend-Backend Consistency

## Why
During a comprehensive analysis of the TeAchei codebase, critical security vulnerabilities and API contract inconsistencies were identified between the backend and both frontend clients (web and mobile). These issues could lead to runtime errors, security exploits, and poor user experience if not addressed before production deployment.

## What Changes

### Security Issues Found

1. ~~**CORS Completely Open**~~ - *Accepted risk for MVP* (mobile app simplicity)
2. **No Rate Limiting** - No protection against brute force attacks on login/registration endpoints
3. **Webhook Validation Optional** - `MercadoPagoWebhookValidator` accepts all requests when secret is not configured
4. **Missing IDOR Protection** - Unauthenticated users can see `PENDENTE_PAGAMENTO` intentions meant to be private
5. **No Input Sanitization** - WhatsApp, Instagram, Facebook fields accept any string (potential XSS vectors)
6. **Public Profile by UUID** - Personal info (WhatsApp) exposed to anyone knowing the UUID
7. **Missing Security Headers** - No HSTS, X-Frame-Options, X-Content-Type-Options, CSP
8. **No Audit Logging** - Sensitive operations not logged for security monitoring
9. **Weak Password Policy** - Only minimum length (8 chars), no complexity requirements

### API Contract Inconsistencies Found

1. **Pagination Response Mismatch**
   - Backend: `items`, `pagina`, `tamanho`, `total`, `totalPaginas`, `hasNext`, `hasPrevious`
   - Frontend: `content`, `page`, `size`, `totalElements`, `totalPages`

2. **Query Parameter Mismatch**
   - Backend expects: `pagina`, `tamanho`, `tipo`
   - Frontend sends: `page`, `size`, `tipoVeiculo`

3. **Missing Backend Endpoints** (Frontend calls them but they don't exist)
   - `PUT /v1/anuncios/{id}` - Update intention
   - `DELETE /v1/anuncios/{id}` - Delete intention
   - `POST /v1/anuncios/{id}/finalizar` - Mark as completed

4. **My Intentions Response Type**
   - Backend `GET /v1/anuncios/meus` returns `List<AnuncioResponse>`
   - Mobile expects `PaginatedResponse<Anuncio>`

5. **Payment Response Field**
   - Backend `PagamentoResponse` includes `valor: BigDecimal`
   - Frontend type missing `valor` field

6. **Vehicle Type Case Sensitivity**
   - Backend expects `TipoVeiculo.CARRO` (uppercase enum)
   - Frontend sends lowercase in URL path

## Impact

### Affected Code - Backend
- `SecurityConfig.java` - Security headers, rate limiting
- `MercadoPagoWebhookValidator.java` - Webhook validation strictness
- `AnuncioController.java` - New endpoints, authorization
- `BuscarAnunciosUseCaseImpl.java` - Filter hidden statuses
- `AtualizarPerfilRequest.java` - Input validation
- `RegistroRequest.java` - Password policy

### Affected Code - Frontend (Web)
- `types/index.ts` - Fix PaginatedResponse, add valor
- `lib/intentions.ts` - Fix query params
- `lib/vehicles.ts` - Handle case conversion

### Affected Code - Frontend (Mobile)
- `types/index.ts` - Same fixes as web
- `services/intentions.ts` - Fix pagination handling
- `constants/config.ts` - Ensure URL consistency

### Affected Specs
- `user-auth` - Password policy, rate limiting
- `purchase-intention` - CRUD operations, authorization
- `frontend-api` - Type contracts


