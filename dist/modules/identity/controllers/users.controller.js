"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const assign_role_dto_1 = require("../dto/assign-role.dto");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const user_response_dto_1 = require("../dto/user-response.dto");
const assign_role_use_case_1 = require("../services/assign-role.use-case");
const create_user_use_case_1 = require("../services/create-user.use-case");
const update_user_use_case_1 = require("../services/update-user.use-case");
const delete_user_use_case_1 = require("../services/delete-user.use-case");
const list_users_use_case_1 = require("../services/list-users.use-case");
const pagination_query_dto_1 = require("../../../shared/utils/pagination-query.dto");
const current_user_decorator_1 = require("../../../common/decorators/current-user.decorator");
const roles_decorator_1 = require("../../../common/decorators/roles.decorator");
const jwt_auth_guard_1 = require("../../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../../common/guards/roles.guard");
const audit_action_decorator_1 = require("../../../common/decorators/audit-action.decorator");
const user_pos_config_service_1 = require("../../user-pos-config/services/user-pos-config.service");
const identity_di_tokens_1 = require("../services/identity.di-tokens");
let UsersController = class UsersController {
    createUserUseCase;
    assignRoleUseCase;
    updateUserUseCase;
    deleteUserUseCase;
    listUsersUseCase;
    userPosConfigService;
    userRepository;
    constructor(createUserUseCase, assignRoleUseCase, updateUserUseCase, deleteUserUseCase, listUsersUseCase, userPosConfigService, userRepository) {
        this.createUserUseCase = createUserUseCase;
        this.assignRoleUseCase = assignRoleUseCase;
        this.updateUserUseCase = updateUserUseCase;
        this.deleteUserUseCase = deleteUserUseCase;
        this.listUsersUseCase = listUsersUseCase;
        this.userPosConfigService = userPosConfigService;
        this.userRepository = userRepository;
    }
    async create(payload, currentUser) {
        const user = await this.createUserUseCase.execute(payload, currentUser.organizationId);
        const posConfig = await this.userPosConfigService.getOrCreate(user.id, currentUser.organizationId);
        return { id: user.id, username: user.username, phone: user.phone, roles: user.roles, posConfig };
    }
    async list(query, currentUser) {
        const result = await this.listUsersUseCase.execute(query.offset, query.limit, currentUser.organizationId);
        const data = await Promise.all(result.items.map(async (item) => {
            const posConfig = await this.userPosConfigService.getOrCreate(item.id, currentUser.organizationId);
            return { id: item.id, username: item.username, phone: item.phone, roles: item.roles, posConfig };
        }));
        return {
            data,
            meta: {
                page: query.page,
                limit: query.limit,
                total: result.total,
            },
        };
    }
    async getById(id, currentUser) {
        const user = await this.userRepository.findById(id, currentUser.organizationId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const posConfig = await this.userPosConfigService.getOrCreate(user.id, currentUser.organizationId);
        return { id: user.id, username: user.username, phone: user.phone, roles: user.roles, posConfig };
    }
    async update(id, payload, currentUser) {
        const user = await this.updateUserUseCase.execute(id, payload, currentUser.organizationId);
        const posConfig = await this.userPosConfigService.getOrCreate(user.id, currentUser.organizationId);
        return { id: user.id, username: user.username, phone: user.phone, roles: user.roles, posConfig };
    }
    async delete(id, currentUser) {
        await this.deleteUserUseCase.execute(id, currentUser.organizationId);
    }
    async assignRole(userId, payload, currentUser) {
        const user = await this.assignRoleUseCase.execute(userId, payload, currentUser.organizationId);
        return { id: user.id, username: user.username, phone: user.phone, roles: user.roles };
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('identity.user.create'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a user account' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'super_admin', 'auditor'),
    (0, swagger_1.ApiOperation)({ summary: 'List users with pagination' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('identity.user.update'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('identity.user.delete'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a user' }),
    (0, swagger_1.ApiResponse)({ status: 204 }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)(':userId/roles'),
    (0, roles_decorator_1.Roles)('admin', 'super_admin'),
    (0, audit_action_decorator_1.AuditAction)('identity.user.assign_role'),
    (0, swagger_1.ApiOperation)({ summary: 'Assign role to user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_response_dto_1.UserResponseDto }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_role_dto_1.AssignRoleDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "assignRole", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('users'),
    __param(6, (0, common_1.Inject)(identity_di_tokens_1.USER_REPOSITORY)),
    __metadata("design:paramtypes", [create_user_use_case_1.CreateUserUseCase,
        assign_role_use_case_1.AssignRoleUseCase,
        update_user_use_case_1.UpdateUserUseCase,
        delete_user_use_case_1.DeleteUserUseCase,
        list_users_use_case_1.ListUsersUseCase,
        user_pos_config_service_1.UserPosConfigService, Object])
], UsersController);
//# sourceMappingURL=users.controller.js.map