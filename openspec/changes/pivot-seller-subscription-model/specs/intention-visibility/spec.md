# Capability: Intention Visibility

## ADDED Requirements

### Requirement: Contact Information Protection
The system SHALL protect buyer contact information from non-subscribed sellers.

#### Scenario: Non-subscribed user views intention
- **WHEN** a user without active subscription requests intention details
- **THEN** the response MUST include:
  - Full vehicle specifications
  - Creation and expiration dates
  - Status
  - Location: cidade and estado ONLY
  - observacoes (buyer notes)
- **AND** the response MUST NOT include:
  - contato.whatsapp
  - contato.whatsappLink
  - contato.instagram
- **AND** the response MUST include `contatoOculto: true` flag

#### Scenario: Subscribed user views intention
- **WHEN** a user with active subscription requests intention details
- **THEN** the response MUST include full contact information:
  - contato.whatsapp
  - contato.whatsappLink
  - contato.instagram
  - contato.cidade
  - contato.estado
- **AND** the response MUST include `contatoOculto: false` flag

#### Scenario: Owner views own intention
- **WHEN** the intention owner requests their own intention details
- **THEN** the response MUST include full contact information
- **AND** subscription status MUST NOT affect visibility of own data

#### Scenario: Unauthenticated user views intention
- **WHEN** an unauthenticated user requests intention details
- **THEN** the response MUST hide contact information (same as non-subscribed)
- **AND** the response MUST include `contatoOculto: true` flag

### Requirement: Subscription Status in Response
The system SHALL include subscription status in intention responses.

#### Scenario: Response includes subscription hint
- **WHEN** any user requests intention details
- **THEN** the response MUST include:
  - `assinaturaAtiva: boolean` - whether requesting user has active subscription
  - `contatoOculto: boolean` - whether contact info was hidden

#### Scenario: Frontend conditional rendering
- **WHEN** frontend receives intention with `contatoOculto: true`
- **THEN** it MUST show:
  - Location (cidade, estado) 
  - "Assine para ver contato" call-to-action
  - Link to subscription page
- **AND** MUST NOT show placeholders or fake contact info

### Requirement: Intention List Visibility
The system SHALL maintain visibility of all active intentions regardless of subscription.

#### Scenario: List intentions for all users
- **WHEN** any user (authenticated or not) requests the intention list
- **THEN** the system MUST return all ATIVO intentions
- **AND** contact information MUST follow the same visibility rules as detail view
- **AND** pagination and filtering MUST work normally

#### Scenario: Filter by location
- **WHEN** a user filters by cidade/estado
- **THEN** the system MUST return matching intentions
- **AND** location-based filtering MUST work for all users (location is always visible)
