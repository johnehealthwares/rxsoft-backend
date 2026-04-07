import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class ListReceivableTransactionsDto {
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

  @ApiPropertyOptional({ enum: ['charge', 'payment', 'adjustment', 'write_off'] })
  @IsOptional()
  @IsIn(['charge', 'payment', 'adjustment', 'write_off'])
  transactionType?: 'charge' | 'payment' | 'adjustment' | 'write_off';

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
