## ADDED Requirements

### Requirement: Authentication Guard for Protected Routes
The system SHALL protect authenticated-only routes by redirecting unauthenticated users to the login page.

#### Scenario: Unauthenticated user accesses protected route
- **WHEN** a user without a valid session attempts to access a protected route
- **THEN** the system redirects the user to /login
- **AND** the protected content is not displayed

#### Scenario: Authenticated user accesses protected route
- **WHEN** a user with a valid session accesses a protected route
- **THEN** the system displays the requested page content
- **AND** no redirect occurs

#### Scenario: Auth check shows loading state
- **WHEN** the system is verifying authentication status
- **THEN** the system displays a loading indicator
- **AND** prevents flash of protected content

### Requirement: Protected Route List
The following routes SHALL be protected and require authentication:
- /my-intentions (Minhas Intenções)
- /profile (Perfil)
- /favorites (Favoritos)
- /messages (Mensagens)
- /settings (Configurações)
- /create/* (Criar intenção - all steps)

#### Scenario: Feed page is public
- **WHEN** an unauthenticated user accesses the feed page (/)
- **THEN** the system displays the feed content
- **AND** no redirect to login occurs

### Requirement: Role Selection Only for Users Without Role
The system SHALL only redirect to role selection when the user does not have a role assigned.

#### Scenario: User with role logs in
- **WHEN** a user with an existing role successfully logs in
- **THEN** the system redirects to the home page
- **AND** the role selection page is not shown

#### Scenario: User without role logs in
- **WHEN** a new user without a role successfully logs in
- **THEN** the system redirects to /role-select
- **AND** user must select a role before accessing other pages

#### Scenario: Google login user with existing role
- **WHEN** a returning user logs in via Google
- **AND** the user already has a role saved in their profile
- **THEN** the system redirects to the home page
- **AND** the role selection page is not shown

### Requirement: Google Login Name Display
Users who register or login via Google SHALL see their Google profile name displayed in the application.

#### Scenario: New Google user sees their name
- **WHEN** a user registers via Google for the first time
- **THEN** the user's name from their Google profile is saved
- **AND** the name is displayed in the header and profile page

#### Scenario: Returning Google user sees their name
- **WHEN** an existing Google user logs in
- **THEN** the user's saved name is displayed
- **AND** the name matches what was saved from their Google profile
