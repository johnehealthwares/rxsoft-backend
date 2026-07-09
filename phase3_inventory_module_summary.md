# Phase 3 Module 3: Inventory (Stock Balances + Adjustments)

## Folder Structure
- `src/modules/inventory/dto`
- `src/modules/inventory/domains`
- `src/modules/inventory/repositories`
- `src/modules/inventory/services`
- `src/modules/inventory/controllers`
- `src/modules/inventory/inventory.module.ts`

## Domain Models
- `StockBalance`
- `StockAdjustment`

## DTOs
- `ListStockBalancesDto`
- `CreateStockAdjustmentDto`
- `StockBalanceResponseDto`

## Repository Layer
- `InventoryRepository` interface
- `InMemoryInventoryRepository` implementation

## Service Layer
- `ListStockBalancesUseCase`
- `CreateStockAdjustmentUseCase`

## Controller Layer
- `GET /inventory/stock-balances`
- `POST /inventory/adjustments`

Both routes use JWT + role guard.

## Swagger
- Controller routes documented via decorators.

## Example Request/Response
### Create adjustment request
```json
{
  "stockBalanceId": "b1",
  "deltaQuantity": -2,
  "reason": "damaged tablets"
}
```

### Response
```json
{
  "id": "b1",
  "productId": "p1",
  "locationId": "l1",
  "lotId": null,
  "quantityOnHand": 98,
  "quantityReserved": 5,
  "averageCost": 1.25
}
```

## Architectural Notes
- No direct data access in controller.
- Business checks are enforced in use-case:
  - delta cannot be zero
  - stock balance must exist
  - no negative resulting stock

## Assumptions
- Manual adjustment is the first inventory write path for module bootstrap.
- Full movement ledger integration comes in next inventory increment.

## Remaining Risks
- In-memory repository is non-persistent.
- No transaction boundary yet for multi-row stock operations.

## Test Plan
1. Unit: `ListStockBalancesUseCase`
- verifies pagination/filter forwarding.

2. Unit: `CreateStockAdjustmentUseCase`
- applies valid adjustment.
- rejects zero adjustment.
- rejects missing stock balance.
- rejects negative resulting stock.

3. Integration (next)
- auth + role checks for inventory routes.
- DB-backed adjustment persistence and reload.
