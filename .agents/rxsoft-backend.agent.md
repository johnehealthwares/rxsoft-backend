# RxSoft Backend Agent

## Overview

NestJS 11 + TypeORM pharmacy management backend. Port 8080. Yarn.

## DB

PostgreSQL 16 (`schema_v2_pharmacy.sql` schema, 1047 lines). Also supports MongoDB for APM module. Docker: `docker compose up -d`.

## Key commands

- `yarn start:dev` — dev server
- `yarn test:e2e` — e2e tests
- `yarn seed` / `yarn db:reset-and-seed` — database seeding
- `yarn lint` — eslint

## Auth

Multi-layered: JWT guard globally via `APP_GUARD`, `@Roles()` + RolesGuard, `@Permissions()` + PermissionsGuard (wildcard matching), `@CurrentUser()`, `x-api-key` for service-to-service. Audit logging on all mutating requests.

## Two architectural patterns

**Pattern A (Clean Architecture)**: domain entities + repository interfaces + TypeORM impls + use cases + DI tokens. Used by: catalog, sales, inventory, purchases, receivables.

**Pattern B (Simple Service)**: controllers → services → TypeORM entities. Used by: categories, customers, organizations, manufacturers, pricing, accounting, warehouses, user-pos-config, org-config.

## Refactoring deviations (fix when touching)

### List endpoints
- **Two competing DTOs**: `ListQueryDto` and `PaginationQueryDto` — consolidate to `ListQueryDto`
- **`ListQueryDto.sortBy` has no `@IsIn()`** — potential SQL injection
- **Max limit 1,000,000** — essentially unlimited, set to 100
- Entity-specific DTOs don't extend `ListQueryDto` — they standalone copy fields
- Filter engine at `src/database/list.ts` has PostgreSQL-specific `ILIKE` — only works with PG
- Some modules use Pattern A (clean architecture), others Pattern B (simple service)

### Dual database (unique to rxsoft-backend)
- **`USE_IN_MEMORY_REPOS=true`** switches catalog, sales, inventory, purchases, receivables, audit to in-memory
- **Six modules** have Interface + TypeORM impl + InMemory impl + DI token
- Uses `createRepositorySwitchProviders()` factory from `src/common/util.ts`
- **Also supports `DB_TYPE=sqljs`** for in-memory SQLite via SQL.js
- **Also supports `USE_MONGODB=true`** for Mongoose (APM campaigns)
- When adding new module with dual-db: use `createRepositorySwitchProviders()` factory

### Auth (best in repo)
- Global `JwtAuthGuard` via `APP_GUARD`
- `@Roles()` + RolesGuard, `@Permissions()` + PermissionsGuard
- `@CurrentUser()` for user context
- `x-api-key` for service-to-service
- Audit interceptor on all mutating requests
- Proxy to rxsoft-identity for user management via `UsersProxyModule`

### Tests (31 files — best in repo)
- 23 unit tests (pure mocks), 7 integration (SQL.js), 1 e2e
- Integration tests in `src/integration/` with `sqlite-test-helpers.ts`
- Guard: `describeIfDbReady` skips tests when SQL.js unavailable
- Co-located: `src/modules/{module}/services/__tests__/`

### Seeding
- **`npm run seed` is broken** — `run.ts` missing, only `run.tso` exists
- **Duplicate data**: `generic-drugs copy.ts` (48K lines) duplicated from healthcare-concepts — remove it
- **Security**: hardcoded Google private key fallback in `4-seed-item-template.ts` — remove
- Google Sheets: items, prices, facility data
- Website seeds (blog, health concerns) are NOT idempotent — always re-insert
- APM seeds auto-run on `OnModuleInit` — no env var gate

### Schema
- `schema_v2_pharmacy.sql` (1047 lines) for full DB reset
- `synchronize: true` by default — OK for dev, needs migration files for prod
- No migration files exist