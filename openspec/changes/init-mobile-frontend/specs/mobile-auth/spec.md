# Capability: Mobile Authentication

## ADDED Requirements

### Requirement: Login Screen
The mobile app SHALL provide a login screen matching the TELAS design.

#### Scenario: Email login display
- **WHEN** the login screen is displayed
- **THEN** it MUST show:
  - TeAchei logo with header image
  - "Welcome to TeAchei" headline
  - Email input field with mail icon
  - Password input field with lock icon and visibility toggle
  - "Forgot Password?" link
  - "Log In" primary button
  - "Don't have an account? Sign up" link

#### Scenario: Successful login
- **WHEN** a user enters valid credentials and taps "Log In"
- **THEN** the app MUST authenticate with the backend API
- **AND** store the JWT token securely
- **AND** navigate to the role selection modal

#### Scenario: Login validation
- **WHEN** a user submits the login form
- **THEN** email MUST be validated as a valid email format
- **AND** password MUST have at least 8 characters
- **AND** validation errors MUST be displayed inline

### Requirement: Role Selection
The mobile app SHALL prompt users to select their role after login.

#### Scenario: Role modal display
- **WHEN** a new user logs in for the first time
- **THEN** a bottom sheet modal MUST appear asking "How will you use TeAchei?"
- **AND** show two options:
  - "Occasional Buyer" - Looking for a personal vehicle
  - "Shopkeeper / Reseller" - Buy and sell vehicles professionally

#### Scenario: Role selection persistence
- **WHEN** a user selects a role and taps "Continue"
- **THEN** the role MUST be saved to the user's profile
- **AND** the user MUST be navigated to the appropriate home screen

### Requirement: Registration Screen
The mobile app SHALL provide a registration screen.

#### Scenario: Registration form
- **WHEN** a user taps "Sign up"
- **THEN** the app MUST display a registration form with:
  - Name input
  - Email input
  - Password input (with requirements)
  - Confirm password input
  - "Create Account" button

#### Scenario: Successful registration
- **WHEN** a user submits valid registration data
- **THEN** the account MUST be created via API
- **AND** the user MUST be automatically logged in
- **AND** navigated to role selection

### Requirement: Protected Routes
The mobile app SHALL protect authenticated routes.

#### Scenario: Unauthenticated access
- **WHEN** an unauthenticated user tries to access a protected screen
- **THEN** they MUST be redirected to the login screen

#### Scenario: Auto-login on app start
- **WHEN** the app starts and a valid token exists in storage
- **THEN** the user MUST be automatically authenticated
- **AND** navigated to the home screen



