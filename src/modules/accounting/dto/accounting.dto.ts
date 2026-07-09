import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDateString, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ListQueryDto } from '../../../shared/dto/list-query.dto';

export class ListGlAccountsDto extends ListQueryDto {
  @ApiPropertyOptional({ enum: ['asset', 'liability', 'equity', 'income', 'expense'] })
  @IsOptional()
  @IsIn(['asset', 'liability', 'equity', 'income', 'expense'])
  accountType?: 'asset' | 'liability' | 'equity' | 'income' | 'expense';
}

export class CreateGlAccountDto {
  @ApiProperty()
  @IsString()
  accountCode!: string;

  @ApiProperty()
  @IsString()
  accountName!: string;

  @ApiProperty({ enum: ['asset', 'liability', 'equity', 'income', 'expense'] })
  @IsIn(['asset', 'liability', 'equity', 'income', 'expense'])
  accountType!: 'asset' | 'liability' | 'equity' | 'income' | 'expense';

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  allowsReconciliation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}

export class UpdateGlAccountDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accountCode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  accountName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  allowsReconciliation?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class ListJournalsDto extends ListQueryDto {}
export class ListJournalEntriesDto extends ListQueryDto {}
export class ListJournalEntryLinesDto extends ListQueryDto {}

export class CreateJournalDto {
  @ApiProperty()
  @IsString()
  code!: string;

  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ enum: ['sale', 'purchase', 'cash', 'bank', 'general'] })
  @IsIn(['sale', 'purchase', 'cash', 'bank', 'general'])
  journalType!: 'sale' | 'purchase' | 'cash' | 'bank' | 'general';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultDebitAccountId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultCreditAccountId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  overrideCodeValidation?: boolean;
}

export class UpdateJournalDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  code?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ enum: ['sale', 'purchase', 'cash', 'bank', 'general'] })
  @IsOptional()
  @IsIn(['sale', 'purchase', 'cash', 'bank', 'general'])
  journalType?: 'sale' | 'purchase' | 'cash' | 'bank' | 'general';

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultDebitAccountId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  defaultCreditAccountId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CreateJournalEntryLineDto {
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  lineNumber!: number;

  @ApiProperty()
  @IsString()
  glAccountId!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partyId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  itemId?: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  debitAmount?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  creditAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateJournalEntryLineDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  lineNumber?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  glAccountId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  partyId?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  itemId?: string | null;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  debitAmount?: number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  creditAmount?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string | null;
}

export class CreateJournalEntryDto {
  @ApiProperty()
  @IsString()
  journalId!: string;

  @ApiProperty()
  @IsString()
  entryNumber!: string;

  @ApiProperty()
  @IsDateString()
  entryDate!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sourceType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sourceId?: string;

  @ApiPropertyOptional({ enum: ['draft', 'posted', 'reversed'] })
  @IsOptional()
  @IsIn(['draft', 'posted', 'reversed'])
  status?: 'draft' | 'posted' | 'reversed';

  @ApiPropertyOptional({ type: [CreateJournalEntryLineDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalEntryLineDto)
  lines?: CreateJournalEntryLineDto[];
}

export class UpdateJournalEntryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  journalId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  entryNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  entryDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  reference?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sourceType?: string | null;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sourceId?: string | null;

  @ApiPropertyOptional({ enum: ['draft', 'posted', 'reversed'] })
  @IsOptional()
  @IsIn(['draft', 'posted', 'reversed'])
  status?: 'draft' | 'posted' | 'reversed';
}
