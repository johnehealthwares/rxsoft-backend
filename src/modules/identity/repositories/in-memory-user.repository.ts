import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from '../domains/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private readonly users = new Map<string, User>();

  constructor() {
    const bootstrapUser = new User(
      '8aa36d1b-0f1f-4f30-93ff-e2e18fce4ac0',
      'org1',
      'admin',
      '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      true,
      ['super_admin'],
      undefined,
    );

    this.users.set(bootstrapUser.id, bootstrapUser);
  }

  async findByUsername(username: string, organizationId?: string): Promise<User | null> {
    const user = [...this.users.values()].find(
      (item) => item.username === username && (!organizationId || item.organizationId === organizationId),
    );
    return user ?? null;
  }

  async findById(id: string, organizationId?: string): Promise<User | null> {
    const user = this.users.get(id) ?? null;
    if (!user || (organizationId && user.organizationId !== organizationId)) {
      return null;
    }
    return user;
  }

  async create(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(user: User, organizationId?: string): Promise<User> {
    if (organizationId && user.organizationId !== organizationId) {
      throw new Error('User organization mismatch');
    }
    this.users.set(user.id, user);
    return user;
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const user = this.users.get(id);
    if (user && user.organizationId === organizationId) {
      this.users.delete(id);
    }
  }

  async list(offset: number, limit: number, organizationId: string): Promise<{ items: User[]; total: number }> {
    const items = [...this.users.values()].filter((item) => item.organizationId === organizationId);
    return {
      items: items.slice(offset, offset + limit),
      total: items.length,
    };
  }
}
