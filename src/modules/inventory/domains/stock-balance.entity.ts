export class ProductReference {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
  ) {}
}

export class StockLocationReference {
  constructor(
    public readonly id: string,
    public readonly name: string,
  ) {}
}

export class StockLotReference {
  constructor(
    public readonly id: string,
    public readonly code: string,
  ) {}
}

// Aggregate root for on-hand inventory in a specific org/location/product(/lot) scope.
export class StockBalance {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly product: ProductReference,
    public readonly location: StockLocationReference,
    public readonly lot: StockLotReference | null,
    public quantityOnHand: number,
    public readonly quantityReserved: number,
    public readonly averageCost: number,
    public readonly reorderMinQty: number | null,
    public readonly reorderMaxQty: number | null,
  ) {}
}
