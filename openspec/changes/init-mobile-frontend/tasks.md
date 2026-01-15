# Tasks: Initialize TeAchei Mobile Frontend

## 1. Project Setup & Configuration

- [x] 1.1 Install dependencies (nativewind, axios, react-query, zustand, expo-secure-store, react-hook-form, zod)
- [x] 1.2 Configure NativeWind with TeAchei theme colors and fonts
- [x] 1.3 Add Plus Jakarta Sans font via expo-font
- [x] 1.4 Create environment configuration (config.ts with API_URL)
- [x] 1.5 Create .env.development and .env.example files
- [x] 1.6 Set up Axios instance with interceptors for JWT
- [x] 1.7 Configure React Query provider in _layout.tsx

## 2. Core Components (UI Primitives)

- [x] 2.1 Create Button component (primary, secondary, outline, ghost variants)
- [x] 2.2 Create Input component (with icon support, password visibility toggle)
- [x] 2.3 Create Card component (rounded corners, shadows as per TELAS)
- [x] 2.4 Create Chip/Tag component for filters and specs
- [x] 2.5 Create Avatar component
- [x] 2.6 Create Badge component (status indicators)
- [x] 2.7 Create BottomSheet component for modals
- [x] 2.8 Create FAB (Floating Action Button) component

## 3. Layout Components

- [x] 3.1 Create custom TabBar matching TELAS design (Home, Salvos, +FAB, Chat, Perfil)
- [x] 3.2 Create Header component with back button and title
- [x] 3.3 Create SearchBar component
- [x] 3.4 Create FilterChips horizontal scroll component
- [x] 3.5 Create SafeAreaWrapper for consistent spacing

## 4. Authentication Flow

- [x] 4.1 Create auth store (Zustand) for user state and token
- [x] 4.2 Create auth service (login, register, logout API calls)
- [x] 4.3 Create secure storage helpers (save/get/remove token)
- [x] 4.4 Implement Login screen matching TELAS design
- [x] 4.5 Implement Register screen
- [x] 4.6 Implement Role Selection modal (Buyer/Seller)
- [x] 4.7 Create protected route wrapper (redirect to login if unauthenticated)
- [x] 4.8 Implement auto-login on app start (check stored token)

## 5. Home Feed (Seller View)

- [x] 5.1 Create IntentionCard component matching TELAS
- [x] 5.2 Create IntentionsList with pull-to-refresh
- [x] 5.3 Implement Home screen with header, search, filters
- [x] 5.4 Create vehicle type filter chips (Todos, Carros, Motos, Caminhões)
- [x] 5.5 Implement search functionality
- [x] 5.6 Add pagination/infinite scroll for intentions list
- [x] 5.7 Create intentions service (API calls)
- [x] 5.8 Create useIntentions hook with React Query

## 6. Create Intention Flow (4 Steps)

- [x] 6.1 Create CreateIntention layout with progress stepper
- [x] 6.2 Implement Step 1: Category selection (Carro/Moto/Caminhão)
- [x] 6.3 Create vehicles service (FIPE API calls)
- [x] 6.4 Implement Step 2: Brand/Model selection with FIPE data
- [x] 6.5 Create multi-select components for years and colors
- [x] 6.6 Implement Step 3: Specs (years, colors, price, notes)
- [x] 6.7 Implement Step 4: Review and submit
- [x] 6.8 Create form state management with react-hook-form
- [x] 6.9 Implement Mercado Pago payment redirect after submission

## 7. Intention Details Screen

- [x] 7.1 Create intention details header with vehicle image
- [x] 7.2 Create specs grid component (year, colors, transmission, fuel)
- [x] 7.3 Create buyer notes section
- [x] 7.4 Create buyer profile card
- [x] 7.5 Implement WhatsApp deep link CTA button
- [x] 7.6 Implement share functionality
- [x] 7.7 Create useIntentionDetails hook

## 8. User Profile Screen

- [x] 8.1 Create profile header (avatar, name, verified badge, location)
- [x] 8.2 Create bio section
- [x] 8.3 Create social links (Instagram, Facebook) with deep links
- [x] 8.4 Create "Also looking for" section with mini intention cards
- [x] 8.5 Implement Contact User button
- [x] 8.6 Create useUserProfile hook

## 9. My Intentions Dashboard (Buyer View)

- [x] 9.1 Create MyIntentionCard component with status badge
- [x] 9.2 Create status filter chips (Todos, Ativos, Pendentes, Finalizados)
- [x] 9.3 Implement metrics display (views, proposals)
- [x] 9.4 Implement Edit/Complete actions
- [x] 9.5 Implement "Pagar Agora" for pending payment intentions
- [x] 9.6 Create FAB for "Nova Intenção"
- [x] 9.7 Create useMyIntentions hook

## 10. Profile Tab (Own Profile)

- [x] 10.1 Implement own profile view (reuse profile components)
- [x] 10.2 Add Edit Profile functionality
- [x] 10.3 Add Settings button
- [x] 10.4 Implement Logout

## 11. Favorites/Saved Tab

- [x] 11.1 Implement saved intentions list
- [x] 11.2 Add save/unsave functionality to IntentionCard
- [x] 11.3 Create empty state for no saved items

## 12. Chat Tab (Placeholder)

- [x] 12.1 Create "Coming Soon" placeholder screen
- [x] 12.2 Add illustration and message

## 13. Polish & Testing

- [x] 13.1 Implement loading states (skeletons) for all screens
- [x] 13.2 Implement error states with retry
- [x] 13.3 Implement empty states
- [x] 13.4 Test navigation flows
- [x] 13.5 Test API integration with backend
- [x] 13.6 Verify dark mode on all screens

## Dependencies

- Task 1.x (Setup) must complete first
- Task 2.x, 3.x (Components) can run in parallel
- Task 4.x (Auth) depends on 1.x and 2.x
- Task 5.x-9.x depend on 2.x, 3.x, 4.x and can run in parallel after
- Task 10.x-12.x depend on previous sections
- Task 13.x (Polish) runs last

## Backend Dependency

- All API-related tasks require `init-backend-hexagonal` to be implemented and running
- Use mock data for development if backend is not ready

