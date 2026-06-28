import { Repository } from 'typeorm';
import { AuthResponseDto } from '../../identity/dto/auth-response.dto';
import { LoginDto } from '../../identity/dto/login.dto';
import { CreateUserUseCase } from '../../identity/services/create-user.use-case';
import { LoginUseCase } from '../../identity/services/login.use-case';
import { RegisterDto } from '../dto/website.dto';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';
export declare class WebsiteAuthController {
    private readonly createUserUseCase;
    private readonly loginUseCase;
    private readonly partyRepo;
    constructor(createUserUseCase: CreateUserUseCase, loginUseCase: LoginUseCase, partyRepo: Repository<PartyOrmEntity>);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
}
