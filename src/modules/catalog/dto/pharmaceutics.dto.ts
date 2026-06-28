import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';

export class ListPharmaceuticsDto extends ListQueryDto {}

export class CreatePharmaceuticsDto {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  code!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commonBrandName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  commonGenericName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  clinicalName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugClass?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  chemicalConstituents?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pharmaceutics?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  indications?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contraindications?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  mechanism?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  missedDose?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  drugInteractions?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dosage?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  drugComponentIds?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}

export class UpdatePharmaceuticsDto extends CreatePharmaceuticsDto {}
