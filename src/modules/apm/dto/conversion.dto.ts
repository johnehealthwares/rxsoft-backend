import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateStakeholderDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  role?: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  lgaId!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  wardId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  affiliation?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  influenceLevel?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  conversionStatus?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class UpdateStakeholderDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  name?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  role?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  lgaId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  wardId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  affiliation?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  influenceLevel?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  conversionStatus?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class CreateConversionActivityDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  type!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  outcome?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  conductedBy?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  conductedAt?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  followUpDate?: string;
}

export class UpdateConversionScoreDto {
  @ApiProperty() @Type(() => Number) @IsInt() @Min(0) @Max(100)
  score!: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  status?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  assessedBy?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class UpdatePollingUnitDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  name?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  registeredVoters?: number;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  pastResultApm?: number;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  pastResultPdp?: number;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  pastResultApc?: number;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  pastResultOther?: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  riskLevel?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  conversionStatus?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  assignedAgentName?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  assignedAgentPhone?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class CreateWhatsAppGroupDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  level!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  parentId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  description?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  groupLink?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  adminName?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  adminPhone?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  memberCount?: number;
}
