import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../domains/role.entity';

class PosConfigResponse {
  @ApiPropertyOptional()
  stockLocationId?: string | null;

  @ApiPropertyOptional()
  stockLocation?: { id: string; name: string } | null;

  @ApiPropertyOptional()
  storeId?: string | null;

  @ApiPropertyOptional()
  allowPos?: boolean;

  @ApiPropertyOptional()
  allowA4Print?: boolean;

  @ApiPropertyOptional()
  loginTimeoutMinutes?: number | null;

  @ApiPropertyOptional()
  defaultCustomerId?: string | null;

  @ApiPropertyOptional()
  defaultCustomer?: { id: string; name: string } | null;

  @ApiPropertyOptional()
  defaultPriceListId?: string | null;

  @ApiPropertyOptional()
  defaultPriceList?: { id: string; name: string } | null;

  @ApiPropertyOptional()
  autoSelectLocation?: boolean;

  @ApiPropertyOptional()
  autoSelectCustomer?: boolean;

  @ApiPropertyOptional()
  autoSelectPriceList?: boolean;
}

export class UserResponseDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  username!: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiProperty({ isArray: true })
  roles!: Role[];

  @ApiPropertyOptional({ type: PosConfigResponse })
  posConfig?: PosConfigResponse;
}
