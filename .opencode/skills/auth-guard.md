# Auth Guard — rxsoft-backend

## Purpose

Add or modify auth guards following the existing multi-layered auth pattern.

## When to invoke

When adding new modules or modifying auth behavior.

## Inputs

- **Whether the endpoint is public, role-restricted, or permission-restricted**
- **Required roles** (optional)
- **Required permissions** (optional)

## Workflow

1. Most endpoints already use the global `JwtAuthGuard`. Add `@Public()` for unauthenticated endpoints.
2. Add `@Roles('admin', 'pharmacist')` for role checks.
3. Add `@Permissions('catalog.item.create')` for fine-grained permission checks.
4. Use `@CurrentUser()` decorator to extract the `RequestUser` (sub, organizationId, locationId, roles, permissions).

## Refactoring

When adding auth to a new module, match the existing multi-layered approach:
- `JwtAuthGuard` globally
- `RolesGuard` for role checks
- `PermissionsGuard` for permission checks (with wildcard matching)
- `AuditLogInterceptor` for POST/PUT/PATCH/DELETE logging