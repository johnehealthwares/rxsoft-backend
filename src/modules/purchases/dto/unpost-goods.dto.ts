import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UnpostGoodsDto {
  @ApiProperty()
  @IsString()
  receiptLineId!: string;

  @ApiProperty()
  @IsString()
  password!: string;
}
