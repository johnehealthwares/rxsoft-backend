import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';
import { Transform } from 'class-transformer';

export class ListStockLocationsDto extends ListQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  warehouseId?: string;


  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  isActive?: boolean;
}

export class CreateStockLocationDto {
  @ApiPropertyOptional({ description: 'Identity service site (location) id this stock location belongs to; defaults to the caller\u2019s location' })
  @IsOptional()
  @IsString()
  locationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  code?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ enum: ['internal', 'supplier', 'customer', 'inventory', 'scrap', 'transit'] })
  @IsOptional()
  @IsIn(['internal', 'supplier', 'customer', 'inventory', 'scrap', 'transit'])
  locationType?: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}

export class UpdateStockLocationDto {
  @ApiPropertyOptional({ description: 'Identity service site (location) id this stock location belongs to' })
  @IsOptional()
  @IsString()
  locationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['internal', 'supplier', 'customer', 'inventory', 'scrap', 'transit'] })
  @IsOptional()
  @IsIn(['internal', 'supplier', 'customer', 'inventory', 'scrap', 'transit'])
  locationType?: 'internal' | 'supplier' | 'customer' | 'inventory' | 'scrap' | 'transit';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class AdjustStockByReferenceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  locationId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  lotId?: string;

  @ApiProperty()
  @IsNumber()
  deltaQuantity!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  uomId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  reorderMinQty?: number;

  @ApiPropertyOptional()
  @IsOptional()
  reorderMaxQty?: number;
}
