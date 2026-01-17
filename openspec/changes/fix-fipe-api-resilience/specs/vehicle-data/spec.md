# Capability: Vehicle Data (FIPE Integration) - Delta

## MODIFIED Requirements

### Requirement: API Resilience
The system SHALL handle FIPE API failures gracefully with proper error feedback.

#### Scenario: Circuit breaker activation
- **WHEN** the FIPE API fails 5 consecutive times within the sliding window
- **THEN** the circuit breaker MUST open
- **AND** requests MUST fail fast for 30 seconds
- **AND** after 30 seconds, one request MUST be allowed through (half-open)
- **AND** the system MUST log circuit state transitions

#### Scenario: Fallback on API failure for listings
- **WHEN** the FIPE API is unavailable for getMarcas, getModelos, or getAnos
- **THEN** the system MUST throw a ServicoIndisponivelException
- **AND** the API MUST return HTTP 503 (Service Unavailable)
- **AND** the response MUST include error code "FIPE_SERVICE_UNAVAILABLE"
- **AND** the system MUST log the failure with original exception details

#### Scenario: Fallback on API failure for price lookup
- **WHEN** the FIPE API is unavailable for getPrecoFipe
- **THEN** the system MUST throw a ServicoIndisponivelException
- **AND** the API MUST return HTTP 503 (Service Unavailable)
- **AND** the response MUST include error code "FIPE_SERVICE_UNAVAILABLE"

#### Scenario: Cache serving during outage
- **WHEN** the FIPE API is unavailable but cached data exists
- **THEN** the system MUST serve cached data without calling the API
- **AND** subsequent requests within cache TTL MUST use cached data

#### Scenario: HTTP error handling
- **WHEN** the FIPE API returns an HTTP 4xx or 5xx error
- **THEN** the system MUST convert the error to a FipeApiException
- **AND** the exception MUST be counted as a failure by the circuit breaker
- **AND** the system MUST log the HTTP status code and response details

## ADDED Requirements

### Requirement: Case-Insensitive Vehicle Type Conversion
The system SHALL accept vehicle type path parameters in any case (lowercase, uppercase, mixed).

#### Scenario: Lowercase vehicle type in URL
- **WHEN** a request is made to `/api/v1/veiculos/carro/marcas`
- **THEN** the system MUST convert "carro" to TipoVeiculo.CARRO
- **AND** the request MUST be processed successfully

#### Scenario: Uppercase vehicle type in URL
- **WHEN** a request is made to `/api/v1/veiculos/MOTO/marcas`
- **THEN** the system MUST convert "MOTO" to TipoVeiculo.MOTO
- **AND** the request MUST be processed successfully

#### Scenario: Mixed case vehicle type in URL
- **WHEN** a request is made to `/api/v1/veiculos/Caminhao/marcas`
- **THEN** the system MUST convert "Caminhao" to TipoVeiculo.CAMINHAO
- **AND** the request MUST be processed successfully

#### Scenario: Invalid vehicle type in URL
- **WHEN** a request is made with an invalid vehicle type like `/api/v1/veiculos/barco/marcas`
- **THEN** the system MUST return HTTP 400 (Bad Request)
- **AND** the response MUST include error code "INVALID_VEHICLE_TYPE"

### Requirement: AOP Infrastructure
The system SHALL have AOP (Aspect-Oriented Programming) infrastructure enabled to support annotation-based resilience patterns.

#### Scenario: CircuitBreaker annotation processing
- **WHEN** a method is annotated with @CircuitBreaker
- **THEN** Spring AOP MUST create a proxy to intercept the method call
- **AND** the Resilience4j circuit breaker logic MUST be applied
- **AND** fallback methods MUST be invoked when the circuit is open or an exception occurs

### Requirement: FIPE API Error Handling
The system SHALL provide specific error handling for FIPE API failures.

#### Scenario: FipeApiException creation
- **WHEN** the FIPE API returns an HTTP error response
- **THEN** the system MUST throw a FipeApiException
- **AND** the exception MUST contain the HTTP status code
- **AND** the exception MUST contain a descriptive error message

#### Scenario: FipeApiException handling in GlobalExceptionHandler
- **WHEN** a FipeApiException is thrown
- **THEN** the GlobalExceptionHandler MUST return HTTP 503
- **AND** the response MUST include error code "FIPE_API_ERROR"
- **AND** the system MUST log the error at WARN level
