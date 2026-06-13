import { Body, Controller, Delete, Get, Inject, NotFoundException, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AssignRoleDto } from '../dto/assign-role.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { AssignRoleUseCase } from '../services/assign-role.use-case';
import { CreateUserUseCase } from '../services/create-user.use-case';
import { UpdateUserUseCase } from '../services/update-user.use-case';
import { DeleteUserUseCase } from '../services/delete-user.use-case';
import { ListUsersUseCase } from '../services/list-users.use-case';
import { PaginationQueryDto } from '../../../shared/utils/pagination-query.dto';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { USER_REPOSITORY } from '../services/identity.di-tokens';
import type { UserRepository } from '../repositories/user.repository';

type UsersListResponse = {
  data: UserResponseDto[];
  meta: { page: number; limit: number; total: number };
};

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly assignRoleUseCase: AssignRoleUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly listUsersUseCase: ListUsersUseCase,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  @Post()
  @Roles('admin', 'super_admin')
  @AuditAction('identity.user.create')
  @ApiOperation({ summary: 'Create a user account' })
  @ApiResponse({ status: 201, type: UserResponseDto })
  async create(@Body() payload: CreateUserDto, @CurrentUser() currentUser: RequestUser): Promise<UserResponseDto> {
    const user = await this.createUserUseCase.execute(payload, currentUser.organizationId);
    return { id: user.id, username: user.username, phone: user.phone, roles: user.roleCodes };
  }

  @Get()
  @Roles('admin', 'super_admin', 'auditor')
  @ApiOperation({ summary: 'List users with pagination' })
  async list(@Query() query: PaginationQueryDto, @CurrentUser() currentUser: RequestUser): Promise<UsersListResponse> {
    const result = await this.listUsersUseCase.execute(query.offset, query.limit, currentUser.organizationId);

    return {
      data: result.items.map((item) => ({
        id: item.id,
        username: item.username,
        phone: item.phone,
        roles: item.roleCodes,
      })),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get(':id')
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getById(@Param('id') id: string, @CurrentUser() currentUser: RequestUser): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id, currentUser.organizationId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return { id: user.id, username: user.username, phone: user.phone, roles: user.roleCodes };
  }

  @Put(':id')
  @Roles('admin', 'super_admin')
  @AuditAction('identity.user.update')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async update(@Param('id') id: string, @Body() payload: UpdateUserDto, @CurrentUser() currentUser: RequestUser): Promise<UserResponseDto> {
    const user = await this.updateUserUseCase.execute(id, payload, currentUser.organizationId);
    return { id: user.id, username: user.username, phone: user.phone, roles: user.roleCodes };
  }

  @Delete(':id')
  @Roles('admin', 'super_admin')
  @AuditAction('identity.user.delete')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204 })
  async delete(@Param('id') id: string, @CurrentUser() currentUser: RequestUser): Promise<void> {
    await this.deleteUserUseCase.execute(id, currentUser.organizationId);
  }

  @Patch(':userId/roles')
  @Roles('admin', 'super_admin')
  @AuditAction('identity.user.assign_role')
  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async assignRole(@Param('userId') userId: string, @Body() payload: AssignRoleDto, @CurrentUser() currentUser: RequestUser): Promise<UserResponseDto> {
    const user = await this.assignRoleUseCase.execute(userId, payload, currentUser.organizationId);
    return { id: user.id, username: user.username, phone: user.phone, roles: user.roleCodes };
  }
}
