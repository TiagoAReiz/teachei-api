# Capability: Web Profile

## ADDED Requirements

### Requirement: Public Profile Page
The web app SHALL display public user profiles.

#### Scenario: Profile layout
- **WHEN** a user profile page is displayed
- **THEN** it MUST show:
  - Large avatar with verified badge
  - User name as H1
  - Location
  - Member since date
  - Bio paragraph
  - Social links (Instagram, Facebook)
  - "Contact User" button

#### Scenario: User's intentions
- **WHEN** the user has active intentions
- **THEN** an "Also looking for..." section MUST appear
- **AND** display intention cards in a grid

### Requirement: Own Profile Page
The web app SHALL allow users to view and edit their profile.

#### Scenario: Own profile view
- **WHEN** the user views their own profile tab
- **THEN** it MUST display their profile
- **AND** show "Edit Profile" button
- **AND** show "Settings" button

#### Scenario: Edit profile
- **WHEN** the user clicks "Edit Profile"
- **THEN** a form MUST appear with:
  - Avatar upload
  - Name field
  - Bio textarea
  - WhatsApp number
  - Instagram handle
  - Location fields (city, state)
  - Save button

### Requirement: Settings Page
The web app SHALL provide a settings page.

#### Scenario: Settings sections
- **WHEN** the settings page is displayed
- **THEN** it MUST include sections for:
  - Account (email, password change)
  - Profile (links to edit profile)
  - Preferences (theme, notifications)
  - Privacy (visibility settings)
  - Logout button

### Requirement: Favorites Page
The web app SHALL display saved intentions.

#### Scenario: Favorites list
- **WHEN** the Saved/Favorites page is displayed
- **THEN** saved intentions MUST be displayed in a grid
- **AND** each card MUST have an unsave option

#### Scenario: Empty state
- **WHEN** there are no saved intentions
- **THEN** an empty state MUST display with:
  - Illustration
  - "No saved intentions" message
  - "Explore intentions" CTA



