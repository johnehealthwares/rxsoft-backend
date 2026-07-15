# RxSoft Backend

Main backend service for the RxSoft healthcare platform. Handles catalog, inventory, sales, purchases, customers, pricing, accounting, APM campaigns, eHealthwares integration, LIS proxy, reporting, and image uploads. Triple-database architecture: PostgreSQL + MongoDB + in-memory SQL.js.

Part of the [RxSoft monorepo](https://github.com/anomalyco/rxsoft).

## Stack

| Aspect | Technology |
|---|---|
| Runtime | Node.js |
| Framework | NestJS 11 |
| Databases | PostgreSQL (TypeORM) + MongoDB (Mongoose 9) + SQL.js in-memory |
| ORM/ODM | TypeORM 0.3 + Mongoose 9 |
| Validation | class-validator + class-transformer |
| API Docs | Swagger at `/api/docs` |
| Auth | JWT (shared secret with rxsoft-identity) |
| File Upload | Cloudinary (multer) |
| PM | yarn |

## Quick Start

```bash
# Start PostgreSQL
docker compose up -d

# Install & dev
yarn install
yarn start:dev
```

The API defaults to **port 8080** (configurable via `PORT`).

## Architecture

The backend uses a dual-architecture approach:

- **Standard modules** (most domains): Controller → Service → TypeORM Repository pattern
- **Clean Architecture modules** (some domains): Controller → Use Case → Repository Interface → TypeORM Implementation

See [BACKEND_SEARCH_ARCHITECTURE.md](https://github.com/anomalyco/rxsoft/blob/main/BACKEND_SEARCH_ARCHITECTURE.md) for the standard list/search patterns.

### Module Map (25 modules)

| Module | Description |
|---|---|
| `accounting` | Financial transactions, ledgers |
| `apm` | APM campaign management (MongoDB-backed) |
| `audit` | Audit logging |
| `catalog` | Product/service catalog |
| `categories` | Product categories |
| `customers` | Customer management |
| `ehealthwares` | eHealthwares integration with Redis/in-memory caching |
| `health` | Health check endpoint |
| `identity` | User proxy to rxsoft-identity |
| `inventory` | Stock management |
| `lis` | LIS proxy (to rxsoft-lis-backend) |
| `manufacturers` | Manufacturer registry |
| `organisation-config` | Organization-level configuration |
| `organizations` | Multi-tenant organization management |
| `pricing` | Pricing rules and tiers |
| `purchases` | Purchase orders |
| `receivables` | Accounts receivable |
| `reports` | Reporting engine |
| `sales` | Sales orders and transactions |
| `seeds` | Database seeding |
| `upload` | File/image upload via Cloudinary |
| `user-pos-config` | POS configuration per user |
| `users-proxy` | User management proxy |
| `warehouses` | Warehouse management |
| `website` | Website content management |

## Commands

| Command | Description |
|---|---|
| `yarn start:dev` | Dev server with watch |
| `yarn start:prod` | Production start |
| `yarn build` | Compile TypeScript |
| `yarn test` | Unit tests |
| `yarn test:e2e` | End-to-end tests |
| `yarn seed` | Run database seeds |
| `yarn db:reset-and-seed` | Drop, recreate, and seed |

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | 8080 | Server port |
| `DB_TYPE` | `postgres` | Primary database type |
| `DB_HOST` | `localhost` | PostgreSQL host |
| `DB_PORT` | 5432 | PostgreSQL port |
| `DB_USER` | `postgres` | Database user |
| `DB_PASSWORD` | `postgres` | Database password |
| `DB_NAME` | `rxsoft` | PostgreSQL database name |
| `DB_SYNCHRONIZE` | `true` | Auto-create tables (dev) |
| `DB_DROP_SCHEMA` | `true` | Drop schema on start |
| `USE_IN_MEMORY_REPOS` | `false` | Use SQL.js in-memory instead of PG |
| `SEED_ON_START` | `true` | Seed on startup |
| `JWT_ACCESS_SECRET` | `admin-access-secret` | JWT secret |
| `JWT_REFRESH_SECRET` | `admin-refresh-secret` | JWT refresh secret |
| `IDENTITY_SERVICE_URL` | `http://localhost:8092` | rxsoft-identity endpoint |
| `INTERNAL_API_KEY` | `rxsoft-internal-key` | Service-to-service auth |
| `CLOUDINARY_CLOUD_NAME` | — | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | — | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | — | Cloudinary API secret |
| `USE_MONGODB` | `true` | Enable MongoDB for APM campaigns |
| `MONGODB_URI` | — | MongoDB connection string |
| `EHEALTHWARES_CACHE_ENABLED` | `true` | Cache for eHealthwares responses |
| `EHEALTHWARES_CACHE_TTL_SECONDS` | `300` | Cache TTL |

## Databases

| Database | Tech | Purpose |
|---|---|---|
| PostgreSQL | TypeORM | Primary data (catalog, sales, customers, etc.) |
| MongoDB | Mongoose 9 | APM campaigns (change streams, flexible schema) |
| SQL.js (in-memory) | sql.js | Optional lightweight storage for testing |

## Patterns

- **Multi-tenancy** via organization scoping (JWT `organizationId`)
- **JWT auth** shared secret with rxsoft-identity
- **Seeding**: Idempotent upserts via `DatabaseSeedService`, gated by `SEED_ON_START`
- **Caching**: `AppCacheService` backed by Redis (optional) or in-memory Map
- **Sort allow-list**: `resolveSortColumn()` utility prevents SQL injection in sort params
- **DTOs**: `class-validator` with `@Type()` decorators
- **Two competing DTOs exist**: `ListQueryDto` and `PaginationQueryDto` — consolidation is a known refactoring goal

## See Also

- [`../BACKEND_SEARCH_ARCHITECTURE.md`](https://github.com/anomalyco/rxsoft/blob/main/BACKEND_SEARCH_ARCHITECTURE.md) — List/search endpoint standards
- [`../AGENTS.md`](https://github.com/anomalyco/rxsoft/blob/main/AGENTS.md) — Monorepo overview
