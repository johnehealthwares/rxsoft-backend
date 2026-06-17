import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateUserPosConfigDto } from '../../user-pos-config/dto/user-pos-config.dto';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'cashier01' })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiPropertyOptional({ example: 'N3wP@ss!' })
  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @ApiPropertyOptional({ example: ['cashier'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  roleCodes?: string[];

  @ApiPropertyOptional({ example: '+1234567890' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'POS configuration settings' })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserPosConfigDto)
  posConfig?: UpdateUserPosConfigDto;
}
