import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateUomDto {
  @ApiPropertyOptional({ example: 'UNIT' })
  @IsOptional()
  @IsString()
  @MaxLength(32)
  code?: string;

  @ApiPropertyOptional({ example: 'Unit' })
  @IsOptional()
  @IsString()
  @MaxLength(64)
  name?: string;

  @ApiPropertyOptional({ example: 'cat-uuid' })
  @IsOptional()
  @IsString()
  categoryId?: string | null;

  @ApiPropertyOptional({ enum: ['reference', 'bigger', 'smaller'] })
  @IsOptional()
  @IsIn(['reference', 'bigger', 'smaller'])
  uomType?: 'reference' | 'bigger' | 'smaller';

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0.00000001)
  factor?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Min(0.00000001)
  rounding?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
