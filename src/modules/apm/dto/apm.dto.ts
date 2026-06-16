import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

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
  sortBy?: string;

  @IsString() @IsOptional()
  sortOrder?: 'asc' | 'desc';
}

export class RegisterVolunteerDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  lga?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  ward?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  pollingUnit?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  skills?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  interests?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  availability?: string;
}

export class JoinMovementDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  lga?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  ward?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  interests?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  skills?: string;
}

export class CreateContactDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiProperty() @IsEmail() @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  subject!: string;

  @ApiProperty() @IsString() @IsNotEmpty() @MinLength(10)
  message!: string;
}

export class NewsletterSubscribeDto {
  @ApiProperty() @IsEmail() @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;
}

export class EventRegistrationDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiProperty() @IsString() @IsNotEmpty()
  phone!: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  lga?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  ward?: string;
}

export class CitizenFeedbackDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  lga?: string;

  @ApiProperty() @IsString() @IsNotEmpty() @MinLength(10)
  message!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  topic?: string;
}

export class IssueReportDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  lga?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  ward?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  category?: string;

  @ApiProperty() @IsString() @IsNotEmpty() @MinLength(10)
  description!: string;
}

export class DonationDto {
  @ApiProperty() @IsString() @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional() @IsEmail() @IsOptional()
  email?: string;

  @ApiPropertyOptional() @IsString() @IsOptional()
  phone?: string;

  @ApiProperty() @Type(() => Number) @IsInt() @Min(100)
  amount!: number;

  @ApiPropertyOptional() @IsString() @IsOptional()
  notes?: string;
}
