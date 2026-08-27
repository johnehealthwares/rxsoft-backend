import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';

const SALE_LINE_SORT_COLUMNS = ['lineNumber', 'quantity', 'unitPrice', 'lineTotal', 'saleDate', 'createdAt'];

export class ListSalesLinesDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: SALE_LINE_SORT_COLUMNS, default: 'lineNumber' })
  @IsOptional()
  @IsIn(SALE_LINE_SORT_COLUMNS)
  sortBy: string = 'lineNumber';

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'asc' })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  sortOrder: 'asc' | 'desc' = 'asc';

  @ApiPropertyOptional({ description: 'Restrict lines to a single sale' })
  @IsOptional()
  @IsUUID()
  saleId?: string;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}