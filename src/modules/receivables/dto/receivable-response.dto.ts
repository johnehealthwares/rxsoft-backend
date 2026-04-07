import { ApiProperty } from '@nestjs/swagger';

export class ReceivableResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  customerId!: string;

  @ApiProperty()
  saleId!: string;

  @ApiProperty()
  receivableNumber!: string;

  @ApiProperty()
  originalAmount!: number;

  @ApiProperty()
  outstandingAmount!: number;

  @ApiProperty({ enum: ['open', 'partially_paid', 'closed', 'written_off'] })
  status!: 'open' | 'partially_paid' | 'closed' | 'written_off';

  @ApiProperty()
  openedAt!: string;

  @ApiProperty({ nullable: true })
  closedAt!: string | null;
}
