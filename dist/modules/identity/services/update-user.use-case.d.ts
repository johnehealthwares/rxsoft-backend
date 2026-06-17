import { UpdateUserDto } from '../dto/update-user.dto';
import type { UserRepository } from '../repositories/user.repository';
import type { PasswordHasherPort } from './password-hasher.port';
import type { RoleRepository } from '../repositories/role.repository';
import { User } from '../domains/user.entity';
import { UserPosConfigService } from '../../user-pos-config/services/user-pos-config.service';
export declare class UpdateUserUseCase {
    private readonly userRepository;
    private readonly passwordHasher;
    private readonly roleRepository;
    private readonly userPosConfigService;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasherPort, roleRepository: RoleRepository, userPosConfigService: UserPosConfigService);
    execute(userId: string, payload: UpdateUserDto, organizationId: string): Promise<User>;
}
