# Capability: Mobile Profile

## ADDED Requirements

### Requirement: Public Profile Display
The mobile app SHALL display public user profiles.

#### Scenario: Profile header
- **WHEN** a public profile is displayed
- **THEN** it MUST show:
  - Large circular avatar with shadow
  - User name with verified badge (if verified)
  - Location (city, state)
  - "Member since [year]" label

#### Scenario: Profile bio
- **WHEN** the user has a bio
- **THEN** it MUST be displayed centered below the header
- **AND** styled in regular text

#### Scenario: Social links
- **WHEN** the user has social accounts linked
- **THEN** Instagram and Facebook icons MUST be displayed
- **AND** tapping MUST open the respective app/browser

### Requirement: Other Intentions Section
The mobile app SHALL display a user's other active intentions.

#### Scenario: Other intentions list
- **WHEN** the user has other active intentions
- **THEN** a "Also looking for..." section MUST appear
- **AND** show mini intention cards with:
  - Thumbnail image
  - Vehicle name
  - "Active" badge
  - Category label
  - Budget

#### Scenario: View all
- **WHEN** the user taps "View all"
- **THEN** all of that user's public intentions MUST be displayed

### Requirement: Contact Action
The mobile app SHALL allow contacting users from their profile.

#### Scenario: Contact button
- **WHEN** viewing another user's profile
- **THEN** a sticky "Contact User" button MUST appear at the bottom
- **AND** tapping MUST open chat or WhatsApp

### Requirement: Own Profile Tab
The mobile app SHALL display the current user's profile in the Profile tab.

#### Scenario: Own profile display
- **WHEN** the user navigates to the Profile tab
- **THEN** their own profile MUST be displayed
- **AND** an "Edit Profile" button MUST be available
- **AND** a "Settings" button MUST be available
- **AND** a "Logout" option MUST be available

#### Scenario: Edit profile
- **WHEN** the user taps "Edit Profile"
- **THEN** an edit form MUST appear with:
  - Name field
  - Bio textarea
  - WhatsApp number field
  - Instagram handle field
  - City/State fields
  - Save button

### Requirement: Favorites Screen
The mobile app SHALL display saved intentions.

#### Scenario: Favorites list
- **WHEN** the Salvos/Favorites tab is displayed
- **THEN** saved intentions MUST be listed
- **AND** each card MUST have an unsave option

#### Scenario: Empty favorites
- **WHEN** there are no saved intentions
- **THEN** an empty state MUST be displayed with:
  - Illustration
  - "Nenhuma intenção salva" message
  - "Explore" call-to-action



