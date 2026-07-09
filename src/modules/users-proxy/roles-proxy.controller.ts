import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersProxyService } from './users-proxy.service';

@ApiTags('roles-proxy')
@ApiBearerAuth()
@Controller()
export class RolesProxyController {
  constructor(private readonly proxy: UsersProxyService) {}

  @Get('permissions/modules')
  @ApiOperation({ summary: 'List all permissions grouped by module (proxied from rxsoft-identity)' })
  async listModules(@Headers('authorization') auth: string) {
    return this.proxy.listPermissionModules(auth?.replace('Bearer ', '') ?? '');
  }

  @Post('roles')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a role (proxied from rxsoft-identity)' })
  async create(@Headers('authorization') auth: string, @Body() payload: any) {
    return this.proxy.createRole(auth?.replace('Bearer ', '') ?? '', payload);
  }

  @Get('roles')
  @ApiOperation({ summary: 'List roles (proxied from rxsoft-identity)' })
  async list(@Headers('authorization') auth: string) {
    return this.proxy.listRoles(auth?.replace('Bearer ', '') ?? '');
  }

  @Get('roles/:id')
  @ApiOperation({ summary: 'Get a role by ID (proxied from rxsoft-identity)' })
  async get(@Headers('authorization') auth: string, @Param('id') id: string) {
    return this.proxy.getRole(auth?.replace('Bearer ', '') ?? '', id);
  }

  @Put('roles/:id')
  @ApiOperation({ summary: 'Update a role (proxied from rxsoft-identity)' })
  async update(
    @Headers('authorization') auth: string,
    @Param('id') id: string,
    @Body() payload: any,
  ) {
    return this.proxy.updateRole(auth?.replace('Bearer ', '') ?? '', id, payload);
  }

  @Delete('roles/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a role (proxied from rxsoft-identity)' })
  async delete(@Headers('authorization') auth: string, @Param('id') id: string) {
    return this.proxy.deleteRole(auth?.replace('Bearer ', '') ?? '', id);
  }
}
