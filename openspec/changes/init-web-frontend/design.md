# Design: TeAchei Web Frontend Architecture

## Context
TeAchei web platform built with Next.js 16 needs to implement responsive versions of the mobile TELAS designs while leveraging web-specific benefits like SEO, public URLs, and server-side rendering.

## Goals / Non-Goals

### Goals
- Responsive implementation of TELAS designs
- SEO-optimized public intention pages
- Fast initial load with Server Components
- Shared design system with mobile
- Production-ready with environment configuration

### Non-Goals
- Native mobile parity (handled by Expo app)
- Real-time features (Phase 2)
- Admin dashboard (future)
- Payment processing on web (redirect to Mercado Pago)

## Decisions

### 1. Project Structure

**Decision**: Next.js App Router with feature-based organization.

```
teachei-web/
├── app/
│   ├── (auth)/                   # Auth pages (no layout)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── layout.tsx
│   ├── (main)/                   # Main app with nav
│   │   ├── layout.tsx            # Sidebar + header
│   │   ├── page.tsx              # Home feed
│   │   ├── favorites/page.tsx
│   │   ├── messages/page.tsx     # Placeholder
│   │   ├── profile/page.tsx      # Own profile
│   │   ├── settings/page.tsx
│   │   └── my-intentions/page.tsx
│   ├── create/                   # Create intention flow
│   │   ├── page.tsx              # Redirect to step 1
│   │   ├── [step]/page.tsx       # Dynamic step pages
│   │   └── layout.tsx
│   ├── intention/
│   │   └── [id]/page.tsx         # Public intention detail (SEO)
│   ├── user/
│   │   └── [id]/page.tsx         # Public profile (SEO)
│   ├── procuro/                  # SEO-friendly URLs
│   │   └── [slug]/page.tsx       # /procuro/honda-civic-2021-sp
│   ├── layout.tsx                # Root layout
│   ├── globals.css
│   └── providers.tsx             # React Query, Auth providers
├── components/
│   ├── ui/                       # Primitives (shadcn/ui style)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── intentions/
│   │   ├── intention-card.tsx
│   │   ├── intention-grid.tsx
│   │   ├── intention-filters.tsx
│   │   └── create-intention-form.tsx
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── mobile-nav.tsx
│   │   └── footer.tsx
│   └── profile/
│       ├── profile-header.tsx
│       └── profile-card.tsx
├── lib/
│   ├── api.ts                    # Fetch client
│   ├── auth.ts                   # Auth helpers
│   └── utils.ts                  # Utilities
├── hooks/
│   ├── use-auth.ts
│   ├── use-intentions.ts
│   └── use-vehicles.ts
├── types/
│   └── index.ts
└── config/
    ├── site.ts                   # Site metadata
    └── env.ts                    # Environment config
```

### 2. Styling Approach

**Decision**: Tailwind CSS 4 with CSS variables for theming.

**Theme Configuration (globals.css)**:
```css
@import "tailwindcss";

:root {
  --primary: #137fec;
  --primary-dark: #0c62b8;
  --background-light: #f6f7f8;
  --background-dark: #101922;
  --surface-light: #ffffff;
  --surface-dark: #1e2936;
  --whatsapp: #25D366;
}

@theme inline {
  --color-primary: var(--primary);
  --color-primary-dark: var(--primary-dark);
  --font-display: 'Plus Jakarta Sans', sans-serif;
}
```

### 3. Responsive Layout Strategy

**Decision**: Mobile-first with progressive enhancement.

| Breakpoint | Layout | Navigation |
|------------|--------|------------|
| <768px | Single column | Bottom nav bar |
| 768-1024px | 2 columns | Collapsible sidebar |
| >1024px | 3 columns | Fixed sidebar |

**Desktop Layout**:
```
┌─────────────────────────────────────────────────┐
│ Header (Logo, Search, User Menu)                │
├──────────┬────────────────────────┬─────────────┤
│          │                        │             │
│ Sidebar  │     Main Content       │  (Optional) │
│ - Home   │     (Intentions Grid)  │   Filters   │
│ - Saved  │                        │             │
│ - Chat   │                        │             │
│ - Profile│                        │             │
│          │                        │             │
└──────────┴────────────────────────┴─────────────┘
```

**Mobile Layout**:
```
┌─────────────────────┐
│ Header              │
├─────────────────────┤
│                     │
│   Main Content      │
│   (Single Column)   │
│                     │
├─────────────────────┤
│ Bottom Nav          │
└─────────────────────┘
```

### 4. SEO Strategy

**Decision**: Server Components + dynamic metadata for public pages.

**Intention Detail Page SEO**:
```typescript
// app/intention/[id]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const intention = await getIntention(params.id);
  return {
    title: `Procuro ${intention.modelo} - TeAchei`,
    description: `Comprador procura ${intention.modelo} ${intention.anos.join('/')} por até R$ ${intention.precoMax}`,
    openGraph: {
      title: `Procuro ${intention.modelo}`,
      description: intention.observacoes,
      images: [intention.imagemFipe],
    },
  };
}
```

**SEO-Friendly URLs**:
- `/procuro/honda-civic-2021-sp` - Intention with slug
- `/user/joao-silva` - User profile
- `/marca/toyota` - Brand listing (future)

### 5. Authentication Strategy

**Decision**: Custom JWT handling with cookies for SSR support.

**Flow**:
1. Login form submits to API
2. API returns JWT
3. Token stored in httpOnly cookie (secure)
4. Server Components read cookie for auth state
5. Client components use auth context

### 6. Data Fetching Strategy

**Decision**: 
- **Server Components**: Direct fetch for initial data
- **Client Components**: React Query for interactive data

**Example Pattern**:
```typescript
// Server Component (initial load)
export default async function HomePage() {
  const intentions = await fetchIntentions();
  return <IntentionGrid initialData={intentions} />;
}

// Client Component (pagination, filters)
'use client';
function IntentionGrid({ initialData }) {
  const { data } = useQuery({
    queryKey: ['intentions', filters],
    queryFn: () => fetchIntentions(filters),
    initialData,
  });
  return <Grid items={data} />;
}
```

## Component Mapping (Mobile → Web)

| Mobile Component | Web Component | Adaptation |
|------------------|---------------|------------|
| IntentionCard | IntentionCard | Same, add hover states |
| BottomTabBar | Sidebar + MobileNav | Responsive switch |
| FAB | Header button + sidebar | Position change |
| BottomSheet | Dialog/Modal | Standard web pattern |
| SearchBar | Header search | Expanded on desktop |
| FilterChips | Sidebar filters | Vertical on desktop |

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Next.js 16 is new | Stick to stable patterns |
| SSR complexity | Use Server Components wisely |
| Mobile nav parity | Test on mobile browsers |
| SEO crawling | Ensure public pages are static |

## Open Questions

1. **Landing Page**: Should we have a marketing landing page or go straight to feed? (Recommend: Landing for SEO)
2. **Auth Provider**: Use next-auth or custom? (Recommend: Custom for simplicity, matches mobile)
3. **Static Generation**: Pre-render top intentions? (Recommend: Yes, ISR with 1h revalidation)



