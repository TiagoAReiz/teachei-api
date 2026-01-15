# Change: Initialize TeAchei Mobile Frontend

## Why
The TeAchei mobile app needs to be implemented following the UI/UX designs provided in the TELAS folder. The app will connect to the backend API for authentication, intentions management, vehicle data, and payments. The implementation must be production-ready with environment-based configuration.

## What Changes

### Design System
- Implement TeAchei theme based on mockups:
  - Primary color: `#137fec`
  - Font family: Plus Jakarta Sans
  - Rounded corners, soft shadows, modern mobile-first design
- Dark mode support throughout

### Screens Implementation (from TELAS mockups)
1. **Login Screen** - Email/password, Apple/Google OAuth, role selection modal
2. **Home Feed** - Intentions feed with search, type filters (Carros/Motos/Caminhões)
3. **Create Ad Flow** - 4-step wizard (Category → Brand/Model → Specs → Review/Pay)
4. **Intention Details** - Full specs view with WhatsApp CTA
5. **User Profile** - Public profile with bio, social links, other intentions
6. **My Intentions Dashboard** - Buyer's dashboard with active/pending/finished intentions

### API Integration
- Environment-based API URL configuration (local dev vs production)
- Axios/fetch service with JWT token management
- API endpoints for: auth, intentions, vehicles (FIPE), profiles, payments
- Error handling and loading states

### Navigation Structure
- Tab navigation: Home, Salvos (Favorites), Chat, Perfil
- Stack navigation for: Login, Create Ad flow, Intention Details, Profile
- Floating Action Button (FAB) for creating new intentions

### Dependencies to Add
- `nativewind` or `tamagui` - Styling (TailwindCSS-like)
- `axios` - HTTP client
- `@react-native-async-storage/async-storage` - Token storage
- `expo-secure-store` - Secure token storage
- `react-hook-form` + `zod` - Form validation
- `@tanstack/react-query` - Data fetching and caching
- `expo-linking` - Deep links (WhatsApp, social)

## Impact
- **Affected specs**: New mobile capabilities
- **Affected code**: Complete app rewrite following TELAS designs
- **Dependencies on**: Backend API (init-backend-hexagonal) must be running



