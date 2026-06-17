import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCandidateTourDto {
  @ApiProperty() @IsString() @IsNotEmpty() title!: string;
  @ApiProperty() @IsString() @IsNotEmpty() lgaId!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() wardId?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() visitType?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tourDate?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional() expectedAttendees?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
}

export class UpdateCandidateTourDto {
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() visitType?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tourDate?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional() actualAttendees?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() stakeholdersMet?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() commitments?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() complaints?: string;
  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional() volunteerSignups?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() mediaCoverage?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() notes?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() status?: string;
}

export class CreateContentAssetDto {
  @ApiProperty() @IsString() @IsNotEmpty() title!: string;
  @ApiProperty() @IsString() @IsNotEmpty() type!: string;
  @ApiProperty() @IsString() @IsNotEmpty() assetUrl!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() lgaId?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() targetAudience?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() messageKey?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() language?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tags?: string;
}

export class CreateListeningMentionDto {
  @ApiProperty() @IsString() @IsNotEmpty() platform!: string;
  @ApiProperty() @IsString() @IsNotEmpty() title!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() mentionUrl?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() content?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() sentiment?: string;
  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional() reach?: number;
  @ApiPropertyOptional() @IsString() @IsOptional() mentionedAt?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() source?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() category?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() isUrgent?: boolean;
}

export class CreateRapidResponseDto {
  @ApiProperty() @IsString() @IsNotEmpty() mentionId!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() responseType?: string;
  @ApiProperty() @IsString() @IsNotEmpty() content!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() publishedBy?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() platform?: string;
}
