import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, ArrayNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ example: 'manager' })
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty({ example: 'Manager' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'Can manage products and inventory' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: ['products:read', 'inventory:write'] })
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  permissionCodes?: string[];

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}
