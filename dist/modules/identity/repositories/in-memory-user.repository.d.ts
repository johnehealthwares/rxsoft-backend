import { UserRepository } from './user.repository';
import { User } from '../domains/user.entity';
export declare class InMemoryUserRepository implements UserRepository {
    private readonly users;
    constructor();
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
