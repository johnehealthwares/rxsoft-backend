import { ApiProperty } from '@nestjs/swagger';

export class ForeignProperty {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  code: string | null;

  @ApiProperty()
  name!: string;
}


class ItemCategoryResponse {
  @ApiProperty()
  id!: string;

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
  id!: string;

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

export class ItemResponseDto {
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
  category!: ItemCategoryResponse;

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

  @ApiProperty({ nullable: true })
  saleUom!: ForeignProperty | null;

  @ApiProperty({ nullable: true })
  baseUom!: ForeignProperty | null;

  @ApiProperty({ nullable: true })
  purchaseUom!: ForeignProperty | null;

  @ApiProperty()
  trackLot!: boolean;

  @ApiProperty()
  trackExpiry!: boolean;

  @ApiProperty({ nullable: true })
  shelfLifeDays!: number | null;

  @ApiProperty()
  isActive!: boolean;

  @ApiProperty({ nullable: true })
  imageUrl!: string | null;

  @ApiProperty({ nullable: true })
  smallImageUrl!: string | null;

  @ApiProperty({ nullable: true })
  mediumImageUrl!: string | null;

  @ApiProperty({ nullable: true })
  largeImageUrl!: string | null;
}
