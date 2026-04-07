import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';

export class ListDrugComponentsDto extends ListQueryDto {}

export class CreateDrugComponentDto {
  @ApiProperty()
  @IsString()
  name!: string;
}

export class UpdateDrugComponentDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;
}
