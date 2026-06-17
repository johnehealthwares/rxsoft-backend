import { RefreshTokenDto } from '../dto/refresh-token.dto';
import type { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { TokenIssuerPort } from './token-issuer.port';
import type { UserRepository } from '../repositories/user.repository';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
export declare class RefreshTokenUseCase {
    private readonly refreshTokenRepository;
    private readonly passwordHasher;
    private readonly tokenIssuer;
    private readonly userRepository;
    private readonly userPosConfigService;
    private readonly orgConfigService;
    constructor(refreshTokenRepository: RefreshTokenRepository, passwordHasher: PasswordHasherPort, tokenIssuer: TokenIssuerPort, userRepository: UserRepository, userPosConfigService: UserPosConfigService, orgConfigService: OrganisationConfigService);
    execute(payload: RefreshTokenDto): Promise<Awaited<ReturnType<TokenIssuerPort['issuePair']>>>;
}
