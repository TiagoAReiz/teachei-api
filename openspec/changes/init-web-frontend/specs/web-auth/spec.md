# Capability: Web Authentication

## ADDED Requirements

### Requirement: Login Page
The web app SHALL provide a login page with centered card layout.

#### Scenario: Login page display
- **WHEN** the login page is accessed
- **THEN** it MUST display a centered card with:
  - TeAchei logo
  - "Welcome to TeAchei" headline
  - Email input field
  - Password input field with visibility toggle
  - "Forgot Password?" link
  - "Log In" primary button
  - "Don't have an account? Sign up" link

#### Scenario: Successful login
- **WHEN** valid credentials are submitted
- **THEN** the user MUST be authenticated via API
- **AND** JWT MUST be stored in httpOnly cookie
- **AND** user MUST be redirected to home or previous page

#### Scenario: Login validation
- **WHEN** invalid credentials are submitted
- **THEN** an error message MUST be displayed
- **AND** the form MUST remain accessible

### Requirement: Registration Page
The web app SHALL provide a registration page.

#### Scenario: Registration form
- **WHEN** the registration page is accessed
- **THEN** it MUST display:
  - Name input
  - Email input
  - Password input with requirements display
  - Confirm password input
  - "Create Account" button
  - "Already have an account? Log in" link

#### Scenario: Successful registration
- **WHEN** valid registration data is submitted
- **THEN** account MUST be created
- **AND** user MUST be automatically logged in
- **AND** role selection modal MUST appear

### Requirement: Role Selection
The web app SHALL prompt new users to select their role.

#### Scenario: Role modal
- **WHEN** a new user logs in for the first time
- **THEN** a modal MUST appear with role options:
  - Occasional Buyer
  - Shopkeeper / Reseller
- **AND** selection MUST be saved to profile

### Requirement: Protected Routes
The web app SHALL protect authenticated routes.

#### Scenario: Unauthenticated access
- **WHEN** an unauthenticated user accesses a protected route
- **THEN** they MUST be redirected to login
- **AND** the original URL MUST be preserved for post-login redirect

#### Scenario: Server-side auth check
- **WHEN** a protected page is requested
- **THEN** the server MUST validate the JWT cookie
- **AND** render the page only if valid

### Requirement: Session Management
The web app SHALL manage user sessions.

#### Scenario: Logout
- **WHEN** a user clicks logout
- **THEN** the JWT cookie MUST be cleared
- **AND** user MUST be redirected to login

#### Scenario: Session expiry
- **WHEN** the JWT expires
- **THEN** API requests MUST return 401
- **AND** user MUST be redirected to login



