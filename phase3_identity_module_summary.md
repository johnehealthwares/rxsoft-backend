# Phase 3 Module 1: Identity (Auth + RBAC)

## Folder Structure
- `src/domain/identity/entities`: `user.entity.ts`, `role.entity.ts`, `permission.entity.ts`
- `src/domain/identity/repositories`: repository interfaces
- `src/application/identity/dto`: request/response DTOs
- `src/application/identity/use-cases`: login, refresh-token, create-user, list-users, assign-role
- `src/application/identity/ports`: password hasher, token issuer ports
- `src/infrastructure/identity/repositories`: in-memory repository adapters
- `src/infrastructure/identity/services`: SHA-256 hasher, JWT token issuer
- `src/presentation/identity/controllers`: `auth.controller.ts`, `users.controller.ts`
- `src/presentation/identity/guards`: `jwt-auth.guard.ts`, `roles.guard.ts`
- `src/presentation/identity/decorators`: `roles.decorator.ts`, `current-user.decorator.ts`
- `src/shared`: pagination DTO and global exception filter

## Entity Layer
- `User`: id, username, passwordHash, isActive, roleCodes
- `Role`: id, code, name, permissionCodes
- `Permission`: id, resource, action, code

## DTOs
- Auth: `LoginDto`, `RefreshTokenDto`, `AuthResponseDto`
- User management: `CreateUserDto`, `AssignRoleDto`, `UserResponseDto`
- Shared: `PaginationQueryDto`

## Repository Layer
- Interfaces only in domain:
  - `UserRepository`
  - `RoleRepository`
  - `RefreshTokenRepository`
- Infrastructure adapter implementations:
  - `InMemoryUserRepository`
  - `InMemoryRoleRepository`
  - `InMemoryRefreshTokenRepository`

## Service Layer
- Use-cases:
  - `LoginUseCase`
  - `RefreshTokenUseCase`
  - `CreateUserUseCase`
  - `AssignRoleUseCase`
  - `ListUsersUseCase`
- Ports:
  - `PasswordHasherPort`
  - `TokenIssuerPort`

## Controller Layer
- `POST /auth/login`
- `POST /auth/refresh-token`
- `POST /users` (guarded by role)
- `GET /users` (guarded + paginated)
- `PATCH /users/:userId/roles` (guarded by role)

## Swagger
- Enabled globally at `/docs`.
- DTOs and endpoints annotated with Swagger decorators.

## Example Request/Response
### Login request
```json
{
  "username": "admin",
  "password": "test"
}
```

### Login response
```json
{
  "accessToken": "<jwt>",
  "refreshToken": "<jwt>",
  "accessTokenExpiresIn": 900,
  "refreshTokenExpiresIn": 604800
}
```

## Architectural Notes
- Controllers contain no direct data access.
- Business flow is isolated in application use-cases.
- Repositories are abstracted behind interfaces and DI tokens.
- Infrastructure is swappable (in-memory now, PostgreSQL implementation next).
- Security includes JWT auth, refresh token rotation path, and role guard.

## Assumptions
- In-memory adapters are temporary scaffolding for Phase 3 bootstrap.
- SHA-256 password hasher is placeholder and must be replaced with bcrypt/argon2 before production.

## Remaining Risks
- Dependencies for Swagger/JWT/validators must be installed in the workspace lockfile for successful build.
- Token revocation storage is in-memory and non-persistent.

## Test Plan
1. Unit: `LoginUseCase`
- Valid username/password returns token pair and persists refresh token hash.
- Invalid password throws `UnauthorizedException`.
- Inactive user throws `UnauthorizedException`.

2. Unit: `RefreshTokenUseCase`
- Valid refresh token rotates token pair and revokes previous token hash.
- Invalid/expired refresh token throws `UnauthorizedException`.

3. Unit: `CreateUserUseCase`
- Unique username creates user with hashed password.
- Duplicate username throws `BadRequestException`.
- Unknown role code throws `BadRequestException`.

4. Unit: `AssignRoleUseCase`
- Existing user + existing role appends role once.
- Missing user throws `NotFoundException`.
- Missing role throws `BadRequestException`.

5. Integration: Auth API
- `POST /auth/login` returns `200` with access/refresh tokens.
- `POST /auth/refresh-token` returns `200` for valid refresh token.
- `POST /auth/refresh-token` returns `401` for invalid token.

6. Integration: User API + RBAC
- `POST /users` requires bearer token and admin/super_admin role.
- `GET /users` returns paginated response shape (`data`, `meta`).
- `PATCH /users/:userId/roles` enforces role guard.
