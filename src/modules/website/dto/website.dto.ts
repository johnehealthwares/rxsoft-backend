import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, Max, Min, MinLength, ArrayMinSize, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ListQueryDto {
  @Type(() => Number) @IsInt() @Min(1) @IsOptional()
  page = 1;

  @Type(() => Number) @IsInt() @Min(1) @Max(100) @IsOptional()
  limit = 20;

  @IsString() @IsOptional()
  search?: string;

  @IsString() @IsOptional()
  category?: string;

  @IsString() @IsOptional()
  prescription?: string;

  @IsString() @IsOptional()
  sortBy?: string;

  @IsString() @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

export class CreatePrescriptionDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  name?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}

export class CreateConsultationDto {
  @ApiProperty() @IsString()
  name!: string;

  @ApiProperty() @IsString()
  phone!: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  symptoms?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  questions?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  channel?: 'WhatsApp' | 'Phone' | 'Video Call';
}

export class AddToCartDto {
  @ApiProperty() @IsString()
  productId!: string;

  @ApiProperty() @Type(() => Number) @IsInt() @Min(1)
  quantity!: number;
}

export class CreateOrderItemDto {
  @ApiPropertyOptional() @IsUUID() @IsOptional()
  itemId?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  freetextName?: string;

  @ApiProperty() @Type(() => Number) @IsInt() @Min(1)
  quantity!: number;

  @ApiPropertyOptional() @Type(() => Number) @IsOptional()
  unitPrice?: number;
}

export class CreateDeliveryDto {
  @ApiProperty() @IsString()
  address!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  city?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  state?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  shippingMethod?: string;
}

export class CreateOrderDto {
  @ApiPropertyOptional() @IsUUID() @IsOptional()
  customerId?: string;

  @ApiProperty() @IsString()
  paymentMethod!: string;

  @ApiPropertyOptional() @IsArray() @IsString({ each: true }) @IsOptional()
  prescriptionIds?: string[];

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;

  @ApiProperty({ type: [CreateOrderItemDto] }) @IsArray() @ValidateNested({ each: true }) @Type(() => CreateOrderItemDto) @ArrayMinSize(1)
  items!: CreateOrderItemDto[];

  @ApiPropertyOptional({ type: CreateDeliveryDto }) @ValidateNested() @Type(() => CreateDeliveryDto) @IsOptional()
  delivery?: CreateDeliveryDto;
}

export class CreateContactDto {
  @ApiProperty() @IsString()
  name!: string;

  @ApiProperty() @IsEmail()
  email!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiProperty() @IsString()
  subject!: string;

  @ApiProperty() @IsString()
  message!: string;
}

export class NewsletterSubscribeDto {
  @ApiProperty() @IsEmail()
  email!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;
}

export class CreateReviewDto {
  @ApiProperty() @IsString()
  productId!: string;

  @ApiProperty() @Type(() => Number) @IsInt() @Min(1) @Max(5)
  rating!: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  comment?: string;

  @ApiPropertyOptional() @IsArray() @IsString({ each: true }) @IsOptional()
  imageUrls?: string[];
}

export class SearchQueryDto {
  @ApiProperty() @IsString()
  q!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  type?: 'medicines' | 'categories' | 'articles' | 'health_concerns';
}

export class RegisterDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  username!: string;

  @ApiPropertyOptional() @IsString() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiProperty() @IsString() @MinLength(6)
  password!: string;
}

export class CreateHealthConcernDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  slug!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  description?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  content?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  iconName?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaDescription?: string;
}

export class UpdateHealthConcernDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  name?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  slug?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  description?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  content?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  iconName?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  displayOrder?: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaDescription?: string;
}

export class CreateArticleDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  title!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  slug!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  excerpt?: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  category?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  authorName?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  readingTime?: number;

  @ApiPropertyOptional() @Type(() => Boolean) @IsBoolean() @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaDescription?: string;
}

export class UpdateArticleDto {
  @ApiPropertyOptional() @IsString() @IsOptional()
  title?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  slug?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  excerpt?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  content?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  category?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  authorName?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  imageUrl?: string;

  @ApiPropertyOptional() @Type(() => Number) @IsInt() @IsOptional()
  readingTime?: number;

  @ApiPropertyOptional() @Type(() => Boolean) @IsBoolean() @IsOptional()
  isPublished?: boolean;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaTitle?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  metaDescription?: string;
}

export class UpdatePrescriptionStatusDto {
  @ApiProperty({ enum: ['Pending', 'Under Review', 'Approved', 'Rejected', 'Fulfilled'] })
  @IsString() @IsNotEmpty()
  status!: string;
}

export class PostOrderAsSaleDto {
  @ApiPropertyOptional() @IsUUID() @IsOptional()
  stockLocationId?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ['pending', 'confirmed', 'processing', 'dispatched', 'in_transit', 'delivered', 'cancelled'] })
  @IsString() @IsNotEmpty()
  status!: string;
}
