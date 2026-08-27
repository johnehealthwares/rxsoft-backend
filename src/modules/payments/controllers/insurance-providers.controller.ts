import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import {
  CreateInsuranceProviderDto,
  ListInsuranceProvidersDto,
  UpdateInsuranceProviderDto,
} from '../dto/insurance-providers.dto';
import { InsuranceProvidersService } from '../services/insurance-providers.service';

@ApiTags('insurance-providers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('insurance-providers')
export class InsuranceProvidersController {
  constructor(private readonly service: InsuranceProvidersService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @CurrentUser() user: RequestUser,
    @Query() query: ListInsuranceProvidersDto,
  ) {
    return this.service.list(user.organizationId, query);
  }

  @Get(':providerId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async get(@Param('providerId') id: string, @CurrentUser() user: RequestUser) {
    return this.service.get(id, user.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin')
  async create(
    @Body() payload: CreateInsuranceProviderDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.service.create(user.organizationId, payload);
  }

  @Put(':providerId')
  @Roles('admin', 'super_admin')
  async replace(
    @Param('providerId') id: string,
    @Body() payload: UpdateInsuranceProviderDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.service.update(id, user.organizationId, payload);
  }

  @Patch(':providerId')
  @Roles('admin', 'super_admin')
  async patch(
    @Param('providerId') id: string,
    @Body() payload: UpdateInsuranceProviderDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.service.update(id, user.organizationId, payload);
  }

  @Delete(':providerId')
  @Roles('admin', 'super_admin')
  async remove(
    @Param('providerId') id: string,
    @CurrentUser() user: RequestUser,
  ) {
    await this.service.remove(id, user.organizationId);
    return { deleted: true };
  }
}
