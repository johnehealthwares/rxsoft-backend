import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountingController } from './controllers/accounting.controller';
import { GlAccountOrmEntity, JournalEntryLineOrmEntity, JournalEntryOrmEntity, JournalOrmEntity } from './entities';
import { AccountingService } from './services/accounting.service';
import { AccountingIntegrationService } from './services/accounting-integration.service';

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([GlAccountOrmEntity, JournalOrmEntity, JournalEntryOrmEntity, JournalEntryLineOrmEntity]),
  ],
  controllers: [AccountingController],
  providers: [AccountingService, AccountingIntegrationService],
  exports: [AccountingIntegrationService],
})
export class AccountingModule {}
