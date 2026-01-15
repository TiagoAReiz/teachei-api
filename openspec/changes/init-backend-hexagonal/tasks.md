# Tasks: Initialize TeAchei Backend

## 1. Project Structure & Infrastructure

- [x] 1.1 Refactor package from `Reiz.TeAchei` to `com.teachei.api`
- [x] 1.2 Create hexagonal architecture folder structure
- [x] 1.3 Update `pom.xml` with new dependencies (java-jwt, cosmos, mapstruct, resilience4j, mercadopago)
- [x] 1.4 Create `docker-compose.yml` with PostgreSQL 16 and Azurite
- [x] 1.5 Create `env.example` with all environment variables
- [x] 1.6 Configure `application.yml` with profiles (dev, prod)
- [x] 1.7 Create `Dockerfile` for the application

## 2. Domain Layer (Core Business)

- [x] 2.1 Create domain model: `Usuario` (pure POJO)
- [x] 2.2 Create domain model: `Perfil` with contact info
- [x] 2.3 Create domain model: `Anuncio` (purchase intention)
- [x] 2.4 Create value object: `VeiculoInfo` (marca, modelo, anos, cores)
- [x] 2.5 Create value object: `ContatoInfo` (whatsapp, instagram, etc)
- [x] 2.6 Create domain exceptions: `DomainException`, `AnuncioInvalidoException`
- [x] 2.7 Create domain service: `AnuncioService` with business rules

## 3. Application Layer (Use Cases & Ports)

- [x] 3.1 Define inbound port: `RegistrarUsuarioUseCase`
- [x] 3.2 Define inbound port: `AutenticarUsuarioUseCase`
- [x] 3.3 Define inbound port: `GerenciarPerfilUseCase`
- [x] 3.4 Define inbound port: `CriarAnuncioUseCase`
- [x] 3.5 Define inbound port: `BuscarAnunciosUseCase`
- [x] 3.6 Define inbound port: `BuscarVeiculosUseCase`
- [x] 3.7 Define outbound port: `UsuarioRepositoryPort`
- [x] 3.8 Define outbound port: `PerfilRepositoryPort`
- [x] 3.9 Define outbound port: `AnuncioRepositoryPort`
- [x] 3.10 Define outbound port: `VeiculoDataPort` (FIPE)
- [x] 3.11 Define outbound port: `PagamentoPort` (Mercado Pago)

## 4. Adapter Layer - Persistence (PostgreSQL)

- [x] 4.1 Create JPA entity: `UsuarioEntity` with Spring Security fields
- [x] 4.2 Create JPA entity: `PerfilEntity`
- [x] 4.3 Create JPA entity: `TransacaoPagamentoEntity`
- [x] 4.4 Create JPA repositories (Spring Data interfaces)
- [x] 4.5 Implement `UsuarioJpaAdapter` (outbound port implementation)
- [x] 4.6 Implement `PerfilJpaAdapter`
- [x] 4.7 Create MapStruct mappers for entity ↔ domain conversion

## 5. Adapter Layer - Persistence (Cosmos DB)

- [x] 5.1 Configure Azure Cosmos DB connection (Azurite for dev)
- [x] 5.2 Create Cosmos document model: `AnuncioDocument`
- [x] 5.3 Implement `AnuncioCosmosAdapter` (outbound port implementation)
- [x] 5.4 Implement dynamic query builder for filters (anos, cores, preço)

## 6. Adapter Layer - External APIs

- [x] 6.1 Create `FipeClient` using WebClient
- [x] 6.2 Implement `FipeAdapter` with caching (@Cacheable)
- [x] 6.3 Configure Resilience4j circuit breaker for FIPE
- [x] 6.4 Create `MercadoPagoClient`
- [x] 6.5 Implement `MercadoPagoAdapter` for payment processing
- [x] 6.6 Create webhook endpoint for payment confirmation

## 7. Adapter Layer - Web (REST Controllers)

