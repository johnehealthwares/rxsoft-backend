import type { UserRepository } from '../repositories/user.repository';
import type { RoleRepository } from '../repositories/role.repository';
import type { MeResponseDto } from '../dto/me-response.dto';
export declare class MeUseCase {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository);
    execute(userId: string, organizationId: string): Promise<MeResponseDto>;
}
