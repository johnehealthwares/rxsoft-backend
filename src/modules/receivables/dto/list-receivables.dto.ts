import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class ListReceivablesDto {
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

  @ApiPropertyOptional({ enum: ['open', 'partially_paid', 'closed', 'written_off'] })
  @IsOptional()
  @IsIn(['open', 'partially_paid', 'closed', 'written_off'])
  status?: 'open' | 'partially_paid' | 'closed' | 'written_off';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  customerId?: string;

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
