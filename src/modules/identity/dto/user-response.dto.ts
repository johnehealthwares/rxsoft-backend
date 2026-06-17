import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class PosConfigResponse {
  @ApiPropertyOptional()
  stockLocationId?: string | null;

  @ApiPropertyOptional()
  storeId?: string | null;

  @ApiPropertyOptional()
  allowPos?: boolean;

  @ApiPropertyOptional()
  allowA4Print?: boolean;

  @ApiPropertyOptional()
  loginTimeoutMinutes?: number | null;
}

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  username!: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty({ isArray: true })
  roles!: string[];

  @ApiPropertyOptional({ type: PosConfigResponse })
  posConfig?: PosConfigResponse;
}
