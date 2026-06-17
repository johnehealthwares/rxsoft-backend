import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApmConversionService } from '../services/apm-conversion.service';

@ApiTags('apm-data')
@Controller('apm/data')
export class ApmDataController {
  constructor(private readonly conversionService: ApmConversionService) {}

  @Get('lgas')
  @ApiOperation({ summary: 'List all LGAs' })
  listLgas() {
    return this.conversionService.listLgas();
  }

  @Get('lgas/:id')
  @ApiOperation({ summary: 'Get LGA by ID' })
  getLga(@Param('id') id: string) {
    return this.conversionService.getLga(id);
  }

  @Get('lgas/:lgaId/wards')
  @ApiOperation({ summary: 'List wards in an LGA' })
  listWards(@Param('lgaId') lgaId: string) {
    return this.conversionService.listWards(lgaId);
  }

  @Get('wards/:id')
  @ApiOperation({ summary: 'Get ward by ID' })
  getWard(@Param('id') id: string) {
    return this.conversionService.getWard(id);
  }

  @Get('wards/:wardId/polling-units')
  @ApiOperation({ summary: 'List polling units in a ward' })
  listPollingUnits(@Param('wardId') wardId: string) {
    return this.conversionService.listPollingUnits(wardId);
  }

  @Get('polling-units/:id')
  @ApiOperation({ summary: 'Get polling unit by ID' })
  getPollingUnit(@Param('id') id: string) {
    return this.conversionService.getPollingUnit(id);
  }

  @Get('polling-units/search/:query')
  @ApiOperation({ summary: 'Search polling units' })
  searchPollingUnits(@Param('query') query: string) {
    return this.conversionService.searchPollingUnits(query);
  }
}
