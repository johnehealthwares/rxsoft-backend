import { ApiProperty } from '@nestjs/swagger';

export class CreateSaleRefundResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  saleId!: string;

  @ApiProperty()
  refundNumber!: string;

  @ApiProperty({ enum: ['posted', 'voided'] })
  status!: 'posted' | 'voided';

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  refundDate!: string;
}
