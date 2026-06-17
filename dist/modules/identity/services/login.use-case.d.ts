import { LoginDto } from '../dto/login.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { RoleRepository } from '../repositories/role.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { TokenIssuerPort } from './token-issuer.port';
import type { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
import { OrganisationConfigService } from '../../organisation-config/services/organisation-config.service';
export declare class LoginUseCase {
    private readonly userRepository;
    private readonly roleRepository;
    private readonly passwordHasher;
    private readonly tokenIssuer;
    private readonly refreshTokenRepository;
    private readonly userPosConfigService;
    private readonly orgConfigService;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository, passwordHasher: PasswordHasherPort, tokenIssuer: TokenIssuerPort, refreshTokenRepository: RefreshTokenRepository, userPosConfigService: UserPosConfigService, orgConfigService: OrganisationConfigService);
    execute(payload: LoginDto): Promise<Awaited<ReturnType<TokenIssuerPort['issuePair']>>>;
}
