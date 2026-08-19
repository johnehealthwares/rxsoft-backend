import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class PrintPdfDto {
  @ApiProperty({ description: 'HTML content to render to PDF' })
  @IsString()
  @MinLength(1)
  @MaxLength(2_000_000)
  html: string;

  @ApiPropertyOptional({ description: 'Download filename (default: document.pdf)' })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  filename?: string;

  @ApiPropertyOptional({ description: 'Render in landscape orientation', default: false })
  @IsBoolean()
  @IsOptional()
  landscape?: boolean;
}
