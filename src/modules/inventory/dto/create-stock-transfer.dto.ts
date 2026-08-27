import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStockTransferDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromLocationId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toLocationId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemId!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  lotId?: string | null;

  @ApiProperty({ minimum: 0.001 })
  @IsNumber()
  @Min(0.001)
  quantity!: number;

  @ApiProperty({
    required: false,
    description:
      'UOM the quantity is expressed in. Defaults to the item base UOM; the ' +
      'quantity is converted to base UOM before stock is adjusted.',
  })
  @IsOptional()
  @IsString()
  uomId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  reason?: string;
}
