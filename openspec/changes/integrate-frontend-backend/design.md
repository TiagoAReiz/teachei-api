# Design: Frontend-Backend Integration

## Context
The TeAchei platform has three separately developed components:
1. **Backend** (Java Spring Boot) - Hexagonal architecture with defined REST endpoints
2. **Mobile** (Expo/React Native) - Service layer with incorrect API contracts
3. **Web** (Next.js) - Service layer with incorrect API contracts

The frontends were scaffolded with placeholder types that don't match the actual backend DTOs. This integration effort aligns all contracts.

## Goals / Non-Goals

### Goals
- Align all TypeScript types with Java DTOs
- Fix API endpoint paths in both frontends
- Ensure proper response mapping (nested objects)
- Handle authentication flow correctly (login → fetch profile)
- Establish pattern for future API integrations

### Non-Goals
- Changing backend API contracts (backend is source of truth)
- Adding new backend endpoints
- UI/UX changes (only data layer)
- Implementing features not yet in backend

## Decisions

### Decision: Backend is Source of Truth
Backend DTOs define the contract. Frontends adapt to match.
- **Alternative**: Create a shared types package → Too complex for MVP
- **Rationale**: Backend is already implemented and tested; changing it introduces risk

### Decision: Post-Login Profile Fetch
After successful login, frontends fetch profile to get full user data.
- Backend `AuthResponse` only returns `{token, usuarioId, email, expiresIn}`
- Full user/profile data requires separate `GET /v1/perfil` call
- **Alternative**: Modify backend to return user in AuthResponse → Breaks existing contract
- **Rationale**: Follows REST principles; profile is a separate resource

### Decision: Response Mapping in Service Layer
Transform backend responses to frontend-friendly structures in service files.
- Keep domain types aligned with backend
- Add view-model transformation where needed for UI components
- **Alternative**: Use backend structure directly everywhere → Requires UI changes
- **Rationale**: Minimizes UI component changes; localized transformation

### Decision: Wrapper Unwrapping for Vehicle Data
Vehicle endpoints return wrapped responses (`{marcas: [...]}`, `{modelos: [...]}`)
- Services unwrap these to arrays for simpler consumption
- **Rationale**: Cleaner hook/component usage

## Type Mapping Table

| Backend DTO | Frontend Type | Notes |
|-------------|---------------|-------|
| `AuthResponse` | Custom handling | Login returns token only; profile fetched separately |
| `PerfilResponse` | `User` | Map field names, add computed fields |
| `AnuncioResponse` | `Anuncio` | Flatten `veiculo` and `contato` nested objects |
| `CriarAnuncioRequest` | `CreateAnuncioRequest` | Rename `tipo` → `tipoVeiculo` in frontend |
| `PaginaResponse<T>` | `PaginatedResponse<T>` | Same structure, different naming |
| `MarcasResponse` | `Marca[]` | Unwrap `marcas` array |
| `ModelosResponse` | `Modelo[]` | Unwrap `modelos` array |
| `AnosResponse` | `Ano[]` | Unwrap `anos` array |
| `PrecoFipeResponse` | `VeiculoInfo` (partial) | Map to subset of fields |

## Endpoint Path Corrections

| Current (Wrong) | Correct | Service |
|-----------------|---------|---------|
| `/api/auth/login` | `/v1/auth/login` | Mobile auth |
| `/api/auth/registro` | `/v1/auth/registrar` | Mobile auth |
| `/api/usuarios/me` | `/v1/perfil` | Mobile/Web auth |
| `/api/anuncios` | `/v1/anuncios` | Mobile/Web intentions |
| `/api/veiculos/...` | `/v1/veiculos/...` | Mobile/Web vehicles |

## Risks / Trade-offs

### Risk: Breaking Changes During Integration
**Mitigation**: Implement changes incrementally; test each service before proceeding

### Risk: Type Drift in Future
**Mitigation**: Document mapping table; consider codegen in future

### Trade-off: Transformation Overhead
Response mapping adds code complexity but provides stable internal types.
Accepted for MVP; reconsider codegen for production.

## Open Questions
- None at this time; all contracts are clearly defined in backend code


