import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStockAdjustmentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  stockBalanceId!: string;

  @ApiProperty({ description: 'Can be positive or negative' })
  @IsNumber()
  deltaQuantity!: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  reason!: string;
}
