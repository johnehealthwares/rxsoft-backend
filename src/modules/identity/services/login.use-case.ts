import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { RoleRepository } from '../repositories/role.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { TokenIssuerPort } from './token-issuer.port';
import type { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
import {
  PASSWORD_HASHER,
  REFRESH_TOKEN_REPOSITORY,
  ROLE_REPOSITORY,
  TOKEN_ISSUER,
  USER_REPOSITORY,
} from './identity.di-tokens';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: RoleRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasherPort,
    @Inject(TOKEN_ISSUER)
    private readonly tokenIssuer: TokenIssuerPort,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    private readonly userPosConfigService: UserPosConfigService,
    private readonly orgConfigService: OrganisationConfigService,
  ) {}

  async execute(payload: LoginDto): Promise<Awaited<ReturnType<TokenIssuerPort['issuePair']>>> {
    const user = await this.userRepository.findByUsername(payload.username);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.passwordHasher.verify(payload.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const roles = await this.roleRepository.listByCodes(user.roleCodes, user.organizationId);
    const permissions = [...new Set(roles.flatMap((role) => role.permissionCodes))];

    // Resolve login timeout: user config → org config → 15 min fallback
    let loginTimeoutMinutes: number | undefined;
    try {
      const userConfig = await this.userPosConfigService.getOrCreate(user.id, user.organizationId);
      loginTimeoutMinutes = userConfig.loginTimeoutMinutes ?? undefined;
    } catch {
      // ignore
    }
    if (!loginTimeoutMinutes) {
      try {
        const orgConfig = await this.orgConfigService.getOrCreate(user.organizationId);
        loginTimeoutMinutes = orgConfig.defaultLoginTimeoutMinutes;
      } catch {
        // ignore
      }
    }

    const tokenPair = await this.tokenIssuer.issuePair({
      sub: user.id,
      organizationId: user.organizationId,
      username: user.username,
      roles: user.roleCodes,
      permissions,
      phone: user.phone,
    }, loginTimeoutMinutes);

    const refreshTokenHash = await this.passwordHasher.hash(tokenPair.refreshToken);
    await this.refreshTokenRepository.persist(
      user.id,
      refreshTokenHash,
      new Date(Date.now() + tokenPair.refreshTokenExpiresIn * 1000),
    );

    return tokenPair;
  }
}
