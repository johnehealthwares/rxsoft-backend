import { CreateUserDto } from '../dto/create-user.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { RoleRepository } from '../repositories/role.repository';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
export declare class CreateUserUseCase {
    private readonly userRepository;
    private readonly passwordHasher;
    private readonly roleRepository;
    private readonly userPosConfigService;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasherPort, roleRepository: RoleRepository, userPosConfigService: UserPosConfigService);
    execute(payload: CreateUserDto, organizationId: string): Promise<Awaited<ReturnType<UserRepository['create']>>>;
}
