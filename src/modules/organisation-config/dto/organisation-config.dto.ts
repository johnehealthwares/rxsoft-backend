import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class OrganisationConfigType {
  id: string;
  organizationId: string;
  posHeader: string | null;
  defaultLoginTimeoutMinutes: number;
  defaultAllowPos: boolean;
  defaultAllowA4Print: boolean;
  createdAt: string;
  updatedAt: string;
}

export class UpdateOrganisationConfigDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  posHeader?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  @Min(1)
  defaultLoginTimeoutMinutes?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  defaultAllowPos?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  defaultAllowA4Print?: boolean;
}