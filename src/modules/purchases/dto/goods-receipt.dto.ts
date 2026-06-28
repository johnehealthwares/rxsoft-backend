import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsDateString, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';

export class ReceiveGoodsLineDto {
  @ApiProperty()
  @IsString()
  itemId!: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0.001)
  receivedQty!: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  unitCost!: number;

  @ApiProperty()
  @IsString()
  uomId!: string;
}

export class ReceiveGoodsDto {
  @ApiProperty()
  @IsString()
  purchaseOrderId!: string;

  @ApiProperty()
  @IsDateString()
  receivedDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  receiptNumber?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ type: [ReceiveGoodsLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReceiveGoodsLineDto)
  lines!: ReceiveGoodsLineDto[];
}

export class GoodsReceiptLineResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  itemId!: string;

  @ApiProperty()
  receivedQty!: number;

  @ApiProperty()
  unitCost!: number;

  @ApiProperty()
  uomId!: string;
}

export class GoodsReceiptResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  receiptNumber!: string;

  @ApiProperty()
  purchaseOrderId!: string;

  @ApiProperty()
  receivedDate!: string;

  @ApiProperty()
  note!: string | null;

  @ApiProperty({ type: [GoodsReceiptLineResponseDto] })
  lines!: GoodsReceiptLineResponseDto[];
}
