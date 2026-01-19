## Context

The TeAchei web frontend has multiple bugs affecting core user journeys:
- Payment flow is broken (users can't pay for intentions)
- Authentication is inconsistent (no guards on protected routes)
- Navigation is confusing (no way to exit create flow, wrong redirects after payment)
- Data from Google/FIPE is not being used properly

These bugs prevent users from completing the main use case: creating and paying for a purchase intention.

## Goals / Non-Goals

### Goals
- Users can create an intention and immediately proceed to payment
- Users can see all their intentions regardless of payment status
- Users logging in with Google see their name correctly
- Protected routes redirect to login when not authenticated
- Payment completion redirects to feed (success) or shows appropriate error
- Users can exit the create flow at any point
- Price is set to R$ 2,00 for initial testing

### Non-Goals
- Implementing full FIPE year selection (keep manual input as fallback for now)
- Complex payment retry logic
- Deep-linking / return URL after login (simple redirect to home for now)

## Decisions

### Decision 1: Inline Payment Flow
After intention creation, immediately call the payment preference API and redirect to Mercado Pago.

**Rationale**: Reduces friction. User clicks "Publicar e Pagar" and goes directly to payment.

**Alternative considered**: Two-step process (create, then show payment button). Rejected because it adds an extra click and users might abandon.

### Decision 2: Authentication Guard via Layout
Add authentication check in the `(main)/layout.tsx` that wraps all protected pages.

**Rationale**: Centralizes auth logic, all pages under `(main)` are protected automatically.

**Alternative considered**: Per-page auth checks. Rejected because it's repetitive and error-prone.

### Decision 3: Payment Result Pages
Create `/pagamento/sucesso`, `/pagamento/erro`, `/pagamento/pendente` pages that show brief status and redirect to feed.

**Rationale**: Mercado Pago redirects to these URLs. We need to handle them and guide user back to app.

**Alternative considered**: Just redirect URLs directly. Not possible as MP needs a page to redirect to.

### Decision 4: Keep Manual Year Input as Fallback
For vehicle specs, try to fetch years from FIPE but keep manual input if FIPE fails or returns no data.

**Rationale**: FIPE API can be unreliable. Don't break user flow if it fails.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Payment preference API fails | Show error toast and allow retry |
| Mercado Pago redirect fails | Payment result pages have fallback redirect to feed |
| FIPE years API fails | Fall back to manual year input |
| Auth check causes flash of content | Add loading state in auth guard |

## Migration Plan

1. Deploy backend price change first (R$ 2.00)
2. Deploy frontend changes
3. Test full flow in sandbox mode
4. No data migration needed - these are bug fixes

## Open Questions

- Should we store the return URL in localStorage for post-login redirect?
  - Decision: Not for MVP, just redirect to home
- Should role-select be skippable?
  - Decision: Keep it required for new users, just don't show for users who already have a role
