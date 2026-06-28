import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UserPosConfigType {
  id: string;
  userId: string;
  organizationId: string;
  stockLocationId: string | null;
  stockLocation: { id: string; name: string } | null;
  storeId: string | null;
  allowA4Print: boolean;
  allowPos: boolean;
  loginTimeoutMinutes: number | null;
  defaultCustomerId: string | null;
  defaultCustomer: { id: string; name: string } | null;
  defaultPriceListId: string | null;
  defaultPriceList: { id: string; name: string } | null;
  autoSelectLocation: boolean;
  autoSelectCustomer: boolean;
  autoSelectPriceList: boolean;
  createdAt: string;
  updatedAt: string;
}

export class UpdateUserPosConfigDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  stockLocationId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  storeId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  allowA4Print?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  allowPos?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  loginTimeoutMinutes?: number | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultCustomerId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultPriceListId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoSelectLocation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoSelectCustomer?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  autoSelectPriceList?: boolean;
}
