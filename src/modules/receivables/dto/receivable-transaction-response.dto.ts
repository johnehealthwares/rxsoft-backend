import { ApiProperty } from '@nestjs/swagger';

export class ReceivableTransactionResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  receivableId!: string;

  @ApiProperty({ enum: ['charge', 'payment', 'adjustment', 'write_off'] })
  transactionType!: 'charge' | 'payment' | 'adjustment' | 'write_off';

  @ApiProperty()
  amount!: number;

  @ApiProperty()
  transactionDate!: string;

  @ApiProperty({ nullable: true })
  paymentMethodId!: string | null;

  @ApiProperty({ nullable: true })
  referenceNumber!: string | null;

  @ApiProperty({ nullable: true })
  receivedByUserId!: string | null;

  @ApiProperty({ nullable: true })
  note!: string | null;
}
