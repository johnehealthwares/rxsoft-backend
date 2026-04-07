import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength, NotEquals } from 'class-validator';

export class ApplyReceivableAdjustmentDto {
  @ApiProperty({
    description: 'Signed adjustment amount. Positive increases outstanding, negative decreases outstanding.',
  })
  @IsNumber()
  @NotEquals(0)
  amount!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(120)
  referenceNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}
