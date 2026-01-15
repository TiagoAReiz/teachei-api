# Design: TeAchei Mobile Frontend Architecture

## Context
TeAchei mobile app built with Expo/React Native needs to implement the designs from TELAS folder while integrating with the Spring Boot backend API. The app serves two user personas: Buyers (who create purchase intentions) and Sellers (who respond to intentions).

## Goals / Non-Goals

### Goals
- Pixel-perfect implementation of TELAS mockups
- Seamless API integration with environment configuration
- Smooth navigation and user experience
- Offline-friendly with optimistic updates
- Production-ready code structure

### Non-Goals
- Push notifications (Phase 2)
- Real-time chat (Phase 2)
- Image uploads (Phase 4)
- Complex animations beyond basic transitions

## Decisions

### 1. Project Structure

**Decision**: Feature-based folder structure with shared components.

```
teachei-mobile/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Auth flow (login, register)
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── role-select.tsx
│   ├── (tabs)/                   # Main tab navigation
│   │   ├── _layout.tsx
│   │   ├── index.tsx             # Home feed
│   │   ├── favorites.tsx         # Saved intentions
│   │   ├── chat.tsx              # Messages (placeholder)
│   │   └── profile.tsx           # User profile
│   ├── create/                   # Create intention flow
│   │   ├── _layout.tsx
│   │   ├── category.tsx          # Step 1
│   │   ├── vehicle.tsx           # Step 2
│   │   ├── specs.tsx             # Step 3
│   │   └── review.tsx            # Step 4
│   ├── intention/
│   │   └── [id].tsx              # Intention details
│   ├── user/
│   │   └── [id].tsx              # Public profile
│   ├── my-intentions.tsx         # Dashboard
│   └── _layout.tsx
├── components/
│   ├── ui/                       # Primitives (Button, Input, Card)
│   ├── intentions/               # IntentionCard, IntentionList
│   ├── forms/                    # Form components
│   └── layout/                   # Header, TabBar, FAB
├── services/
│   ├── api.ts                    # Axios instance
│   ├── auth.ts                   # Auth API calls
│   ├── intentions.ts             # Intentions API
│   ├── vehicles.ts               # FIPE API
│   └── payments.ts               # Mercado Pago
├── hooks/
│   ├── use-auth.ts               # Auth state
│   ├── use-intentions.ts         # React Query hooks
│   └── use-vehicles.ts           # FIPE data hooks
├── stores/
│   └── auth-store.ts             # Zustand auth store
├── constants/
│   ├── theme.ts                  # Colors, fonts, spacing
│   └── config.ts                 # API URLs, env config
├── types/
│   └── index.ts                  # TypeScript types
└── utils/
    ├── storage.ts                # Secure storage helpers
    └── format.ts                 # Currency, date formatters
```

### 2. Styling Approach

**Decision**: NativeWind (TailwindCSS for React Native) for consistent styling with mockups.

**Rationale**: 
- TELAS mockups use Tailwind CSS classes
- Easy translation from HTML mockups to React Native
- Dark mode support built-in
- Type-safe with TypeScript

**Theme Configuration**:
```typescript
const theme = {
  colors: {
    primary: '#137fec',
    primaryDark: '#0c62b8',
    backgroundLight: '#f6f7f8',
    backgroundDark: '#101922',
    surfaceLight: '#ffffff',
    surfaceDark: '#1e2936',
    whatsapp: '#25D366',
  },
  fonts: {
    display: 'Plus Jakarta Sans',
  },
  borderRadius: {
    default: 16,
    lg: 24,
    xl: 32,
    full: 9999,
  },
};
```

### 3. API Configuration

**Decision**: Environment-based API URL with secure token storage.

**Configuration**:
```typescript
// constants/config.ts
export const API_CONFIG = {
  baseUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
};
```

**.env files**:
```
# .env.development
EXPO_PUBLIC_API_URL=http://localhost:8080

# .env.production
EXPO_PUBLIC_API_URL=https://api.teachei.com.br
```

### 4. State Management

**Decision**: 
- **Server state**: TanStack Query (React Query) for API data
- **Client state**: Zustand for auth and UI state

**Rationale**:
- React Query handles caching, refetching, optimistic updates
- Zustand is lightweight for simple client state
- Clear separation of concerns

### 5. Authentication Flow

**Decision**: JWT stored in expo-secure-store, with auth state in Zustand.

**Flow**:
1. User logs in → receives JWT token
2. Token stored in SecureStore
3. API client attaches token to all requests
4. On 401 → redirect to login
5. Role selection stored as user preference

### 6. Navigation Architecture

**Decision**: Expo Router with protected routes.

**Structure**:
- `(auth)` group: Public routes (login, register)
- `(tabs)` group: Protected main navigation
- `create` stack: Multi-step intention creation
- Modal routes: Role selection, filters

## Screens Mapping (TELAS → Implementation)

| TELAS Folder | Screen | Route |
|--------------|--------|-------|
| stitch_home_intentions_feed | Login + Role Modal | `/(auth)/login` |
| stitch_home_intentions_feed (1) | Home Feed | `/(tabs)/index` |
| stitch_home_intentions_feed (2) | Create Ad Step 1 | `/create/category` |
| stitch_home_intentions_feed (3) | Intention Details | `/intention/[id]` |
| stitch_home_intentions_feed (4) | User Profile | `/user/[id]` |
| stitch_home_intentions_feed (5) | My Intentions | `/my-intentions` |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| NativeWind learning curve | Start with core components, expand |
| API not ready | Use mock data initially, easy swap |
| Performance on large lists | Use FlashList, implement pagination |
| Secure storage on web | Fallback to AsyncStorage with warning |

## Open Questions

1. **Google/Apple Sign-In**: Defer social login to Phase 2? (Recommend: Yes, start with email only)
2. **Offline Support**: How much offline capability is needed? (Recommend: Cache read data only)
3. **Chat Feature**: Placeholder or remove from MVP? (Recommend: Placeholder with "coming soon")