- [x] 7.1 Create DTOs: request/response objects for all endpoints
- [x] 7.2 Create `AuthController` (register, login)
- [x] 7.3 Create `PerfilController` (CRUD profile)
- [x] 7.4 Create `AnuncioController` (create, list, filter, details)
- [x] 7.5 Create `VeiculoController` (marcas, modelos, anos, preço FIPE)
- [x] 7.6 Create `PagamentoController` (create preference, webhook)
- [x] 7.7 Create global exception handler (`@ControllerAdvice`)

## 8. Security Configuration

- [x] 8.1 Implement `CustomUserDetailsService`
- [x] 8.2 Create `JwtService` for token generation/validation
- [x] 8.3 Create `JwtAuthenticationFilter`
- [x] 8.4 Configure `SecurityFilterChain` with endpoint permissions
- [x] 8.5 Configure CORS for frontend origins
- [x] 8.6 Create `PasswordEncoderConfig` (BCrypt)

## 9. Configuration & Beans

- [x] 9.1 Create `BeanConfiguration` for dependency injection
- [x] 9.2 Create `CacheConfiguration` for FIPE caching
- [x] 9.3 Create `CosmosConfiguration` for Cosmos DB beans
- [x] 9.4 Create `WebClientConfiguration` for external API clients

## 10. Testing & Validation

- [ ] 10.1 Write unit tests for domain services
- [ ] 10.2 Write integration tests for JPA adapters
- [ ] 10.3 Write integration tests for Cosmos adapter
- [ ] 10.4 Write controller tests with MockMvc
- [ ] 10.5 Test Docker Compose environment locally

## Dependencies

- Task 2.x (Domain) has no dependencies - can start immediately
- Task 3.x (Ports) depends on 2.x completion
- Task 4.x, 5.x, 6.x (Adapters) depend on 3.x and can run in parallel
- Task 7.x (Controllers) depends on 3.x and DTOs
- Task 8.x (Security) can start after 4.1 (UsuarioEntity)
- Task 1.x (Infrastructure) can run in parallel with domain work

## Implementation Notes

### Package Structure Created
```
com.teachei.api
├── domain/
│   ├── model/          # Usuario, Perfil, Anuncio, VeiculoInfo, ContatoInfo, enums
│   ├── service/        # AnuncioService
│   └── exception/      # DomainException and subclasses
├── application/
│   ├── ports/
│   │   ├── in/         # Use case interfaces
│   │   └── out/        # Repository and external service ports
│   └── usecase/        # Use case implementations
├── adapter/
│   ├── in/
│   │   └── web/        # Controllers, DTOs, GlobalExceptionHandler
│   └── out/
│       ├── persistence/
│       │   ├── postgres/   # JPA entities, repositories, adapters
│       │   └── cosmosdb/   # Cosmos documents, repository, adapter
│       ├── external/
│       │   ├── fipe/       # FIPE API client and adapter
│       │   └── mercadopago/# Mercado Pago client and adapter
│       └── security/       # Password encoder adapter
└── config/
    ├── security/       # JWT, UserDetailsService, SecurityConfig
    └── ...             # BeanConfiguration, Cache, Cosmos, WebClient
```

### API Endpoints
- `POST /api/v1/auth/registrar` - User registration
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/perfil` - Get own profile
- `GET /api/v1/perfil/{usuarioId}` - Get public profile
- `PUT /api/v1/perfil` - Update own profile
- `POST /api/v1/anuncios` - Create intention
- `GET /api/v1/anuncios` - List/search intentions
- `GET /api/v1/anuncios/{id}` - Get intention details
- `GET /api/v1/anuncios/meus` - Get own intentions
- `GET /api/v1/veiculos/{tipo}/marcas` - Get brands
- `GET /api/v1/veiculos/{tipo}/marcas/{marca}/modelos` - Get models
- `GET /api/v1/veiculos/{tipo}/marcas/{marca}/modelos/{modelo}/anos` - Get years
- `GET /api/v1/veiculos/{tipo}/marcas/{marca}/modelos/{modelo}/anos/{ano}/preco` - Get FIPE price
- `POST /api/v1/pagamentos/preferencia/{anuncioId}` - Create payment
- `POST /api/v1/pagamentos/webhook` - Payment webhook

