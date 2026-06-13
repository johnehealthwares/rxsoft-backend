import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { RoleResponseDto } from '../dto/role-response.dto';
import { CreateRoleUseCase } from '../services/create-role.use-case';
import { ListRolesUseCase } from '../services/list-roles.use-case';
import { GetRoleUseCase } from '../services/get-role.use-case';
import { UpdateRoleUseCase } from '../services/update-role.use-case';
import { DeleteRoleUseCase } from '../services/delete-role.use-case';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';

function toResponse(role: { id: string; code: string; name: string; description: string | null; permissionCodes: string[] }): RoleResponseDto {
  return { id: role.id, code: role.code, name: role.name, description: role.description, permissionCodes: role.permissionCodes };
}

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('roles')
export class RolesController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUseCase,
    private readonly listRolesUseCase: ListRolesUseCase,
    private readonly getRoleUseCase: GetRoleUseCase,
    private readonly updateRoleUseCase: UpdateRoleUseCase,
    private readonly deleteRoleUseCase: DeleteRoleUseCase,
  ) {}

  @Post()
  @Roles('admin', 'super_admin')
  @AuditAction('identity.role.create')
  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({ status: 201, type: RoleResponseDto })
  async create(@Body() payload: CreateRoleDto, @CurrentUser() currentUser: RequestUser): Promise<RoleResponseDto> {
    const role = await this.createRoleUseCase.execute(payload, currentUser.organizationId);
    return toResponse(role);
  }

  @Get()
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List all roles' })
  @ApiResponse({ status: 200, type: [RoleResponseDto] })
  async list(@CurrentUser() currentUser: RequestUser): Promise<RoleResponseDto[]> {
    const roles = await this.listRolesUseCase.execute(currentUser.organizationId);
    return roles.map(toResponse);
  }

  @Get(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiResponse({ status: 200, type: RoleResponseDto })
  async getById(@Param('id') id: string, @CurrentUser() currentUser: RequestUser): Promise<RoleResponseDto> {
    const role = await this.getRoleUseCase.execute(id, currentUser.organizationId);
    return toResponse(role);
  }

  @Put(':id')
  @Roles('admin', 'super_admin')
  @AuditAction('identity.role.update')
  @ApiOperation({ summary: 'Update a role' })
  @ApiResponse({ status: 200, type: RoleResponseDto })
  async update(@Param('id') id: string, @Body() payload: UpdateRoleDto, @CurrentUser() currentUser: RequestUser): Promise<RoleResponseDto> {
    const role = await this.updateRoleUseCase.execute(id, payload, currentUser.organizationId);
    return toResponse(role);
  }

  @Delete(':id')
  @Roles('admin', 'super_admin')
  @AuditAction('identity.role.delete')
  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.deleteRoleUseCase.execute(id, currentUser.organizationId);
  }
}
