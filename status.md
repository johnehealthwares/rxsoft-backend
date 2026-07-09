# rxsoft-backend — Status

## What it does

Main NestJS backend for the RxSoft pharmacy/healthcare suite. Provides catalog management, inventory, sales, receivables, purchasing, pricing, accounting, customer management, and multi-tenant organization support.

## Modules

| Module | Description |
|---|---|
| **catalog** | Products, generic products, pharmaceutics, drug components, product categories |
| **inventory** | Stock balances, stock movements, stock locations/warehouses |
| **sales** | Sales orders, UOMs, UOM categories, payment methods |
| **receivables** | Accounts receivable, receivable transactions |
| **purchases** | Purchase orders and lines |
| **pricing** | Price lists, price list items |
| **identity** | Users, roles, permissions, JWT auth |
| **customers** | Customer/party management |
| **organizations** | Multi-tenant organization management |
| **manufacturers** | Manufacturer management |
| **accounting** | Journals, GL accounts, journal entries, journal entry lines |
| **categories** | Product categories |
| **audit** | Audit log |
| **reports** | Sales reports, inventory valuation, CSV export |
| **health** | Health check endpoint |

## Entrypoints

- `src/main.ts` — NestJS bootstrap, Swagger at `/api/docs`

## Status

| Aspect | Status |
|---|---|
| **Pagination** | Universal via `ListQueryDto` / `PaginationQueryDto`. Uses `.skip().take()` with `.getManyAndCount()`. |
| **Response envelope** | `{ data, meta: { page, limit, total } }` — consistent across all modules. |
| **Search/filter** | Mix of approaches: ILIKE per column, dynamic `applyFilters()` engine (1 module), or manual `LIKE`. |
| **Sort** | `sortBy` + `sortOrder` in shared DTO. Some modules use `resolveSortColumn()` allow-list, others pass columns directly (potential injection). |
| **Architecture variance** | Two patterns coexist: (A) Use Case + Repository Interface + TypeORM impl (catalog, inventory, sales, receivables); (B) direct Service + InjectRepository (everything else). |
| **Caching** | Use cases in Pattern A modules use `AppCacheService` with 30-60s TTL. |
| **Multi-tenant** | All queries scope to `organization_id`. |
| **Soft-delete** | Common on most entities — queried with `deleted_at IS NULL`. |
| **Tests** | e2e tests (`yarn test:e2e`), integration specs exist. |
