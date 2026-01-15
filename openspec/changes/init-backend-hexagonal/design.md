# Design: TeAchei Backend Architecture

## Context
TeAchei is a reverse marketplace platform where buyers post purchase intentions for vehicles. The system must:
- Handle flexible document structures for different niches (vehicles now, real estate/electronics later)
- Integrate with external APIs (FIPE for vehicle data)
- Process payments per announcement
- Scale horizontally on Azure Kubernetes Service

## Goals / Non-Goals

### Goals
- Clean separation between business logic and infrastructure
- Polyglot persistence without domain contamination
- Testable business rules without framework dependencies
- Easy addition of new niches without schema migrations

### Non-Goals
- Full microservices architecture (monolith first)
- Real-time matching notifications (Phase 2)
- Image upload functionality (Phase 4)
- Multi-tenant support

## Decisions

### 1. Hexagonal Architecture (Ports & Adapters)

**Decision**: Adopt hexagonal architecture with clear layer boundaries.

**Structure**:
```
com.teachei.api
├── domain/                    # Core business logic (no framework deps)
│   ├── model/                 # Entities and Value Objects
│   ├── service/               # Domain services
│   └── exception/             # Domain exceptions
├── application/               # Use cases orchestration
│   └── ports/
│       ├── in/                # Inbound ports (use case interfaces)
│       └── out/               # Outbound ports (repository/external interfaces)
├── adapter/                   # Infrastructure implementations
│   ├── in/
│   │   └── web/               # REST controllers + DTOs
│   └── out/
│       ├── persistence/
│       │   ├── postgres/      # JPA adapters (users, profiles, transactions)
│       │   └── cosmosdb/      # Cosmos adapters (intentions/anuncios)
│       └── external/
│           ├── fipe/          # FIPE API client
│           └── mercadopago/   # Payment gateway
└── config/                    # Spring configuration
```

**Rationale**: Protects domain from infrastructure changes. NoSQL or FIPE API can be swapped without touching business rules.

### 2. Polyglot Persistence Strategy

**Decision**: Use PostgreSQL for structured data, Azure Cosmos DB for flexible documents.

| Data Type | Database | Reason |
|-----------|----------|--------|
| Users, Credentials | PostgreSQL | Strong consistency, relationships |
| Profiles | PostgreSQL | Linked to users |
| Payment Transactions | PostgreSQL | Audit trail, ACID |
| Purchase Intentions | Cosmos DB | Flexible schema per niche |

**Cosmos DB Document Structure**:
```json
{
  "id": "uuid",
  "userId": "user-uuid",
  "nicho": "VEICULO",
  "tipo": "CARRO",
  "status": "ATIVO",
  "detalhes": {
    "marca": "Toyota",
    "modelo": "Corolla",
    "anos": [2020, 2021, 2022],
    "cores": ["Branco", "Prata"],
    "precoMax": 120000.00
  },
  "contato": {
    "whatsapp": "5511999999999",
    "instagram": "@user"
  },
  "criadoEm": "2024-01-15T10:30:00Z",
  "expiraEm": "2024-02-15T10:30:00Z"
}
```

### 3. Authentication Strategy

**Decision**: Spring Security with custom UserDetailsService + JWT tokens (java-jwt library). No refresh tokens for MVP simplicity.

**Flow**:
1. User registers with email/password (stored in PostgreSQL with BCrypt)
2. Login returns JWT access token (longer-lived: 7 days)
3. All API requests include `Authorization: Bearer <token>`
4. Spring Security filter validates JWT on each request
5. User re-authenticates when token expires

**Alternatives Considered**:
- Full Auth0 integration: Deferred to later phase (adds complexity, cost)
- Session-based auth: Not suitable for mobile clients
- Refresh tokens: Deferred to future phase for simplicity

### 4. External API Resilience (FIPE)

**Decision**: Use Resilience4j with caching for FIPE API calls.

**Configuration**:
- **Cache**: Redis or in-memory with 24h TTL (FIPE data rarely changes)
- **Circuit Breaker**: Open after 5 failures, half-open after 30s
- **Fallback**: Allow manual input if FIPE is unavailable

### 5. Payment Integration

**Decision**: Mercado Pago SDK for Brazilian market payment processing.

**Flow**:
1. User creates intention draft
2. System generates Mercado Pago payment preference
3. User completes payment (redirect or PIX)
4. Webhook confirms payment → intention goes live

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Cosmos DB learning curve | Use Azurite locally, well-documented adapters |
| FIPE API downtime | Circuit breaker + manual fallback |
| JWT token theft | 7-day expiry, HTTPS only, secure storage on client |
| Payment webhook reliability | Idempotent processing, status reconciliation job |

## Migration Plan

### Phase 1: Foundation (This Change)
1. Refactor package structure
2. Set up Docker Compose (Postgres + Azurite)
3. Implement hexagonal skeleton
4. User auth + profiles
5. Basic intention CRUD
6. FIPE integration
7. Mercado Pago integration

### Phase 2: Matching (Future)
- Notification system for seller matches

### Phase 3: Expansion (Future)
- Real estate and electronics niches

### Phase 4: Media (Future)
- Azure Blob Storage for images

## Decisions on Open Questions

1. **Refresh Token**: Not implemented for MVP. Access tokens last 7 days.
2. **Intention Expiry**: 60 days after payment confirmation.
3. **FIPE API Provider**: Community API (https://deividfortuna.github.io/fipe/) for MVP.

