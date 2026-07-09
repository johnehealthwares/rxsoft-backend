# Backend CRUD Resource — rxsoft-backend

## Purpose

Scaffold a new CRUD resource in rxsoft-backend following the module architecture pattern.

## When to invoke

When creating a new feature module with CRUD needs.

## When not to invoke

For simple configuration entities better handled as seed data.

## Inputs

- **Module/domain name**
- **Whether to use Clean Architecture (Pattern A) or Simple Service (Pattern B)**
- **Entity fields** with TypeORM decorators

## Workflow

### Pattern A (Clean Architecture) — for core domains (catalog, sales, inventory, purchases, receivables)

1. Create domain entity in `domains/` (plain TS class, no decorators).
2. Create TypeORM entity in `entities/` with `@Entity()` and column mapping.
3. Create mapper in `mappers/` (entity ↔ domain).
4. Create repository interface in `repositories/`.
5. Create TypeORM implementation in `repositories/`.
6. Create DTOs in `dto/`.
7. Create use cases in `services/` (e.g., `create-{entity}.use-case.ts`, `list-{entity}.use-case.ts`).
8. Create controller in `controllers/`.
9. Register DI tokens in module.

### Pattern B (Simple Service) — for simple modules (categories, manufacturers, pricing)

1. Create entity in `entities/`.
2. Create DTOs in `dto/`.
3. Create service in `services/`.
4. Create controller in `controllers/`.
5. Register in module with `TypeOrmModule.forFeature()`.

## Refactoring

If adding a new resource to a module that uses Pattern A, follow Pattern A. If adding to a Pattern B module, follow Pattern B. Do not mix patterns within a single module.