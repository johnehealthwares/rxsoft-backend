import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
} from 'class-validator';

export class EhealthwaresListQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit = 20;

  @IsString()
  @IsOptional()
  search?: string;

  @IsString()
  @IsOptional()
  sortBy?: string;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

// ── Site Sections ──────────────────────────────────────────────

export class CreateSiteSectionDto {
  @ApiProperty() @IsString() @IsNotEmpty() key!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subtitle?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() content?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateSiteSectionDto {
  @ApiPropertyOptional() @IsString() @IsOptional() key?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subtitle?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() content?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Products ───────────────────────────────────────────────────

export class CreateProductDto {
  @ApiProperty() @IsString() @IsNotEmpty() slug!: string;
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tagline?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
  @ApiPropertyOptional() @IsString() @IsOptional() iconName?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
  @ApiPropertyOptional() @IsString() @IsOptional() metaTitle?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() metaDescription?: string;
}

export class UpdateProductDto {
  @ApiPropertyOptional() @IsString() @IsOptional() slug?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tagline?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional()
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];
  @ApiPropertyOptional() @IsString() @IsOptional() iconName?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
  @ApiPropertyOptional() @IsString() @IsOptional() metaTitle?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() metaDescription?: string;
}

// ── Services ───────────────────────────────────────────────────

export class CreateServiceDto {
  @ApiProperty() @IsString() @IsNotEmpty() slug!: string;
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tagline?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() iconName?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateServiceDto {
  @ApiPropertyOptional() @IsString() @IsOptional() slug?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() tagline?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() iconName?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Testimonials ───────────────────────────────────────────────

export class CreateTestimonialDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() role?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() company?: string;
  @ApiProperty() @IsString() @IsNotEmpty() text!: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() avatarUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateTestimonialDto {
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() role?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() company?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() text?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() avatarUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Partners ───────────────────────────────────────────────────

export class CreatePartnerDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() logoUrl?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() websiteUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}

export class UpdatePartnerDto {
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() logoUrl?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() websiteUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}

// ── Team Members ───────────────────────────────────────────────

export class CreateTeamMemberDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() role?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() bio?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}

export class UpdateTeamMemberDto {
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() role?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() bio?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
}

// ── Site Settings ──────────────────────────────────────────────

export class CreateSiteSettingDto {
  @ApiProperty() @IsString() @IsNotEmpty() key!: string;
  @ApiPropertyOptional() @IsOptional() value?: unknown;
}

export class UpdateSiteSettingDto {
  @ApiPropertyOptional() @IsString() @IsOptional() key?: string;
  @ApiPropertyOptional() @IsOptional() value?: unknown;
}

// ── Hero Slides ────────────────────────────────────────────────

export class CreateHeroSlideDto {
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subtitle?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() mediaUrl?: string;
  @ApiPropertyOptional() @IsIn(['image', 'video']) @IsOptional() mediaType?:
    'image' | 'video';
  @ApiPropertyOptional() @IsString() @IsOptional() ctaText?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() ctaLink?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateHeroSlideDto {
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() subtitle?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() mediaUrl?: string;
  @ApiPropertyOptional() @IsIn(['image', 'video']) @IsOptional() mediaType?:
    'image' | 'video';
  @ApiPropertyOptional() @IsString() @IsOptional() ctaText?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() ctaLink?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Categories ─────────────────────────────────────────────────

export class CreateCategoryDto {
  @ApiProperty() @IsString() @IsNotEmpty() name!: string;
  @ApiProperty() @IsString() @IsNotEmpty() slug!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() iconUrl?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateCategoryDto {
  @ApiPropertyOptional() @IsString() @IsOptional() name?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() slug?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() iconUrl?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Articles ───────────────────────────────────────────────────

export class CreateArticleDto {
  @ApiProperty() @IsString() @IsNotEmpty() title!: string;
  @ApiProperty() @IsString() @IsNotEmpty() slug!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() excerpt?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() body?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() category?: string;
  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  publishedAt?: Date;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateArticleDto {
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() slug?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() excerpt?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() body?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() category?: string;
  @ApiPropertyOptional()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  publishedAt?: Date;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Investor Data ──────────────────────────────────────────────

export class CreateInvestorDataDto {
  @ApiProperty() @IsString() @IsNotEmpty() label!: string;
  @ApiProperty() @IsString() @IsNotEmpty() value!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateInvestorDataDto {
  @ApiPropertyOptional() @IsString() @IsOptional() label?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() value?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  displayOrder?: number;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Careers ────────────────────────────────────────────────────

export class CreateCareerDto {
  @ApiProperty() @IsString() @IsNotEmpty() title!: string;
  @ApiProperty() @IsString() @IsNotEmpty() slug!: string;
  @ApiPropertyOptional() @IsString() @IsOptional() location?: string;
  @ApiPropertyOptional()
  @IsIn(['full-time', 'contract', 'remote'])
  @IsOptional()
  type?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() department?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateCareerDto {
  @ApiPropertyOptional() @IsString() @IsOptional() title?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() slug?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() location?: string;
  @ApiPropertyOptional()
  @IsIn(['full-time', 'contract', 'remote'])
  @IsOptional()
  type?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() department?: string;
  @ApiPropertyOptional() @IsString() @IsOptional() description?: string;
  @ApiPropertyOptional() @IsUrl() @IsOptional() imageUrl?: string;
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

// ── Contact Submissions ────────────────────────────────────────

export class UpdateContactSubmissionDto {
  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  read?: boolean;
}
