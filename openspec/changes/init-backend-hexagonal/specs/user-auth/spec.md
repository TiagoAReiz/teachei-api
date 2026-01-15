# Capability: User Authentication

## ADDED Requirements

### Requirement: User Registration
The system SHALL allow new users to register with email and password.

#### Scenario: Successful registration
- **WHEN** a user provides a valid email and password (min 8 characters)
- **THEN** the system MUST create a new user account
- **AND** the password MUST be stored using BCrypt hashing
- **AND** the system MUST return a success response with user ID

#### Scenario: Duplicate email rejection
- **WHEN** a user tries to register with an email that already exists
- **THEN** the system MUST reject the registration
- **AND** return a 409 Conflict response

#### Scenario: Invalid password rejection
- **WHEN** a user provides a password shorter than 8 characters
- **THEN** the system MUST reject the registration
- **AND** return a 400 Bad Request with validation error

### Requirement: User Authentication (Login)
The system SHALL authenticate users via email and password, returning a JWT token.

#### Scenario: Successful login
- **WHEN** a user provides valid credentials
- **THEN** the system MUST return an access token (JWT, 7 days expiry)
- **AND** the token MUST be signed using the application secret key

#### Scenario: Invalid credentials
- **WHEN** a user provides incorrect email or password
- **THEN** the system MUST return 401 Unauthorized
- **AND** NOT reveal whether email or password was incorrect

### Requirement: JWT Token Validation
The system SHALL validate JWT tokens on all protected endpoints.

#### Scenario: Valid token access
- **WHEN** a request includes a valid, non-expired JWT in the Authorization header
- **THEN** the system MUST allow access to the protected resource
- **AND** the user context MUST be available to the controller

#### Scenario: Expired token rejection
- **WHEN** a request includes an expired JWT
- **THEN** the system MUST return 401 Unauthorized
- **AND** include an error indicating token expiration

#### Scenario: Invalid token rejection
- **WHEN** a request includes a malformed or tampered JWT
- **THEN** the system MUST return 401 Unauthorized

### Requirement: Spring Security Integration
The system SHALL use Spring Security with custom UserDetailsService.

#### Scenario: UserDetailsService loading
- **WHEN** authentication is attempted
- **THEN** the system MUST use a custom UserDetailsService
- **AND** load user data from the PostgreSQL database

