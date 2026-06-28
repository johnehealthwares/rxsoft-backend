import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';

export class ListGenericProductsDto extends ListQueryDto {}

export class CreateGenericProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(32)
  code!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  pharmaceuticsId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  therapeuticClass?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dosageForm?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  strength?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  generalUse?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adultDosage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pediatricDosage?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isPrescriptionRequired?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  isControlledSubstance?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}

export class UpdateGenericProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(32)
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pharmaceuticsId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  therapeuticClass?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  dosageForm?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  strength?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  generalUse?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  adultDosage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  pediatricDosage?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isPrescriptionRequired?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isControlledSubstance?: boolean;
}
