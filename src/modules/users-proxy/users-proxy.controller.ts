import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, type RequestUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UserPosConfigService } from '../user-pos-config/services/user-pos-config.service';
import { UsersProxyService } from './users-proxy.service';

@ApiTags('users-proxy')
@ApiBearerAuth()
@Controller('users')
export class UsersProxyController {
  constructor(
    private readonly proxy: UsersProxyService,
    private readonly posConfigService: UserPosConfigService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'List users (proxied from rxsoft-identity)' })
  async list(
    @Headers('authorization') auth: string,
    @Headers('x-api-key') apiKey: string,
    @Query() query: Record<string, string>,
    @CurrentUser() currentUser: RequestUser,
  ) {
    if (apiKey) {
      return this.proxy.listByApiKey(query);
    }
    const data = await this.proxy.list(auth?.replace('Bearer ', '') ?? '', query);
    return this.withPosConfig(data, currentUser.organizationId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create user (proxied to identity; posConfig saved locally)' })
  async create(
    @Headers('authorization') auth: string,
    @Body() payload: any,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const token = auth?.replace('Bearer ', '') ?? '';
    const { posConfig, ...identityPayload } = payload;

    // Sync the per-user session timeout to identity so the token issuer can
    // apply it at login/refresh time (local copy stays for POS defaults).
    if (posConfig && posConfig.loginTimeoutMinutes !== undefined) {
      identityPayload.loginTimeoutMinutes = posConfig.loginTimeoutMinutes === null
        ? null
        : Number(posConfig.loginTimeoutMinutes);
    }

    const result = await this.proxy.create(token, identityPayload);

    if (posConfig && result?.id) {
      await this.posConfigService.update(result.id, currentUser.organizationId, posConfig);
    }

    return result;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID (proxied from rxsoft-identity)' })
  async get(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const data = await this.proxy.findOne(auth?.replace('Bearer ', '') ?? '', id);
    return this.withPosConfig(data, currentUser.organizationId);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user (proxied to identity; posConfig saved locally)' })
  async update(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() payload: any,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.updateUser(auth, id, payload, currentUser);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Partially update user (proxied to identity; posConfig saved locally)' })
  async patch(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() payload: any,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.updateUser(auth, id, payload, currentUser);
  }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update user via POST (proxied to identity; posConfig saved locally)' })
  async updateViaPost(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() payload: any,
    @CurrentUser() currentUser: RequestUser,
  ) {
    return this.updateUser(auth, id, payload, currentUser);
  }

  private async updateUser(
    auth: string,
    id: string,
    payload: any,
    currentUser: RequestUser,
  ) {
    const token = auth?.replace('Bearer ', '') ?? '';
    const { posConfig, ...identityPayload } = payload;

    // Sync the per-user session timeout to identity so the token issuer can
    // apply it at login/refresh time (local copy stays for POS defaults).
    if (posConfig && posConfig.loginTimeoutMinutes !== undefined) {
      identityPayload.loginTimeoutMinutes = posConfig.loginTimeoutMinutes === null
        ? null
        : Number(posConfig.loginTimeoutMinutes);
    }

    const result = await this.proxy.update(token, id, identityPayload);

    if (posConfig) {
      await this.posConfigService.update(id, currentUser.organizationId, posConfig);
    }

    return result;
  }

  private async withPosConfig<T>(payload: T, organizationId: string | null): Promise<T> {
    if (!organizationId || !payload || typeof payload !== 'object') {
      return payload;
    }
    const configs = await this.posConfigService.listByOrganization(organizationId);
    const byUser = new Map(configs.map((c) => [c.userId, c]));

    const apply = (row: any) => {
      const config = byUser.get(row?.id);
      if (config) {
        row.posConfig = config;
      }
      return row;
    };

    const shaped = payload as Record<string, unknown>;
    if (Array.isArray(shaped.data)) {
      for (const row of shaped.data as any[]) {
        apply(row);
      }
    } else if ('id' in shaped) {
      apply(shaped);
    }

    return payload;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user (proxied to identity; local posConfig removed)' })
  async delete(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @CurrentUser() currentUser: RequestUser,
  ) {
    const token = auth?.replace('Bearer ', '') ?? '';
    const result = await this.proxy.delete(token, id);
    await this.posConfigService.remove(id, currentUser.organizationId);
    return result;
  }
}