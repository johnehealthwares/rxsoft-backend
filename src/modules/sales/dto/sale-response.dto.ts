import { ApiProperty } from '@nestjs/swagger';

export class SaleResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  saleNumber!: string;

  @ApiProperty({ enum: ['pos', 'invoice', 'mobile'] })
  saleChannel!: 'pos' | 'invoice' | 'mobile';

  @ApiProperty({ enum: ['draft', 'posted', 'voided', 'refunded'] })
  status!: 'draft' | 'posted' | 'voided' | 'refunded';

  @ApiProperty()
  totalAmount!: number;

  @ApiProperty()
  paidAmount!: number;

  @ApiProperty()
  changeAmount!: number;

  @ApiProperty()
  saleDate!: string;
}
