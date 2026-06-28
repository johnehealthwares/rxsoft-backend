import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';

export class ListPaymentMethodsDto extends ListQueryDto {}

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: ['cash', 'card', 'transfer', 'wallet', 'insurance'] })
  @IsIn(['cash', 'card', 'transfer', 'wallet', 'insurance'])
  methodType!: 'cash' | 'card' | 'transfer' | 'wallet' | 'insurance';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}

export class UpdatePaymentMethodDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['cash', 'card', 'transfer', 'wallet', 'insurance'] })
  @IsOptional()
  @IsIn(['cash', 'card', 'transfer', 'wallet', 'insurance'])
  methodType?: 'cash' | 'card' | 'transfer' | 'wallet' | 'insurance';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
