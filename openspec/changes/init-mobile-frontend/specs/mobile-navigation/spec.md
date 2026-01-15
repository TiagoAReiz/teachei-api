# Capability: Mobile Navigation

## ADDED Requirements

### Requirement: Tab Navigation
The mobile app SHALL provide bottom tab navigation matching the TELAS design.

#### Scenario: Tab bar display
- **WHEN** the user is on the main app screens
- **THEN** a bottom tab bar MUST be visible with:
  - Home (house icon) - Active state highlighted
  - Salvos/Favorites (heart icon)
  - Central FAB (+ button, elevated)
  - Chat (chat bubble icon)
  - Perfil (person icon)

#### Scenario: Tab switching
- **WHEN** a user taps a tab icon
- **THEN** the corresponding screen MUST be displayed
- **AND** the tab icon MUST change to active state (filled, primary color)

### Requirement: Floating Action Button
The mobile app SHALL display a FAB for creating new intentions.

#### Scenario: FAB display
- **WHEN** the user is on the home or my-intentions screen
- **THEN** a central elevated FAB MUST be visible
- **AND** it MUST have a "+" icon on dark background

#### Scenario: FAB action
- **WHEN** the user taps the FAB
- **THEN** the Create Intention flow MUST start
- **AND** navigate to the category selection screen

### Requirement: Stack Navigation
The mobile app SHALL use stack navigation for detail screens.

#### Scenario: Intention details navigation
- **WHEN** a user taps an intention card
- **THEN** the intention details screen MUST be pushed onto the stack
- **AND** a back button MUST be available in the header

#### Scenario: Profile navigation
- **WHEN** a user taps a buyer's profile in intention details
- **THEN** the public profile screen MUST be pushed onto the stack

### Requirement: Create Intention Flow
The mobile app SHALL implement a multi-step creation wizard.

#### Scenario: Step navigation
- **WHEN** the user is in the create intention flow
- **THEN** a progress indicator MUST show current step (1-4)
- **AND** the user MUST be able to go back to previous steps

#### Scenario: Flow completion
- **WHEN** the user completes all steps and submits
- **THEN** they MUST be redirected to payment
- **AND** after payment, returned to my-intentions screen

### Requirement: Header Component
The mobile app SHALL display consistent headers across screens.

#### Scenario: Detail screen header
- **WHEN** viewing a detail screen (intention, profile)
- **THEN** the header MUST display:
  - Back arrow button (left)
  - Screen title (center)
  - Share button (right, where applicable)



