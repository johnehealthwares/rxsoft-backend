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
  CreatePosTerminalDto,
  ListPosTerminalsDto,
  UpdatePosTerminalDto,
} from '../dto/pos-terminals.dto';
import { PosTerminalsService } from '../services/pos-terminals.service';

@ApiTags('pos-terminals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('pos-terminals')
export class PosTerminalsController {
  constructor(private readonly service: PosTerminalsService) {}

  @Get()
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async list(
    @CurrentUser() user: RequestUser,
    @Query() query: ListPosTerminalsDto,
  ) {
    return this.service.list(user.organizationId, query);
  }

  @Get(':terminalId')
  @Roles('admin', 'super_admin', 'pharmacist', 'cashier')
  async get(@Param('terminalId') id: string, @CurrentUser() user: RequestUser) {
    return this.service.get(id, user.organizationId);
  }

  @Post()
  @Roles('admin', 'super_admin')
  async create(
    @Body() payload: CreatePosTerminalDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.service.create(user.organizationId, payload);
  }

  @Put(':terminalId')
  @Roles('admin', 'super_admin')
  async replace(
    @Param('terminalId') id: string,
    @Body() payload: UpdatePosTerminalDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.service.update(id, user.organizationId, payload);
  }

  @Patch(':terminalId')
  @Roles('admin', 'super_admin')
  async patch(
    @Param('terminalId') id: string,
    @Body() payload: UpdatePosTerminalDto,
    @CurrentUser() user: RequestUser,
  ) {
    return this.service.update(id, user.organizationId, payload);
  }

  @Delete(':terminalId')
  @Roles('admin', 'super_admin')
  async remove(
    @Param('terminalId') id: string,
    @CurrentUser() user: RequestUser,
  ) {
    await this.service.remove(id, user.organizationId);
    return { deleted: true };
  }
}
