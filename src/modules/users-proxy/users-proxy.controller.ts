import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
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
  @ApiOperation({ summary: 'List users (proxied from rxsoft-identity)' })
  async list(
    @Headers('authorization') auth: string,
    @Headers('x-api-key') apiKey: string,
    @Query() query: Record<string, string>,
  ) {
    if (apiKey) {
      return this.proxy.listByApiKey(query);
    }
    return this.proxy.list(auth?.replace('Bearer ', '') ?? '', query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (proxied from rxsoft-identity)' })
  async get(@Headers('authorization') auth: string, @Param('id') id: string) {
    return this.proxy.findOne(auth?.replace('Bearer ', '') ?? '', id);
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
    const token = auth?.replace('Bearer ', '') ?? '';
    const { posConfig, ...identityPayload } = payload;

    const result = await this.proxy.update(token, id, identityPayload);

    if (posConfig) {
      await this.posConfigService.update(id, currentUser.organizationId, posConfig);
    }

    return result;
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
    const token = auth?.replace('Bearer ', '') ?? '';
    const { posConfig, ...identityPayload } = payload;

    const result = await this.proxy.update(token, id, identityPayload);

    if (posConfig) {
      await this.posConfigService.update(id, currentUser.organizationId, posConfig);
    }

    return result;
  }
}
