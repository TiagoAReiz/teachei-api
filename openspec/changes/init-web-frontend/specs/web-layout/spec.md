# Capability: Web Layout & Navigation

## ADDED Requirements

### Requirement: Responsive Layout System
The web app SHALL provide responsive layouts for all screen sizes.

#### Scenario: Mobile layout (< 768px)
- **WHEN** the viewport is less than 768px
- **THEN** content MUST display in a single column
- **AND** navigation MUST use a bottom tab bar
- **AND** sidebar MUST be hidden

#### Scenario: Tablet layout (768px - 1024px)
- **WHEN** the viewport is between 768px and 1024px
- **THEN** content MUST display in a 2-column grid
- **AND** sidebar MUST be collapsible
- **AND** bottom nav MUST be hidden

#### Scenario: Desktop layout (> 1024px)
- **WHEN** the viewport is greater than 1024px
- **THEN** content MUST display in a 3-column layout
- **AND** sidebar MUST be fixed and visible
- **AND** filters MUST appear in a right column

### Requirement: Header Component
The web app SHALL display a consistent header across all pages.

#### Scenario: Header content
- **WHEN** the header is displayed
- **THEN** it MUST show:
  - TeAchei logo (left, links to home)
  - Search bar (center, expandable on desktop)
  - User menu (right, avatar dropdown)
  - Notification bell with badge

#### Scenario: Mobile header
- **WHEN** viewport is mobile
- **THEN** search MUST collapse to an icon
- **AND** expand on tap

### Requirement: Sidebar Navigation
The web app SHALL provide sidebar navigation for tablet and desktop.

#### Scenario: Sidebar links
- **WHEN** the sidebar is displayed
- **THEN** it MUST show navigation links:
  - Home (house icon)
  - Saved (heart icon)
  - Messages (chat icon)
  - My Intentions (car icon)
  - Profile (person icon)

#### Scenario: Active state
- **WHEN** a navigation item is the current route
- **THEN** it MUST display with primary color
- **AND** have a filled icon

### Requirement: Mobile Bottom Navigation
The web app SHALL provide bottom navigation for mobile viewports.

#### Scenario: Bottom nav display
- **WHEN** viewport is mobile and user is authenticated
- **THEN** a bottom navigation bar MUST appear
- **AND** match the mobile app design (5 items including FAB)

### Requirement: Theme Support
The web app SHALL support light and dark themes.

#### Scenario: System preference
- **WHEN** the user has a system dark mode preference
- **THEN** the app MUST respect that preference by default

#### Scenario: Theme toggle
- **WHEN** the user toggles theme in settings
- **THEN** the app MUST switch theme
- **AND** persist the preference



