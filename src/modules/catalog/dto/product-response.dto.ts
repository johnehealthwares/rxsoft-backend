import { ApiProperty } from '@nestjs/swagger';

class ProductCategoryResponse {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;
}

class PharmaceuticsResponse {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  clinicalName!: string;

  @ApiProperty()
  drugClass!: string;

  @ApiProperty()
  pharmaceutics!: string;
}

class GenericProductResponse {
  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty({ type: PharmaceuticsResponse })
  pharmaceutics!: PharmaceuticsResponse;

  @ApiProperty()
  isPrescriptionRequired!: boolean;

  @ApiProperty()
  isControlledSubstance!: boolean;
}

export class ProductResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  code!: string;

  @ApiProperty()
  name!: string;
  @ApiProperty()
  categoryId!: string;
  @ApiProperty()
  genericProductId!: string;

  @ApiProperty()
  category!: ProductCategoryResponse;

  @ApiProperty({ type: GenericProductResponse })
  genericProduct!: GenericProductResponse;

  @ApiProperty({ nullable: true })
  barcode!: string | null;

  @ApiProperty()
  baseUomId!: string;

  @ApiProperty({ nullable: true })
  purchaseUomId!: string | null;

  @ApiProperty({ nullable: true })
  saleUomId!: string | null;

  @ApiProperty()
  trackLot!: boolean;

  @ApiProperty()
  trackExpiry!: boolean;

  @ApiProperty({ nullable: true })
  shelfLifeDays!: number | null;

  @ApiProperty()
  isActive!: boolean;
}
