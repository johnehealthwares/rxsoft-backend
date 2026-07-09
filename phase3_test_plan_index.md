# Phase 3 Test Plan Index

## Modules Covered
1. Identity module: `phase3_identity_module_summary.md` (see `## Test Plan`)
2. Catalog module: `phase3_catalog_module_summary.md` (see `## Test Plan`)

## Execution Sequence
1. Run unit tests for identity use-cases.
2. Run unit tests for catalog use-cases.
3. Run integration tests for auth/users endpoints.
4. Run integration tests for products endpoints.
5. Run RBAC regression tests across both modules.

## Minimal E2E Scenarios
1. Login as admin -> create user -> assign role -> list users.
2. Login as pharmacist -> list products -> create product.
3. Login as cashier -> verify product read allowed and product create forbidden.
4. Under invalid token -> verify `401` across `/users` and `/products` routes.
