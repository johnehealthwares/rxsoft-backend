import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import type {
  PaymentProviderChannel,
  PaymentProviderType,
} from '../entities/payment-provider.orm-entity';

export const PROVIDER_TYPES: PaymentProviderType[] = [
  'paystack',
  'monnify',
  'opay',
  'moniepoint',
  'wallet',
  'insurance',
  'cash',
];
export const PROVIDER_CHANNELS: PaymentProviderChannel[] = [
  'cash',
  'pos',
  'web',
  'wallet',
  'insurance',
];

export class ProviderCredentialSetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  publicKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  secretKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiKey?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  apiSecret?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  contractCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  clientSecret?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  merchantId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  terminalId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  webhookSecret?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  baseUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sandboxBaseUrl?: string;
}

export class CreatePaymentProviderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ enum: PROVIDER_TYPES })
  @IsIn(PROVIDER_TYPES)
  providerType!: PaymentProviderType;

  @ApiProperty({ enum: PROVIDER_CHANNELS })
  @IsIn(PROVIDER_CHANNELS)
  channel!: PaymentProviderChannel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  production?: boolean;

  @ApiPropertyOptional({ type: ProviderCredentialSetDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderCredentialSetDto)
  testConfig?: ProviderCredentialSetDto;

  @ApiPropertyOptional({ type: ProviderCredentialSetDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderCredentialSetDto)
  liveConfig?: ProviderCredentialSetDto;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class UpdatePaymentProviderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiPropertyOptional({ enum: PROVIDER_TYPES })
  @IsOptional()
  @IsIn(PROVIDER_TYPES)
  providerType?: PaymentProviderType;

  @ApiPropertyOptional({ enum: PROVIDER_CHANNELS })
  @IsOptional()
  @IsIn(PROVIDER_CHANNELS)
  channel?: PaymentProviderChannel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  production?: boolean;

  @ApiPropertyOptional({ type: ProviderCredentialSetDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderCredentialSetDto)
  testConfig?: ProviderCredentialSetDto;

  @ApiPropertyOptional({ type: ProviderCredentialSetDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProviderCredentialSetDto)
  liveConfig?: ProviderCredentialSetDto;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  sortOrder?: number;
}

export class ListPaymentProvidersDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page = 1;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  limit = 50;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: PROVIDER_CHANNELS })
  @IsOptional()
  @IsIn(PROVIDER_CHANNELS)
  channel?: PaymentProviderChannel;
}

export class UpdateOrganisationPaymentProviderDto {
  @ApiProperty()
  @IsString()
  organizationId!: string;

  @ApiProperty()
  @IsString()
  paymentProviderId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

export class CreatePaymentMethodProviderDto {
  @ApiProperty()
  @IsString()
  paymentMethodId!: string;

  @ApiProperty()
  @IsString()
  paymentProviderId!: string;

  @ApiProperty({ enum: PROVIDER_CHANNELS })
  @IsIn(PROVIDER_CHANNELS)
  channel!: PaymentProviderChannel;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class BulkSetPaymentMethodProvidersDto {
  @ApiProperty()
  @IsString()
  paymentMethodId!: string;

  @ApiProperty({ type: [CreatePaymentMethodProviderDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePaymentMethodProviderDto)
  providers!: CreatePaymentMethodProviderDto[];
}
