# Backend List Endpoint — rxsoft-backend

## Purpose

Create or fix list/search endpoints in rxsoft-backend following `BACKEND_SEARCH_ARCHITECTURE.md`.

## When to invoke

When adding or modifying a list endpoint in any module.

## When not to invoke

For single-entity endpoints.

## Inputs

- **Module name** (catalog, sales, inventory, purchases, receivables, etc.)
- **Entity name**
- **Searchable columns**
- **Filterable columns**

## Workflow

1. Use or extend `src/shared/dto/list-query.dto.ts` (`ListQueryDto` with `page`, `limit`, `search`, `sortBy`, `sortOrder`, `filter`, `organizationId`).

2. **Clean Architecture modules** (catalog, sales, inventory, purchases, receivables): update the repository interface's `list()` signature to accept the DTO, apply filters in the TypeORM implementation.

3. **Simple Service modules**: apply ILIKE search + pagination + filter engine in the service layer using `src/database/list.ts`.

4. Always add a **sort column allow-list** to prevent SQL injection:
   ```typescript
   const ALLOWED_SORT_COLUMNS = ['name', 'code', 'createdAt', 'updatedAt'];
   if (!ALLOWED_SORT_COLUMNS.includes(query.sortBy)) query.sortBy = 'createdAt';
   ```

5. Return `{ data, meta: { page, limit, total } }` envelope.

## Refactoring consistency

Known deviations:
- **Two competing DTOs**: `ListQueryDto` and `PaginationQueryDto` — consolidate to one. If you see `PaginationQueryDto`, replace it with `ListQueryDto`.
- **Sort column injection risk**: some modules pass `sortBy` directly to `orderBy()` without an allow-list — always add one.
- **Module inconsistency**: some use clean architecture (Use Case + Repository Interface), others go Service → Entity directly. When refactoring a module, prefer aligning with the existing pattern for that module unless the whole module is being rewritten.