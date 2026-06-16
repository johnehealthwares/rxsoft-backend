import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { UpdateUserPosConfigDto, UserPosConfigType } from '../dto/user-pos-config.dto';
import { UserPosConfigService } from '../services/user-pos-config.service';

@ApiTags('user-pos-config')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('user-pos-config')
export class UserPosConfigController {
  constructor(private readonly service: UserPosConfigService) {}

  @Get('me')
  @Roles('admin', 'super_admin', 'cashier')
  async getMyConfig(@CurrentUser() currentUser: RequestUser): Promise<UserPosConfigType> {
    return this.service.getOrCreate(currentUser.sub, currentUser.organizationId);
  }

  @Patch('me')
  @Roles('admin', 'super_admin', 'cashier')
  async updateMyConfig(
    @Body() payload: UpdateUserPosConfigDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<UserPosConfigType> {
    return this.service.update(currentUser.sub, currentUser.organizationId, payload);
  }
}
