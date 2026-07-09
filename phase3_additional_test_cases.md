# Additional Test Cases To Add (Priority Order)

## Identity Module

### P0
1. `RefreshTokenUseCase`
- valid token rotates pair and revokes old token.
- invalid token throws `UnauthorizedException`.
- inactive user with valid token is rejected.

2. `AssignRoleUseCase`
- assigning same role twice does not duplicate role.
- missing user throws `NotFoundException`.
- invalid role code throws `BadRequestException`.

3. `ListUsersUseCase`
- verifies offset/limit forwarding.
- verifies returned `total` and `items` integrity.

### P1
4. `JwtAuthGuard`
- missing bearer token -> `401`.
- malformed bearer token -> `401`.
- valid token populates `request.user`.

5. `RolesGuard`
- no `@Roles` metadata allows access.
- missing required role -> `403`.
- any matching role grants access.

## Catalog Module

### P0
1. `InMemoryProductRepository.list`
- search filter case-insensitivity.
- category filter exact behavior.
- sorting for all dimensions (`name`, `code`, `createdAt`) with both directions.
- pagination boundaries (`offset` beyond total, `limit=1`).

2. `CreateProductUseCase`
- defaults `isActive=true` when omitted.
- `barcode` omitted results in `null`.
- generated nested `genericProduct` and `pharmacologyInfo` objects are non-empty.

### P1
3. `ProductsController` (unit with mocked use-cases)
- list returns expected response envelope `{ data, meta }`.
- get returns mapped response structure.
- create maps input/output consistently.

4. Validation DTO tests (integration/e2e)
- `CreateProductDto` rejects missing `code`, `name`, `categoryCode`, `genericCode`.
- `ListProductsDto` rejects invalid `sortBy`, `sortOrder`, `page<1`, `limit>100`.

## Cross-Module E2E

### P0
1. Login admin -> create user -> assign role -> list users.
2. Login pharmacist -> create product -> list products -> fetch product by id.
3. Login cashier -> product read allowed, product create denied (`403`).

### P1
4. Invalid access token denied across `/users` and `/products` endpoints.
5. Swagger docs endpoint `/docs` responds and includes both tags (`auth`, `users`, `products`).
