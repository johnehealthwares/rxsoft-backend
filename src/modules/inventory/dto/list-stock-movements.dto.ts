import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';

export class ListStockMovementsDto extends ListQueryDto {
  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  override limit = 20;

  @ApiPropertyOptional({ enum: ['in', 'out', 'transfer', 'adjustment', 'base-conversion'] })
  @IsOptional()
  @IsIn(['in', 'out', 'transfer', 'adjustment', 'base-conversion'])
  movementType?: 'in' | 'out' | 'transfer' | 'adjustment' | 'base-conversion';

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  itemId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  toDate?: string;
}