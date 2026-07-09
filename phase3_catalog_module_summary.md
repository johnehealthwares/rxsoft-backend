# Phase 3 Module 2: Catalog (Products, Generics, Pharmacology)

## Folder Structure
- `src/domain/catalog/entities`: `product.entity.ts`, `generic-product.entity.ts`, `pharmacology-info.entity.ts`
- `src/domain/catalog/repositories`: `product.repository.ts`
- `src/application/catalog/dto`: create/list/response DTOs
- `src/application/catalog/use-cases`: list, get, create product
- `src/infrastructure/catalog/repositories`: in-memory product repository
- `src/presentation/catalog/controllers`: `products.controller.ts`
- `src/presentation/catalog`: `catalog.module.ts`

## Entity Layer
- `Product`: code/name/category, generic linkage, barcode, active flag
- `GenericProduct`: generic identity, usage/dosage, pharmacology linkage
- `PharmacologyInfo`: pharmacology class and clinical details

## DTOs
- `CreateProductDto`
- `ListProductsDto` (pagination + filtering + sorting standard)
- `ProductResponseDto`

## Repository Layer
- `ProductRepository` interface with:
  - paginated list with filters/sorting
  - find by id/code
  - create
- `InMemoryProductRepository` adapter for module bootstrap

## Service Layer
- `ListProductsUseCase`
- `GetProductUseCase`
- `CreateProductUseCase`

## Controller Layer
- `GET /products`
- `GET /products/:productId`
- `POST /products`

All endpoints are guard-protected (`JwtAuthGuard`, `RolesGuard`) and role-scoped.

## Swagger
- Controller and DTO decorators are in place.
- Endpoints appear in global `/docs` with request/response contracts.

## Example Request/Response
### Create product request
```json
{
  "code": "PCM001",
  "name": "Paracetamol 500mg Tablet",
  "categoryCode": "ANALGESICS",
  "genericCode": "GEN001",
  "barcode": "1234567890123",
  "isActive": true
}
```

### Product response
```json
{
  "id": "<uuid>",
  "code": "PCM001",
  "name": "Paracetamol 500mg Tablet",
  "categoryCode": "ANALGESICS",
  "genericProduct": {
    "code": "GEN001",
    "name": "Paracetamol 500mg Tablet",
    "pharmacologyInfo": {
      "code": "PHARM-GEN001",
      "clinicalName": "Paracetamol 500mg Tablet",
      "drugClass": "unclassified"
    }
  },
  "barcode": "1234567890123",
  "isActive": true
}
```

## Architectural Notes
- No direct persistence logic in controllers.
- Filtering/sorting/pagination are standardized in DTO and repository query object.
- Generic/pharmacology relationship is explicit in domain model, matching Phase 2 schema intent.

## Assumptions
- Create flow currently accepts `genericCode` and creates placeholder linked generic/pharmacology objects in memory.
- PostgreSQL repository implementation will replace in-memory adapter in next iteration.

## Remaining Risks
- Create flow must be tightened to reference existing `generic_products` and `pharmacology_infos` once DB adapter is in place.
- No caching adapter yet for read-heavy product list endpoint.

## Test Plan
1. Unit: `ListProductsUseCase`
- Applies pagination correctly (`offset/limit`).
- Applies `search` filter against code/name.
- Applies `categoryCode` exact filter.
- Applies sort combinations (`name|code|createdAt`, `asc|desc`).

2. Unit: `GetProductUseCase`
- Existing id returns product.
- Missing id throws `NotFoundException`.

3. Unit: `CreateProductUseCase`
- Unique code creates product.
- Duplicate code throws `BadRequestException`.
- Defaults `isActive=true` when omitted.

4. Integration: Products API
- `GET /products` returns paginated shape `{ data, meta }`.
- `GET /products/:id` returns `404` for missing record.
- `POST /products` requires valid token and permitted role (`admin|super_admin|pharmacist`).

5. Security/RBAC checks
- Unauthorized request returns `401`.
- Authenticated user without role returns `403`.
