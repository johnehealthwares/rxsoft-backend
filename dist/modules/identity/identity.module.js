"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const organisation_config_module_1 = require("../organisation-config/organisation-config.module");
const user_pos_config_module_1 = require("../user-pos-config/user-pos-config.module");
const identity_di_tokens_1 = require("./services/identity.di-tokens");
const assign_role_use_case_1 = require("./services/assign-role.use-case");
const create_user_use_case_1 = require("./services/create-user.use-case");
const update_user_use_case_1 = require("./services/update-user.use-case");
const delete_user_use_case_1 = require("./services/delete-user.use-case");
const list_users_use_case_1 = require("./services/list-users.use-case");
const login_use_case_1 = require("./services/login.use-case");
const refresh_token_use_case_1 = require("./services/refresh-token.use-case");
const create_role_use_case_1 = require("./services/create-role.use-case");
const list_roles_use_case_1 = require("./services/list-roles.use-case");
const get_role_use_case_1 = require("./services/get-role.use-case");
const update_role_use_case_1 = require("./services/update-role.use-case");
const delete_role_use_case_1 = require("./services/delete-role.use-case");
const me_use_case_1 = require("./services/me.use-case");
const in_memory_refresh_token_repository_1 = require("./repositories/in-memory-refresh-token.repository");
const in_memory_role_repository_1 = require("./repositories/in-memory-role.repository");
const in_memory_user_repository_1 = require("./repositories/in-memory-user.repository");
const typeorm_refresh_token_repository_1 = require("./repositories/typeorm-refresh-token.repository");
const typeorm_role_repository_1 = require("./repositories/typeorm-role.repository");
const typeorm_user_repository_1 = require("./repositories/typeorm-user.repository");
const jwt_token_issuer_service_1 = require("./services/jwt-token-issuer.service");
const sha256_password_hasher_service_1 = require("./services/sha256-password-hasher.service");
const auth_controller_1 = require("./controllers/auth.controller");
const users_controller_1 = require("./controllers/users.controller");
const roles_controller_1 = require("./controllers/roles.controller");
const permissions_controller_1 = require("./controllers/permissions.controller");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const entities_1 = require("./entities");
const identityConfigService = new config_1.ConfigService();
const useInMemoryRepos = identityConfigService.get('USE_IN_MEMORY_REPOS', 'false') === 'true';
const identityPersistenceImports = useInMemoryRepos
    ? []
    : [
        typeorm_1.TypeOrmModule.forFeature([
            entities_1.UserOrmEntity,
            entities_1.RoleOrmEntity,
            entities_1.PermissionOrmEntity,
            entities_1.RefreshTokenOrmEntity,
        ]),
    ];
const identityRepositoryProviders = useInMemoryRepos
    ? [
        in_memory_user_repository_1.InMemoryUserRepository,
        in_memory_role_repository_1.InMemoryRoleRepository,
        in_memory_refresh_token_repository_1.InMemoryRefreshTokenRepository,
        { provide: identity_di_tokens_1.USER_REPOSITORY, useExisting: in_memory_user_repository_1.InMemoryUserRepository },
        { provide: identity_di_tokens_1.ROLE_REPOSITORY, useExisting: in_memory_role_repository_1.InMemoryRoleRepository },
        { provide: identity_di_tokens_1.REFRESH_TOKEN_REPOSITORY, useExisting: in_memory_refresh_token_repository_1.InMemoryRefreshTokenRepository },
    ]
    : [
        typeorm_user_repository_1.TypeormUserRepository,
        typeorm_role_repository_1.TypeormRoleRepository,
        typeorm_refresh_token_repository_1.TypeormRefreshTokenRepository,
        { provide: identity_di_tokens_1.USER_REPOSITORY, useExisting: typeorm_user_repository_1.TypeormUserRepository },
        { provide: identity_di_tokens_1.ROLE_REPOSITORY, useExisting: typeorm_role_repository_1.TypeormRoleRepository },
        { provide: identity_di_tokens_1.REFRESH_TOKEN_REPOSITORY, useExisting: typeorm_refresh_token_repository_1.TypeormRefreshTokenRepository },
    ];
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), organisation_config_module_1.OrganisationConfigModule, user_pos_config_module_1.UserPosConfigModule, ...identityPersistenceImports],
        controllers: [auth_controller_1.AuthController, users_controller_1.UsersController, roles_controller_1.RolesController, permissions_controller_1.PermissionsController],
        exports: [create_user_use_case_1.CreateUserUseCase, login_use_case_1.LoginUseCase],
        providers: [
            login_use_case_1.LoginUseCase,
            refresh_token_use_case_1.RefreshTokenUseCase,
            create_user_use_case_1.CreateUserUseCase,
            update_user_use_case_1.UpdateUserUseCase,
            delete_user_use_case_1.DeleteUserUseCase,
            assign_role_use_case_1.AssignRoleUseCase,
            list_users_use_case_1.ListUsersUseCase,
            create_role_use_case_1.CreateRoleUseCase,
            list_roles_use_case_1.ListRolesUseCase,
            get_role_use_case_1.GetRoleUseCase,
            update_role_use_case_1.UpdateRoleUseCase,
            delete_role_use_case_1.DeleteRoleUseCase,
            me_use_case_1.MeUseCase,
            jwt_auth_guard_1.JwtAuthGuard,
            roles_guard_1.RolesGuard,
            ...identityRepositoryProviders,
            { provide: identity_di_tokens_1.PASSWORD_HASHER, useClass: sha256_password_hasher_service_1.Sha256PasswordHasherService },
            { provide: identity_di_tokens_1.TOKEN_ISSUER, useClass: jwt_token_issuer_service_1.JwtTokenIssuerService },
        ],
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map