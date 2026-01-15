## ADDED Requirements

### Requirement: Cosmos DB Emulator Container
The local development environment SHALL provide an Azure Cosmos DB emulator container via Docker Compose that supports the SQL API used by the application.

#### Scenario: Emulator is available for local development
- **GIVEN** the developer runs `docker-compose up`
- **WHEN** the `cosmosdb` service starts successfully
- **THEN** the Cosmos DB emulator endpoint SHALL be accessible at `https://localhost:8081`
- **AND** the emulator SHALL accept the well-known development key

#### Scenario: Data persistence across restarts
- **GIVEN** data has been written to the Cosmos DB emulator
- **WHEN** the container is stopped and restarted
- **THEN** the previously written data SHALL be preserved

#### Scenario: Application connects to local emulator
- **GIVEN** the application is configured with `COSMOS_ENDPOINT=https://localhost:8081`
- **AND** the application uses the well-known emulator key
- **WHEN** the application starts
- **THEN** it SHALL successfully connect to the local Cosmos DB emulator
- **AND** create the `teachei` database and `anuncios` container if they do not exist



