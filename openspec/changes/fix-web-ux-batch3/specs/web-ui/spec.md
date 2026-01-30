## ADDED Requirements

### Requirement: Favorites Page Badge
The favorites page SHALL display intention cards with the same badge styling as the main feed.

#### Scenario: Favorites page visual consistency
- **WHEN** user views the favorites page
- **THEN** the empty state icon SHALL match the intention card badge style (flag icon)
- **AND** the visual styling SHALL be consistent with the intention cards in the feed

#### Scenario: Favorites badge style
- **WHEN** favorites page shows empty state
- **THEN** the icon SHALL use the `Flag` component from lucide-react
- **AND** the icon SHALL be styled with primary color scheme matching intention badges

### Requirement: Application Logo
The application SHALL display a consistent logo across all pages.

#### Scenario: Logo in header
- **WHEN** user views any page
- **THEN** the header SHALL display the TeAchei logo
- **AND** the logo SHALL be clickable and navigate to the home page

#### Scenario: Logo styling
- **WHEN** logo is displayed
- **THEN** it SHALL use the brand colors (primary/accent)
- **AND** it SHALL be readable on both light and dark backgrounds
- **AND** it SHALL include the text "TeAchei" with distinctive styling

#### Scenario: Logo in auth pages
- **WHEN** user views login or register pages
- **THEN** the logo SHALL be prominently displayed
- **AND** it SHALL match the main application logo style
