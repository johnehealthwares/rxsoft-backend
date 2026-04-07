import { ApiProperty } from '@nestjs/swagger';

export class StockBalanceProductRefDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;
}

export class StockBalanceLocationRefDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name!: string;
}

export class StockBalanceLotRefDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;
}

export class StockBalanceResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty({ type: StockBalanceProductRefDto })
  product!: StockBalanceProductRefDto;

  @ApiProperty({ type: StockBalanceLocationRefDto })
  location!: StockBalanceLocationRefDto;

  @ApiProperty({ type: StockBalanceLotRefDto, nullable: true })
  lot!: StockBalanceLotRefDto | null;

  // Backward-compatible flattened ids.
  @ApiProperty()
  productId!: string;

  @ApiProperty()
  locationId!: string;

  @ApiProperty({ nullable: true })
  lotId!: string | null;

  @ApiProperty()
  quantityOnHand!: number;

  @ApiProperty()
  quantityReserved!: number;

  @ApiProperty()
  averageCost!: number;

  @ApiProperty({ nullable: true })
  reorderMinQty!: number | null;

  @ApiProperty({ nullable: true })
  reorderMaxQty!: number | null;
}
