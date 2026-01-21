# Design: Fix Subscription Flow

## Problem Analysis

The subscription flow is broken due to API path mismatch:

| Component | Path Used | Expected by Backend |
|-----------|-----------|---------------------|
| `fetchPlanos()` | `/v1/assinaturas/planos` | `/api/v1/assinaturas/planos` |
| `fetchMinhaAssinatura()` | `/v1/assinaturas/minha` | `/api/v1/assinaturas/minha` |
| `checkAssinaturaAtiva()` | `/v1/assinaturas/status` | `/api/v1/assinaturas/status` |
| `criarAssinatura()` | `/v1/assinaturas` | `/api/v1/assinaturas` |
| `cancelarAssinatura()` | `/v1/assinaturas/{id}` | `/api/v1/assinaturas/{id}` |

The backend's `application.yml` configures:
```yaml
server:
  servlet:
    context-path: /api
```

This means ALL backend endpoints are prefixed with `/api`.

## Solution

Update `lib/subscriptions.ts` to use the correct paths with `/api` prefix:
- `/v1/assinaturas/planos` → `/api/v1/assinaturas/planos`
- `/v1/assinaturas/minha` → `/api/v1/assinaturas/minha`
- `/v1/assinaturas/status` → `/api/v1/assinaturas/status`
- `/v1/assinaturas` → `/api/v1/assinaturas`
- `/v1/assinaturas/{id}` → `/api/v1/assinaturas/{id}`

## Key Decisions

1. **Consistent with other files**: Other frontend files like `lib/intentions.ts`, `lib/auth.ts` already use `/api/v1/...` paths
2. **No backend changes**: The issue is purely on the frontend side
3. **Keep requireAuth settings**: `fetchPlanos` should have `requireAuth: false` since it's a public endpoint
