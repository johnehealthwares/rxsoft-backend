import { ApiProperty } from '@nestjs/swagger';
import { SaleResponseDto } from './sale-response.dto';

export class CreateSaleResponseDto extends SaleResponseDto {
  @ApiProperty()
  receivableCreated!: boolean;

  @ApiProperty({ nullable: true })
  receivableId!: string | null;

  @ApiProperty()
  outstandingAmount!: number;
}
