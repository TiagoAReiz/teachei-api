## 1. Payment Flow Fix

- [x] 1.1 Update `review/page.tsx` to call payment preference API after successful intention creation
- [x] 1.2 Redirect to Mercado Pago checkout URL (sandbox in dev, production in prod)
- [x] 1.3 Handle payment preference API errors with toast and retry option
- [x] 1.4 Update price display from R$ 19,90 to R$ 2,00 in review page

## 2. Payment Result Pages

- [x] 2.1 Create `/app/pagamento/sucesso/page.tsx` - success message + redirect to feed
- [x] 2.2 Create `/app/pagamento/erro/page.tsx` - error message + retry option
- [x] 2.3 Create `/app/pagamento/pendente/page.tsx` - pending message + redirect to feed
- [x] 2.4 Update backend config to use R$ 2.00 as default price

## 3. Authentication Guard

- [x] 3.1 Create auth guard component/hook that checks authentication status
- [x] 3.2 Apply auth guard to `(main)/layout.tsx` for all protected routes
- [x] 3.3 Apply auth guard to `/create/layout.tsx`
- [x] 3.4 Redirect to `/login` when not authenticated
- [x] 3.5 Add loading state during auth check to prevent flash of content

## 4. My Intentions Page

- [x] 4.1 Verify API returns all statuses including PENDENTE_PAGAMENTO
- [x] 4.2 Implement "Pagar Agora" button functionality - redirect to payment
- [x] 4.3 Show appropriate status indicators for each intention state

## 5. Role Selection Fix

- [x] 5.1 Check if profile has role before redirecting to role-select
- [x] 5.2 Update `use-auth.ts` login/register success handlers to check existing role
- [x] 5.3 Ensure role is properly loaded from profile in `perfilToUser` mapping

## 6. Google Name Display

- [x] 6.1 Verify backend returns name in profile response after Google login
- [x] 6.2 Ensure `perfilToUser` correctly maps the name field
- [x] 6.3 Update profile display components to show user name

## 7. Create Flow Navigation

- [x] 7.1 Add "Cancelar" button in create layout header that goes to feed
- [x] 7.2 Keep back button for step-by-step navigation
- [x] 7.3 Ensure back button from step 1 goes to feed (not undefined history)

## 8. FIPE Year Selection (Optional Enhancement)

- [x] 8.1 Add `useAnos` hook call in specs page after model is selected
- [x] 8.2 Populate year dropdown with FIPE years instead of generic range
- [x] 8.3 Keep manual fallback if FIPE returns no years
- [x] 8.4 Store selected FIPE year code for potential future use

## 9. Testing & Validation

- [ ] 9.1 Test complete flow: register → create intention → pay → see in my-intentions
- [ ] 9.2 Test Google login flow with name display
- [ ] 9.3 Test accessing protected routes without auth
- [ ] 9.4 Test payment success/error/pending redirects
- [ ] 9.5 Test back navigation in create flow
