# Change: Add Cosmos DB Emulator to Docker Compose

## Why
The current `docker-compose.yml` lacks a Cosmos DB emulator for local development, forcing developers to either use the Windows-only Cosmos DB Emulator or connect to a live Azure Cosmos DB instance. Adding the Linux-based emulator image enables fully local development.

## What Changes
- Add `cosmosdb` service to `docker-compose.yml` using Microsoft's official Linux emulator image
- Configure the emulator with data persistence and appropriate partition count
- Update `env.example` with local development Cosmos DB credentials
- Add a volume for Cosmos DB data persistence

## Impact
- Affected specs: None (infrastructure/configuration change only)
- Affected code:
  - `TeAchei/docker-compose.yml` - Add new service
  - `TeAchei/env.example` - Add local dev Cosmos DB config



