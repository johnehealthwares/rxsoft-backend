import { ApiProperty } from '@nestjs/swagger';

export class ModuleInfoDto {
  @ApiProperty({ example: 'rxsoft' })
  id!: string;

  @ApiProperty({ example: 'RxSoft' })
  name!: string;

  @ApiProperty({ example: 'Pharmacy Admin' })
  description!: string;

  @ApiProperty({ example: '/items' })
  root!: string;
}
