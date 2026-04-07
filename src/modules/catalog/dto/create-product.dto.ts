import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { AdjustStockByReferenceDto } from 'src/modules/inventory/dto/stock-locations.dto';
import { CreatePriceListItemDto } from 'src/modules/pricing/dto/pricing.dto';

export class CreateProductDto {
  @ApiProperty({ example: 'PCM001' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  code!: string;

  @ApiProperty({ example: 'Paracetamol 500mg Tablet' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '2f9e3c8a-7fb2-4f43-98b7-5f2a0d4f9021' })
  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @ApiProperty({ example: '5c0d6f5d-2952-4924-8ec6-c2c488a54cab' })
  @IsString()
  @IsNotEmpty()
  genericProductId!: string;

  @ApiProperty({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' })
  @IsString()
  @IsNotEmpty()
  baseUomId!: string;

  @ApiPropertyOptional({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' })
  @IsOptional()
  @IsString()
  purchaseUomId?: string;

  @ApiPropertyOptional({ example: '8f6c4d74-607a-4d90-96f5-4aa6f4a32b31' })
  @IsOptional()
  @IsString()
  saleUomId?: string;

  @ApiPropertyOptional({ example: '1234567890123' })
  @IsOptional()
  @IsString()
  barcode?: string;

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

  @IsOptional()
  priceListItems?: CreatePriceListItemDto[];

  @IsOptional()
  stockItems?: AdjustStockByReferenceDto[];
}
