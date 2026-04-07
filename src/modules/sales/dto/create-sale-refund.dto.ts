import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMinSize, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from 'class-validator';

export class CreateSaleRefundLineDto {
  @ApiProperty()
  @IsString()
  saleLineId!: string;

  @ApiProperty()
  @IsNumber()
  @Min(0.0001)
  quantity!: number;
}

export class CreateSaleRefundDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;

  @ApiProperty({ type: [CreateSaleRefundLineDto] })
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSaleRefundLineDto)
  lines!: CreateSaleRefundLineDto[];
}
