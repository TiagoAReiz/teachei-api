# Design: API Security and Consistency Remediation

## Context
TeAchei is preparing for production deployment. A security and API consistency audit revealed critical issues that must be fixed before launch. The platform handles payment data (Mercado Pago) and personal information (WhatsApp, location), making security paramount.

## Goals / Non-Goals

### Goals
- Fix all identified security vulnerabilities
- Align frontend-backend API contracts
- Implement missing CRUD endpoints for intentions
- Add proper authorization checks
- Establish secure defaults for production

### Non-Goals
- Adding new features (only fixing existing contracts)
- Changing authentication mechanism (JWT stays)
- Adding OAuth/social login
- Implementing full PCI compliance (out of scope for MVP)

## Decisions

### Decision: Strict CORS in Production
Configure CORS to only allow known origins.
- **Implementation**: Use environment variable for allowed origins, default to strict list
- **Alternative**: Keep `*` for development only → Risk of misconfiguration
- **Rationale**: CORS is a defense-in-depth layer; should be properly configured

```java
// Example implementation
@Value("${app.cors.allowed-origins:http://localhost:3000}")
private List<String> allowedOrigins;

configuration.setAllowedOrigins(allowedOrigins);
configuration.setAllowCredentials(true); // Enable for JWT in cookies
```

### Decision: Rate Limiting with Bucket4j
Add rate limiting to authentication endpoints.
- **Login**: 5 attempts per minute per IP
- **Registration**: 3 attempts per hour per IP
- **API general**: 100 requests per minute per user
- **Alternative**: Redis-based rate limiting → Overkill for MVP
- **Rationale**: Bucket4j is simple, in-memory, sufficient for single-node MVP

### Decision: Enforce Webhook Secret
Make webhook signature validation mandatory.
- **Implementation**: Fail application startup if `MERCADOPAGO_WEBHOOK_SECRET` is not set in production profile
- **Alternative**: Keep optional → Security risk
- **Rationale**: Webhooks handle payment confirmation; must be secured

### Decision: Filter Intentions by Status and Visibility
Public listing should only show `ATIVO` intentions.
- `PENDENTE_PAGAMENTO`, `EXPIRADO`, `FINALIZADO` are visible only to owner
- **Implementation**: Add status filter in `BuscarAnunciosUseCaseImpl`
- **Alternative**: Return all with frontend filtering → Information leakage

### Decision: Add Security Headers via Filter
Add standard security headers to all responses.
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains (production only)
Content-Security-Policy: default-src 'self'
```

### Decision: Backend Adapts Pagination Parameter Names
Accept both naming conventions for backward compatibility.
- Accept: `page`/`pagina`, `size`/`tamanho`
- Prefer frontend naming (`page`, `size`) as Spring default
- **Rationale**: Easier to update backend once than both frontends

### Decision: Add Missing Intention Endpoints
Implement full CRUD with authorization:
- `PUT /v1/anuncios/{id}` - Only owner can update, only `PENDENTE_PAGAMENTO` status
- `DELETE /v1/anuncios/{id}` - Only owner can delete, only `PENDENTE_PAGAMENTO` status
- `POST /v1/anuncios/{id}/finalizar` - Only owner, only `ATIVO` status

### Decision: Input Validation for Social Links
Add regex validation for social media fields:
- **WhatsApp**: `^\+?[1-9]\d{10,14}$` (E.164 format)
- **Instagram**: `^@?[a-zA-Z0-9._]{1,30}$`
- **Facebook**: URL or username pattern
- **Rationale**: Prevents XSS and ensures valid contact information

### Decision: Enhanced Password Policy
Require stronger passwords:
- Minimum 8 characters (already exists)
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 digit
- **Alternative**: Zxcvbn library for strength estimation → Overkill for MVP
- **Rationale**: Balance security with user experience

## Type Alignment Strategy

### Pagination Response
Backend adopts Spring standard naming (already compatible):
```java
public record PaginaResponse<T>(
    List<T> content,      // was: items
    int page,             // was: pagina
    int size,             // was: tamanho
    long totalElements,   // was: total
    int totalPages,       // was: totalPaginas
    boolean hasNext,
    boolean hasPrevious
)
```

### Query Parameters
Update backend controller to accept both conventions:
```java
@GetMapping
public ResponseEntity<PaginaResponse<AnuncioResponse>> listar(
    @RequestParam(required = false) TipoVeiculo tipo,
    @RequestParam(required = false, name = "tipoVeiculo") TipoVeiculo tipoVeiculoAlias,
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(name = "pagina", required = false) Integer paginaAlias,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(name = "tamanho", required = false) Integer tamanhoAlias
) {
    TipoVeiculo tipoFinal = tipo != null ? tipo : tipoVeiculoAlias;
    int pageFinal = paginaAlias != null ? paginaAlias : page;
    int sizeFinal = tamanhoAlias != null ? tamanhoAlias : size;
    // ...
}
```

## Risks / Trade-offs

### Risk: Breaking Existing Clients
**Mitigation**: 
- Pagination field rename is breaking → Frontend must be deployed together
- Use feature flags if needed

### Risk: Rate Limiting False Positives
**Mitigation**:
- Start with generous limits
- Add monitoring to tune thresholds
- Whitelist known IPs (internal services)

### Trade-off: Security vs Developer Experience
Stricter validation and security may slow development.
**Accepted**: Security is non-negotiable for production system handling payments.

### Trade-off: Performance Impact of Security Headers
Minimal overhead from header injection.
**Accepted**: Security headers are industry standard.

## Migration Plan

1. **Phase 1 - Non-Breaking Changes**
   - Add security headers
   - Add rate limiting
   - Add input validation
   - Enforce webhook secret (production)

2. **Phase 2 - API Contract Alignment** (requires coordinated deploy)
   - Rename pagination fields
   - Add missing endpoints
   - Update frontend types and services

3. **Phase 3 - Rollback Plan**
   - Keep old field names with `@JsonAlias` for 2 weeks
   - Remove after confirming all clients updated

## Open Questions
- Should we implement CAPTCHA for registration? (Deferred to post-MVP)
- Should we add IP-based blocking for repeated auth failures? (Deferred)


