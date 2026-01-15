# Capability: User Profile

## ADDED Requirements

### Requirement: Profile Creation
The system SHALL create a user profile upon successful registration.

#### Scenario: Automatic profile creation
- **WHEN** a new user completes registration
- **THEN** the system MUST create an associated profile
- **AND** the profile MUST be linked to the user by ID

### Requirement: Profile Information
The system SHALL store and manage user profile information including contact details.

#### Scenario: Profile data structure
- **WHEN** a profile is created or updated
- **THEN** it MUST support the following fields:
  - Nome (display name)
  - Bio (optional description)
  - WhatsApp number (with country code)
  - Instagram handle (optional)
  - Facebook link (optional)
  - Cidade/Estado (city/state for location)

#### Scenario: WhatsApp deep link generation
- **WHEN** a profile is retrieved
- **THEN** the system MUST provide a `whatsappLink` field
- **AND** the link MUST follow the format `https://wa.me/{number}`

### Requirement: Profile Update
The system SHALL allow authenticated users to update their own profile.

#### Scenario: Successful profile update
- **WHEN** an authenticated user submits valid profile data
- **THEN** the system MUST update the profile
- **AND** return the updated profile data

#### Scenario: Unauthorized profile update
- **WHEN** a user tries to update another user's profile
- **THEN** the system MUST return 403 Forbidden

### Requirement: Profile Retrieval
The system SHALL allow retrieval of user profiles.

#### Scenario: View own profile
- **WHEN** an authenticated user requests their profile
- **THEN** the system MUST return full profile data

#### Scenario: View public profile
- **WHEN** any user views a profile via an intention/anúncio
- **THEN** the system MUST return public profile data
- **AND** include the WhatsApp deep link for contact

### Requirement: User Reputation
The system SHALL track user reputation through a rating system.

#### Scenario: Initial reputation
- **WHEN** a new profile is created
- **THEN** the reputation MUST start at 0 stars
- **AND** the rating count MUST be 0

#### Scenario: Reputation display
- **WHEN** a profile is retrieved
- **THEN** it MUST include the average star rating (0-5)
- **AND** the total number of ratings received



