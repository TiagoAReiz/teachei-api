## 1. Docker Compose Configuration
- [x] 1.1 Add `cosmosdb` service using `mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest`
- [x] 1.2 Configure ports (8081 for API, 10250-10255 for internal communication)
- [x] 1.3 Add environment variables for partition count and data persistence
- [x] 1.4 Add `cosmosdb_data` volume for persistence
- [x] 1.5 Ensure service is on the `teachei-network` (uses default network)

## 2. Environment Configuration
- [x] 2.1 Update `env.example` with local Cosmos DB emulator settings
- [x] 2.2 Add comments explaining the emulator's well-known key

## 3. Validation
- [x] 3.1 Verify docker-compose syntax is valid
- [x] 3.2 Document any platform-specific considerations (Linux emulator limitations)

### Platform Notes
- The Linux Cosmos DB emulator supports the SQL (Core) API used by this application
- ARM64 (Apple Silicon) has limited support; developers may need to use Azure Cosmos DB free tier or Rosetta
- Emulator startup takes 30-60 seconds; healthcheck with `start_period: 60s` accounts for this
