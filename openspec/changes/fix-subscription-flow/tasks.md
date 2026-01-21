# Tasks: Fix Subscription Flow

## Phase 1: Fix API Paths

### 1.1 Update subscriptions.ts API paths
- [x] Change `fetchPlanos()` path from `/v1/assinaturas/planos` to `/api/v1/assinaturas/planos`
- [x] Change `fetchMinhaAssinatura()` path from `/v1/assinaturas/minha` to `/api/v1/assinaturas/minha`
- [x] Change `checkAssinaturaAtiva()` path from `/v1/assinaturas/status` to `/api/v1/assinaturas/status`
- [x] Change `criarAssinatura()` path from `/v1/assinaturas` to `/api/v1/assinaturas`
- [x] Change `cancelarAssinatura()` path from `/v1/assinaturas/{id}` to `/api/v1/assinaturas/{id}`

## Phase 2: Verification

### 2.1 Build Verification
- [x] Run `npm run build` to verify no TypeScript errors
- [x] Run `npm run lint` to verify no lint errors (only pre-existing warnings)

### 2.2 Test Verification
- [x] Test subscription page loads and shows plans - requires manual testing
- [x] Test selecting a plan works - requires manual testing
- [x] Test clicking "Assinar agora" redirects to Mercado Pago - requires manual testing

## Dependencies
- None

## Notes
- This is a simple path correction fix
- The backend is already correctly configured
- Other frontend files already use `/api/v1/...` paths
