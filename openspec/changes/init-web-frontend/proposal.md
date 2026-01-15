# Change: Initialize TeAchei Web Frontend

## Why
The TeAchei web platform needs to be implemented using Next.js, following the same design patterns as the mobile app (TELAS mockups) but adapted for responsive web layouts. The web version offers SEO benefits for public intention pages and provides a full-featured experience for desktop users.

## What Changes

### Design System (Shared with Mobile)
- Same TeAchei theme:
  - Primary color: `#137fec`
  - Font family: Plus Jakarta Sans
  - Same component styles (cards, buttons, inputs)
- Responsive breakpoints: mobile-first, tablet, desktop
- Dark mode support

### Pages Implementation (Adapted from TELAS)
1. **Landing Page** - Hero, features, CTA to login/register
2. **Login/Register** - Centered card layout for auth
3. **Home Feed** - Grid layout for intentions with sidebar filters
4. **Create Intention** - Multi-step wizard in modal or dedicated page
5. **Intention Details** - SEO-optimized public page with rich meta
6. **User Profile** - Public profile page with SEO
7. **Dashboard** - User's intentions management (My Intentions)
8. **Settings** - Account and profile settings

### Responsive Layout Strategy
- **Mobile (<768px)**: Single column, bottom nav, similar to mobile app
- **Tablet (768px-1024px)**: 2-column grid, collapsible sidebar
- **Desktop (>1024px)**: 3-column layout, fixed sidebar, full navigation

### Web-Specific Features
- **SEO Optimization**: Dynamic meta tags, Open Graph, structured data
- **Public URLs**: `/procuro/honda-civic-2020-sp` style URLs for intentions
- **Server Components**: Leverage Next.js 16 RSC for performance
- **Static Generation**: Pre-render popular intention pages

### Dependencies to Add
- `@tanstack/react-query` - Data fetching
- `next-auth` or custom JWT handling
- `react-hook-form` + `zod` - Form validation
- `lucide-react` - Icons (consistent with Material Symbols)
- `nuqs` - URL state management for filters

## Impact
- **Affected specs**: New web capabilities
- **Affected code**: Complete web app implementation
- **Dependencies on**: Backend API (init-backend-hexagonal)
- **Shares with**: Mobile design system (init-mobile-frontend)



