import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AdjustStockByReferenceDto } from 'src/modules/inventory/dto/stock-locations.dto';
import { CreatePriceListItemDto } from 'src/modules/pricing/dto/pricing.dto';

export class ReplaceItemDto {
  @ApiProperty({ example: 'Paracetamol 500mg Tablet' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '2f9e3c8a-7fb2-4f43-98b7-5f2a0d4f9021' })
  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @ApiPropertyOptional({ example: 'GEN001' })
  @IsOptional()
  @IsString()
  genericProductCode?: string;

  @ApiProperty({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' })
  @IsString()
  @IsNotEmpty()
  baseUomId!: string;

  @ApiProperty({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' })
  @IsString()
  @IsNotEmpty()
  purchaseUomId!: string;

  @ApiProperty({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' })
  @IsString()
  @IsNotEmpty()
  saleUomId!: string;

  // Org-level override fields (stored on the organisation_items whitelist row)
  @ApiPropertyOptional({ example: 'PCM001' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  code?: string;

  @ApiPropertyOptional({ example: '1234567890123' })
  @IsOptional()
  @IsString()
  barcode?: string;

  @ApiPropertyOptional({ example: 'Panadol 500mg' })
  @IsOptional()
  @IsString()
  alias?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  trackLot?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  trackExpiry?: boolean;

  @ApiPropertyOptional({ example: 730 })
  @IsOptional()
  @IsNumber()
  shelfLifeDays?: number;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  imageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  smallImageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mediumImageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  largeImageUrl?: string;

  @IsOptional()
  priceListItems?: CreatePriceListItemDto[];

  @IsOptional()
  stockItems?: AdjustStockByReferenceDto[];
}
