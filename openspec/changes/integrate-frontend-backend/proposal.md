# Change: Integrate Mobile and Web Frontends with Backend API

## Why
The mobile (teachei-mobile) and web (teachei-web) frontends have API service layers implemented but they don't match the actual backend API contracts. There are type mismatches, incorrect endpoint paths, and response structure differences that must be resolved for the applications to function correctly with the TeAchei backend.

## What Changes

### Type Contract Alignment
- **AuthResponse**: Backend returns `{token, usuarioId, email, expiresIn, tokenType}`, frontends expect `{token, user: User}`
- **Anuncio/AnuncioResponse**: Backend uses nested `veiculo` and `contato` objects, frontends expect flat `veiculoInfo` structure
- **PerfilResponse**: Backend has different field structure than frontend `User` type
- **CreateAnuncioRequest**: Field naming differences (`tipo` vs `tipoVeiculo`, `anos: number[]` vs `anoMinimo/anoMaximo`)
- **Vehicle data responses**: Backend wraps in container objects (`MarcasResponse.marcas[]`), frontends expect arrays directly

### Mobile Service Layer (teachei-mobile)
- Fix endpoint paths: `/api/auth/*` → `/v1/auth/*`
- Fix auth service to handle backend AuthResponse (fetch profile separately)
- Fix intentions service response handling for nested structure
- Fix vehicles service to unwrap container responses
- Add proper error handling with typed errors

### Web Service Layer (teachei-web)
- Align lib/auth.ts with backend AuthResponse contract
- Update hooks/use-auth.ts to fetch profile after login
- Update hooks/use-intentions.ts response mapping
- Add vehicle data hooks for create intention flow
- Add payment integration hooks

### Shared Type Updates
- Sync mobile and web `types/index.ts` with backend DTOs
- Add missing types for vehicle data responses
- Add payment-related types
- Update pagination structure (`PaginaResponse` vs `PaginatedResponse`)

## Impact
- **Affected specs**: `mobile-api`, `web-auth`, `web-intentions`, `mobile-auth`, `mobile-intentions`
- **Affected code**:
  - `teachei-mobile/services/*.ts`
  - `teachei-mobile/types/index.ts`
  - `teachei-mobile/hooks/*.ts`
  - `teachei-web/lib/*.ts`
  - `teachei-web/hooks/*.ts`
  - `teachei-web/types/index.ts`
  - `teachei-web/config/env.ts` (endpoint paths)
- **Dependencies on**: `init-backend-hexagonal` (backend API must be stable)


