import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { MeResponseDto } from '../dto/me-response.dto';
import { LoginUseCase } from '../services/login.use-case';
import { RefreshTokenUseCase } from '../services/refresh-token.use-case';
import { MeUseCase } from '../services/me.use-case';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
export declare class AuthController {
    private readonly loginUseCase;
    private readonly refreshTokenUseCase;
    private readonly meUseCase;
    constructor(loginUseCase: LoginUseCase, refreshTokenUseCase: RefreshTokenUseCase, meUseCase: MeUseCase);
    login(payload: LoginDto): Promise<AuthResponseDto>;
    refreshToken(payload: RefreshTokenDto): Promise<AuthResponseDto>;
    me(currentUser: RequestUser): Promise<MeResponseDto>;
}
