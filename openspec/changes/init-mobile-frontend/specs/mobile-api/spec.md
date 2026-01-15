# Capability: Mobile API Integration

## ADDED Requirements

### Requirement: Environment-Based API Configuration
The mobile app SHALL use environment-based configuration for API endpoints.

#### Scenario: Development environment
- **WHEN** the app runs in development mode
- **THEN** it MUST use `http://localhost:8080` as the API base URL
- **AND** the URL MUST be configurable via `EXPO_PUBLIC_API_URL` environment variable

#### Scenario: Production environment
- **WHEN** the app runs in production mode
- **THEN** it MUST use the production API URL from environment
- **AND** all API calls MUST use HTTPS

### Requirement: JWT Token Management
The mobile app SHALL securely store and manage JWT tokens.

#### Scenario: Token storage
- **WHEN** a user successfully logs in
- **THEN** the JWT token MUST be stored in expo-secure-store
- **AND** the token MUST be automatically attached to all API requests

#### Scenario: Token expiration
- **WHEN** an API request returns 401 Unauthorized
- **THEN** the app MUST clear the stored token
- **AND** redirect the user to the login screen

### Requirement: API Client Configuration
The mobile app SHALL use a configured HTTP client for all API calls.

#### Scenario: Request interceptor
- **WHEN** an API request is made
- **THEN** the client MUST attach the Authorization header with Bearer token
- **AND** set appropriate Content-Type headers

#### Scenario: Response error handling
- **WHEN** an API request fails
- **THEN** the app MUST display an appropriate error message
- **AND** provide retry functionality where applicable

### Requirement: Data Caching
The mobile app SHALL cache API responses for improved performance.

#### Scenario: Intentions list caching
- **WHEN** intentions are fetched
- **THEN** they MUST be cached using React Query
- **AND** stale data MUST be shown while refetching

#### Scenario: Vehicle data caching
- **WHEN** FIPE data (brands, models) is fetched
- **THEN** it MUST be cached for 24 hours
- **AND** cached data MUST be used for offline access



