import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCanvassingSessionDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  title!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  lgaId!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  wardId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  teamLead?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @Min(1) @IsOptional()
  teamSize?: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  scheduledDate?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class UpdateCanvassingSessionDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  title?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  status?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  teamLead?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @Min(1) @IsOptional()
  teamSize?: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  completedDate?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class CreateCanvassingVisitDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  address?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  supportLevel?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  issues?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  outcome?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  contactedAt?: string;
}

export class CreateVolunteerAssignmentDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  volunteerId!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  lgaId!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  wardId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  role?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class UpdateVolunteerAssignmentDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  wardId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  role?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  status?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}
