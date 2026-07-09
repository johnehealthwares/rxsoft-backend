# Seeding — rxsoft-backend

## Purpose

Add seed data for development or demo environments.

## When to invoke

When adding new seed data entities.

## Workflow

1. Use `npm run seed` or `npm run db:reset-and-seed`.
   - `seed`: runs `ts-node src/database/seeds/run.ts`
   - `db:reset-and-seed`: drops DB, runs `schema_v2_pharmacy.sql`, then seeds
2. Add seed scripts in `src/database/seeds/` following the existing pattern (upsert-based).
3. The automatic `seeding.service.ts` is currently a stub (delegates to `rxsoft-identity`). Add actual seeding logic or keep the manual approach.

## Refactoring

Add `SEED_ON_START` env flag support if auto-seeding is needed during development.