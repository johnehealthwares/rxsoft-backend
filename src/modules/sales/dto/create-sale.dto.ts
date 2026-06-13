import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class CreateSaleLineDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemId!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  uomId!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  lotId?: string | null;

  @ApiProperty({ minimum: 0.001 })
  @IsNumber()
  @Min(0.001)
  quantity!: number;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  unitPrice!: number;
}

class CreateSalePaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentMethodId!: string;

  @ApiProperty({ minimum: 0 })
  @IsNumber()
  @Min(0)
  amount!: number;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  paymentReference?: string | null;
}

export class CreateSaleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  saleNumber!: string;

  @ApiProperty({ enum: ['pos', 'invoice', 'mobile'], default: 'pos' })
  @IsIn(['pos', 'invoice', 'mobile'])
  saleChannel: 'pos' | 'invoice' | 'mobile' = 'pos';

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  storeId!: string;

  @ApiProperty({ required: false, nullable: true })
  @IsOptional()
  @IsString()
  customerId?: string | null;

  @ApiProperty({ type: [CreateSaleLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleLineDto)
  lines!: CreateSaleLineDto[];

  @ApiProperty({ type: [CreateSalePaymentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalePaymentDto)
  payments!: CreateSalePaymentDto[];

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  hold?: boolean;
}

export type CreateSaleLineInput = CreateSaleLineDto;
export type CreateSalePaymentInput = CreateSalePaymentDto;
