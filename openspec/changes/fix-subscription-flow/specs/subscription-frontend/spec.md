# Capability: Subscription Frontend

## MODIFIED Requirements

### Requirement: Subscription API Integration
The frontend SHALL use correct API paths for subscription endpoints.

#### Scenario: Fetch subscription plans
- **WHEN** the subscription page loads
- **THEN** the frontend MUST call `/api/v1/assinaturas/planos`
- **AND** the request MUST NOT require authentication (public endpoint)
- **AND** the response MUST display available plans with prices

#### Scenario: Check current subscription
- **WHEN** the subscription page loads for an authenticated user
- **THEN** the frontend MUST call `/api/v1/assinaturas/minha`
- **AND** if the user is not authenticated, return null without redirecting

#### Scenario: Create subscription
- **WHEN** an authenticated user clicks "Assinar agora" with a plan selected
- **THEN** the frontend MUST call `POST /api/v1/assinaturas` with `{ plano: "PLAN_ID" }`
- **AND** redirect the user to the Mercado Pago checkout URL from the response

#### Scenario: Cancel subscription
- **WHEN** an authenticated user cancels their subscription
- **THEN** the frontend MUST call `DELETE /api/v1/assinaturas/{id}`
