import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GenericDrugCacheService } from './generic-drug-cache.service';
import { HealthcareConceptsService } from './healthcare-concepts.service';

@Module({
  imports: [HttpModule],
  providers: [HealthcareConceptsService, GenericDrugCacheService],
  exports: [HealthcareConceptsService, GenericDrugCacheService],
})
export class ServicesModule {}
