import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UserPosConfigType {
  id: string;
  userId: string;
  organizationId: string;
  stockLocationId: string | null;
  storeId: string | null;
  allowA4Print: boolean;
  allowPos: boolean;
  loginTimeoutMinutes: number | null;
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
}
