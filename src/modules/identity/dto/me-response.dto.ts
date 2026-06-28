import { ApiProperty } from '@nestjs/swagger';
import { ModuleInfoDto } from './module-info.dto';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class MeResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  username!: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiProperty({ isArray: true })
  roles!: string[];

  @ApiProperty({ isArray: true })
  permissions!: string[];

  @ApiProperty({ type: [ModuleInfoDto] })
  modules!: ModuleInfoDto[];
}
