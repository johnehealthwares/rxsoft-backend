import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from '../domains/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { RoleOrmEntity } from '../entities/role.orm-entity';
export declare class TypeormUserRepository implements UserRepository {
    private readonly userRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<UserOrmEntity>, roleRepository: Repository<RoleOrmEntity>);
    findByUsername(username: string, organizationId?: string): Promise<User | null>;
    findById(id: string, organizationId?: string): Promise<User | null>;
    create(user: User): Promise<User>;
    update(user: User, organizationId?: string): Promise<User>;
    delete(id: string, organizationId: string): Promise<void>;
    list(offset: number, limit: number, organizationId: string): Promise<{
        items: User[];
        total: number;
    }>;
}
