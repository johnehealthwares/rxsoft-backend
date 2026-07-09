import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class SaleDetailCustomerDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional() phone?: string;
  @ApiPropertyOptional() email?: string;
}

class SaleDetailCategoryDto {
  @ApiPropertyOptional() id?: string;
  @ApiPropertyOptional() name?: string;
}

class SaleDetailUomDto {
  @ApiPropertyOptional() id?: string;
  @ApiPropertyOptional() name?: string;
}

class SaleDetailItemDto {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() code?: string;
  @ApiProperty() name!: string;
  @ApiPropertyOptional({ type: SaleDetailCategoryDto }) category?: SaleDetailCategoryDto | null;
  @ApiPropertyOptional() baseUomId?: string;
  @ApiPropertyOptional() saleUomId?: string;
  @ApiPropertyOptional({ type: SaleDetailUomDto }) saleUom?: SaleDetailUomDto | null;
  @ApiPropertyOptional({ type: SaleDetailUomDto }) baseUom?: SaleDetailUomDto | null;
}

class SaleDetailLineDto {
  @ApiProperty() id!: string;
  @ApiProperty() lineNumber!: number;
  @ApiProperty({ type: SaleDetailItemDto }) item!: SaleDetailItemDto;
  @ApiProperty() quantity!: number;
  @ApiProperty() unitPrice!: number;
  @ApiProperty() lineTotal!: number;
}

class SaleDetailPaymentMethodDto {
  @ApiProperty() id!: string;
  @ApiPropertyOptional() code?: string;
  @ApiProperty() name!: string;
  @ApiProperty() methodType!: string;
  @ApiProperty() isActive!: boolean;
}

class SaleDetailPaymentDto {
  @ApiProperty() id!: string;
  @ApiProperty({ type: SaleDetailPaymentMethodDto }) paymentMethod!: SaleDetailPaymentMethodDto;
  @ApiProperty() amount!: number;
}

export class SaleDetailResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() saleNumber!: string;
  @ApiProperty({ enum: ['pos', 'invoice', 'mobile'] }) saleChannel!: string;
  @ApiPropertyOptional({ type: SaleDetailCustomerDto }) customer?: SaleDetailCustomerDto | null;
  @ApiProperty({ enum: ['draft', 'posted', 'voided', 'refunded'] }) status!: string;
  @ApiProperty() totalAmount!: number;
  @ApiProperty() paidAmount!: number;
  @ApiProperty({ type: [SaleDetailLineDto] }) lines!: SaleDetailLineDto[];
  @ApiProperty({ type: [SaleDetailPaymentDto] }) payments!: SaleDetailPaymentDto[];
  @ApiProperty() saleDate!: string;
  @ApiPropertyOptional() notes?: string | null;
}
