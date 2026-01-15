## Context
The TeAchei backend uses Azure Cosmos DB for storing purchase intentions (anúncios) due to their flexible, document-based nature. Currently, developers must either use the Windows-only Cosmos DB Emulator or connect to a live Azure instance, complicating local development on Linux/macOS.

Microsoft provides a Linux-based Cosmos DB emulator Docker image (`mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator`) that supports the SQL (Core) API used by the application.

## Goals / Non-Goals
- **Goals:**
  - Enable fully containerized local development
  - Match production Cosmos DB behavior as closely as possible
  - Persist data across container restarts
  
- **Non-Goals:**
  - Production deployment (this is for local dev only)
  - Support for all Cosmos DB APIs (only SQL API needed)
  - Windows-specific emulator integration

## Decisions

### Decision: Use Microsoft's Official Linux Emulator Image
- **Image**: `mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest`
- **Rationale**: Official Microsoft image, actively maintained, supports SQL API which is what the app uses

### Decision: Use the Well-Known Emulator Key
- **Key**: `C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==`
- **Rationale**: This is the publicly documented emulator key. It's already configured in `application.yml` as the default.

### Decision: Port Mapping
- **Port 8081**: Cosmos DB HTTPS endpoint (API access)
- **Ports 10250-10255**: Direct connectivity for SDK operations
- **Rationale**: Standard emulator ports as documented by Microsoft

### Alternatives Considered

1. **Windows Cosmos DB Emulator via WSL2**
   - Rejected: Requires Windows, complex setup, not portable across dev machines

2. **Use live Azure Cosmos DB for development**
   - Rejected: Costs money, requires internet, shared state between developers

3. **Mock Cosmos DB with a different NoSQL database**
   - Rejected: Different behavior, no query compatibility guarantee

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Linux emulator has feature limitations vs Windows | SQL API (used by app) is fully supported |
| Emulator startup is slow (~30-60 seconds) | Use healthcheck and `depends_on` for dependent services |
| Large image size (~2GB) | One-time download, cached by Docker |
| ARM64 (Apple Silicon) support is limited | Developers on ARM can use Azure Cosmos DB free tier or Rosetta |

## Open Questions
- None at this time. The implementation is straightforward configuration.



