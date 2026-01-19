# Change: Fix Web Frontend Bugs

## Why
Multiple bugs are preventing users from completing core flows: payment redirection fails, intentions don't appear, Google login doesn't use the user's name, authentication guards are missing, and navigation is inconsistent. These issues block the MVP launch and create poor user experience.

## What Changes

### 1. Payment Flow (Critical)
- **BUG**: After creating an intention, user is not redirected to payment - just goes to intention detail page
- **FIX**: After successful intention creation, automatically create payment preference and redirect to Mercado Pago checkout

### 2. My Intentions Display (Critical)
- **BUG**: User's intentions don't appear in "Minhas Intenções" page, possibly because unpaid ones are filtered
- **FIX**: Show all user intentions including PENDENTE_PAGAMENTO status with "Pagar Agora" action button

### 3. Google Login Name (Medium)
- **BUG**: When creating account via Google, user's name from Google profile is not displayed in the frontend
- **FIX**: The backend already saves the Google name. Ensure frontend correctly loads and displays profile name after login

### 4. Vehicle Year/Fuel from FIPE (Medium)
- **BUG**: User manually selects year and fuel, but FIPE already knows available years for selected model
- **FIX**: Fetch available years from FIPE after model selection and let user select from that list instead of generic year range

### 5. Price Adjustment (Low)
- **BUG**: Price shows R$ 19,90 but should be R$ 2,00 for initial launch
- **FIX**: Update price display in frontend and backend configuration

### 6. Role Selection Persistence (Medium)
- **BUG**: Always shows role selection screen even after user has selected a role
- **FIX**: Check if user already has a role saved in profile before redirecting to role-select

### 7. Authentication Guard (Critical)
- **BUG**: Private pages (my-intentions, profile, create, etc.) don't redirect to login when accessed without authentication
- **FIX**: Add authentication guard to protected routes that redirects to /login with return URL

### 8. Post-Payment Redirect (Critical)
- **BUG**: After completing payment in Mercado Pago, returns to create intention screen instead of feed
- **FIX**: Create payment success/error/pending pages that redirect to feed, or directly redirect to feed from payment callback URLs

### 9. Create Flow Back Navigation (Low)
- **BUG**: Back button in create flow goes to browser history instead of allowing exit to feed
- **FIX**: Add explicit "Exit" or "Cancel" action that goes to feed, keep back button for step navigation

## Impact
- **Affected specs**: web-auth, web-intentions, web-payment (new), web-navigation (new)
- **Affected code**:
  - `teachei-web/app/create/review/page.tsx` - payment redirect after creation
  - `teachei-web/app/(main)/my-intentions/page.tsx` - show all statuses
  - `teachei-web/app/(main)/layout.tsx` - auth guard
  - `teachei-web/app/create/layout.tsx` - navigation improvements
  - `teachei-web/app/create/specs/page.tsx` - fetch years from FIPE
  - `teachei-web/hooks/use-auth.ts` - role check fix
  - `teachei-web/lib/auth.ts` - profile loading
  - `teachei-web/app/pagamento/` - new payment result pages
  - `TeAchei/src/main/resources/application.yml` - price config
