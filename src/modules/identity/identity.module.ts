import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganisationConfigModule } from '../organisation-config/organisation-config.module';
import { UserPosConfigModule } from '../user-pos-config/user-pos-config.module';
import {
  PASSWORD_HASHER,
  REFRESH_TOKEN_REPOSITORY,
  ROLE_REPOSITORY,
  TOKEN_ISSUER,
  USER_REPOSITORY,
} from './services/identity.di-tokens';
import { AssignRoleUseCase } from './services/assign-role.use-case';
import { CreateUserUseCase } from './services/create-user.use-case';
import { UpdateUserUseCase } from './services/update-user.use-case';
import { DeleteUserUseCase } from './services/delete-user.use-case';
import { ListUsersUseCase } from './services/list-users.use-case';
import { LoginUseCase } from './services/login.use-case';
import { RefreshTokenUseCase } from './services/refresh-token.use-case';
import { CreateRoleUseCase } from './services/create-role.use-case';
import { ListRolesUseCase } from './services/list-roles.use-case';
import { GetRoleUseCase } from './services/get-role.use-case';
import { UpdateRoleUseCase } from './services/update-role.use-case';
import { DeleteRoleUseCase } from './services/delete-role.use-case';
import { MeUseCase } from './services/me.use-case';
import { InMemoryRefreshTokenRepository } from './repositories/in-memory-refresh-token.repository';
import { InMemoryRoleRepository } from './repositories/in-memory-role.repository';
import { InMemoryUserRepository } from './repositories/in-memory-user.repository';
import { TypeormRefreshTokenRepository } from './repositories/typeorm-refresh-token.repository';
import { TypeormRoleRepository } from './repositories/typeorm-role.repository';
import { TypeormUserRepository } from './repositories/typeorm-user.repository';
import { JwtTokenIssuerService } from './services/jwt-token-issuer.service';
import { Sha256PasswordHasherService } from './services/sha256-password-hasher.service';
import { AuthController } from './controllers/auth.controller';
import { UsersController } from './controllers/users.controller';
import { RolesController } from './controllers/roles.controller';
import { PermissionsController } from './controllers/permissions.controller';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PermissionOrmEntity, RefreshTokenOrmEntity, RoleOrmEntity, UserOrmEntity } from './entities';

const identityConfigService = new ConfigService();
const useInMemoryRepos = identityConfigService.get<string>('USE_IN_MEMORY_REPOS', 'false') === 'true';
const identityPersistenceImports = useInMemoryRepos
  ? []
  : [
      TypeOrmModule.forFeature([
        UserOrmEntity,
        RoleOrmEntity,
        PermissionOrmEntity,
        RefreshTokenOrmEntity,
      ]),
    ];

const identityRepositoryProviders = useInMemoryRepos
  ? [
      InMemoryUserRepository,
      InMemoryRoleRepository,
      InMemoryRefreshTokenRepository,
      { provide: USER_REPOSITORY, useExisting: InMemoryUserRepository },
      { provide: ROLE_REPOSITORY, useExisting: InMemoryRoleRepository },
      { provide: REFRESH_TOKEN_REPOSITORY, useExisting: InMemoryRefreshTokenRepository },
    ]
  : [
      TypeormUserRepository,
      TypeormRoleRepository,
      TypeormRefreshTokenRepository,
      { provide: USER_REPOSITORY, useExisting: TypeormUserRepository },
      { provide: ROLE_REPOSITORY, useExisting: TypeormRoleRepository },
      { provide: REFRESH_TOKEN_REPOSITORY, useExisting: TypeormRefreshTokenRepository },
    ];

@Module({
  imports: [JwtModule.register({}), OrganisationConfigModule, UserPosConfigModule, ...identityPersistenceImports],
  controllers: [AuthController, UsersController, RolesController, PermissionsController],
  exports: [CreateUserUseCase, LoginUseCase],
  providers: [
    LoginUseCase,
    RefreshTokenUseCase,
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    AssignRoleUseCase,
    ListUsersUseCase,
    CreateRoleUseCase,
    ListRolesUseCase,
    GetRoleUseCase,
    UpdateRoleUseCase,
    DeleteRoleUseCase,
    MeUseCase,
    JwtAuthGuard,
    RolesGuard,
    ...identityRepositoryProviders,
    { provide: PASSWORD_HASHER, useClass: Sha256PasswordHasherService },
    { provide: TOKEN_ISSUER, useClass: JwtTokenIssuerService },
  ],
})
export class IdentityModule {}
