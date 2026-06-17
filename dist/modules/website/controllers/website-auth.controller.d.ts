import { AuthResponseDto } from '../../identity/dto/auth-response.dto';
import { LoginDto } from '../../identity/dto/login.dto';
import { CreateUserUseCase } from '../../identity/services/create-user.use-case';
import { LoginUseCase } from '../../identity/services/login.use-case';
import { RegisterDto } from '../dto/website.dto';
export declare class WebsiteAuthController {
    private readonly createUserUseCase;
    private readonly loginUseCase;
    constructor(createUserUseCase: CreateUserUseCase, loginUseCase: LoginUseCase);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
}
