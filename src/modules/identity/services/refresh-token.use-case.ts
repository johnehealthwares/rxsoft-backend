import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import type { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { TokenIssuerPort } from './token-issuer.port';
import type { UserRepository } from '../repositories/user.repository';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
import {
  PASSWORD_HASHER,
  REFRESH_TOKEN_REPOSITORY,
  TOKEN_ISSUER,
  USER_REPOSITORY,
} from './identity.di-tokens';

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: RefreshTokenRepository,
    @Inject(PASSWORD_HASHER)
    private readonly passwordHasher: PasswordHasherPort,
    @Inject(TOKEN_ISSUER)
    private readonly tokenIssuer: TokenIssuerPort,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
    private readonly userPosConfigService: UserPosConfigService,
    private readonly orgConfigService: OrganisationConfigService,
  ) {}

  async execute(payload: RefreshTokenDto): Promise<Awaited<ReturnType<TokenIssuerPort['issuePair']>>> {
    const decoded = await this.tokenIssuer.verifyRefreshToken(payload.refreshToken);

    const user = await this.userRepository.findById(decoded.sub);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const tokenHash = await this.passwordHasher.hash(payload.refreshToken);
    const isValid = await this.refreshTokenRepository.isValid(user.id, tokenHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.refreshTokenRepository.revoke(user.id, tokenHash);

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

    return this.tokenIssuer.issuePair({
      sub: decoded.sub,
      organizationId: user.organizationId,
      username: decoded.username,
      roles: decoded.roles,
      permissions: decoded.permissions,
    }, loginTimeoutMinutes);
  }
}
