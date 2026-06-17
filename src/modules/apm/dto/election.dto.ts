import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePollingAgentDto {
  @ApiProperty() @IsString() @IsNotEmpty() pollingUnitId!: string;
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() phone!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() role?: string;
}

export class UpdatePollingAgentDto {
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() phone?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() role?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() trainingStatus?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() isActive?: boolean;
}

export class CreateResultEntryDto {
  @ApiProperty() @IsString() @IsNotEmpty() pollingUnitId!: string;
  @ApiProperty() @IsString() @IsNotEmpty() lgaId!: string;
  @ApiProperty() @IsString() @IsNotEmpty() wardId!: string;
  @ApiProperty() @Type(() => Number) @IsInt() @Min(0) apmVotes!: number;
  @ApiProperty() @Type(() => Number) @IsInt() @Min(0) pdpVotes!: number;
  @ApiProperty() @Type(() => Number) @IsInt() @Min(0) apcVotes!: number;
  @ApiPropertyOptional() @Type(() => Number) @IsInt() @Min(0) @IsOptional() otherVotes?: number;
  @ApiProperty() @Type(() => Number) @IsInt() @Min(0) registeredVoters!: number;
  @ApiPropertyOptional() @IsString() @IsOptional() photoUrl?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() enteredBy?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}

export class CreateIncidentReportDto {
  @ApiPropertyOptional() @IsString() @IsOptional() pollingUnitId?: string;
  @ApiProperty() @IsString() @IsNotEmpty() type!: string;
  @ApiProperty() @IsString() @IsNotEmpty() description!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() severity?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() reportedBy?: string;
}

export class UpdateIncidentReportDto {
  @ApiPropertyOptional() @IsString() @IsOptional() status?: string;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() legalEscalation?: boolean;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() securityEscalation?: boolean;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}

export class CreateGotvRecordDto {
  @ApiProperty() @IsString() @IsNotEmpty() pollingUnitId!: string;
  @ApiProperty() @IsString() @IsNotEmpty() supporterName!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() supporterPhone?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() contactedVia?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}

export class UpdateGotvRecordDto {
  @ApiPropertyOptional() @IsBoolean() @IsOptional() contacted?: boolean;
  @ApiPropertyOptional() @IsBoolean() @IsOptional() turnedOut?: boolean;
  @ApiPropertyOptional() @IsString() @IsOptional() contactedVia?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}
