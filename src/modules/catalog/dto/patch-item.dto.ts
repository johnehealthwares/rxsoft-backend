import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class PatchItemDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ example: 'Paracetamol 500mg' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: '4901234567890' })
  @IsOptional()
  @IsString()
  barcode?: string;
}
