# Change: Initialize TeAchei Backend with Hexagonal Architecture

## Why
TeAchei is an "inverted marketplace" where buyers announce purchase intentions for vehicles, and sellers come to them. The backend needs a clean, scalable architecture that supports polyglot persistence (PostgreSQL for users, Azure Cosmos DB for flexible intention documents), JWT authentication, vehicle data integration (FIPE API), and payment processing (Mercado Pago).

## What Changes

### Infrastructure
- Docker Compose setup with PostgreSQL 16 and Azurite (Cosmos DB emulator)
- Environment-based configuration for local development and production
- Package refactoring from `Reiz.TeAchei` to `com.teachei.api`

### Architecture (Hexagonal/Ports & Adapters)
- **Domain Layer**: Pure POJOs for business entities (Usuario, Perfil, Anuncio, VeiculoInfo)
- **Application Layer**: Use cases and port interfaces (in/out)
- **Adapter Layer**: Controllers, persistence adapters, external API clients
- **Config Layer**: Spring bean configuration and dependency injection

### Core Capabilities
1. **User Authentication** - Spring Security + JWT (java-jwt 4.5.0) with UserDetails/UserDetailsService
2. **User Profiles** - Contact info, WhatsApp, social links, reputation
3. **Purchase Intentions** - Vehicle purchase announcements with multi-select (years, colors)
4. **Vehicle Data** - FIPE API integration with caching and circuit breaker
5. **Payment Integration** - Mercado Pago pay-per-ad model

### Dependencies to Add
- `com.auth0:java-jwt:4.5.0` - JWT token handling
- `com.azure:azure-cosmos` - Cosmos DB SDK
- `org.mapstruct:mapstruct` - Entity/DTO mapping
- `io.github.resilience4j:resilience4j-spring-boot3` - Circuit breaker for FIPE API
- `com.mercadopago:sdk-java` - Payment processing

## Impact
- **Affected specs**: New capabilities (core-domain, user-auth, purchase-intention, vehicle-data, payment-integration, user-profile)
- **Affected code**: Complete backend restructure following hexagonal architecture
- **Breaking changes**: Package rename from `Reiz.TeAchei` to `com.teachei.api`



