import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserRepository } from './user.repository';
import { User } from '../domains/user.entity';
import { UserOrmEntity } from '../entities/user.orm-entity';
import { RoleOrmEntity } from '../entities/role.orm-entity';
import { IdentityMapper } from '../mappers/identity.mapper';

@Injectable()
export class TypeormUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
    @InjectRepository(RoleOrmEntity)
    private readonly roleRepository: Repository<RoleOrmEntity>,
  ) {}

  async findByUsername(username: string, organizationId?: string): Promise<User | null> {
    const item = await this.userRepository.findOne({
      where: organizationId ? { username, organizationId } : { username },
      relations: { roles: true },
    });

    return item ? IdentityMapper.toDomainUser(item) : null;
  }

  async findById(id: string, organizationId?: string): Promise<User | null> {
    const item = await this.userRepository.findOne({
      where: organizationId ? { id, organizationId } : { id },
      relations: { roles: true },
    });

    return item ? IdentityMapper.toDomainUser(item) : null;
  }

  async create(user: User): Promise<User> {
    const roles = user.roleCodes.length
      ? await this.roleRepository.find({
          where: user.roleCodes.map((code) => ({ code, organizationId: user.organizationId })),
        })
      : [];

    const entity = this.userRepository.create({
      id: user.id,
      organizationId: user.organizationId,
      username: user.username,
      passwordHash: user.passwordHash,
      isActive: user.isActive,
      phone: user.phone,
      roles,
    });

    const saved = await this.userRepository.save(entity);
    const reloaded = await this.userRepository.findOneOrFail({
      where: { id: saved.id },
      relations: { roles: true },
    });

    return IdentityMapper.toDomainUser(reloaded);
  }

  async update(user: User, organizationId?: string): Promise<User> {
    const existing = await this.userRepository.findOneOrFail({
      where: organizationId ? { id: user.id, organizationId } : { id: user.id },
      relations: { roles: true },
    });

    const roles = user.roleCodes.length
      ? await this.roleRepository.find({
          where: user.roleCodes.map((code) => ({ code, organizationId: user.organizationId })),
        })
      : [];

    existing.passwordHash = user.passwordHash;
    existing.isActive = user.isActive;
    existing.phone = user.phone;
    existing.roles = roles;

    const saved = await this.userRepository.save(existing);
    const reloaded = await this.userRepository.findOneOrFail({
      where: { id: saved.id },
      relations: { roles: true },
    });

    return IdentityMapper.toDomainUser(reloaded);
  }

  async delete(id: string, organizationId: string): Promise<void> {
    const existing = await this.userRepository.findOne({
      where: { id, organizationId },
    });
    if (existing) {
      await this.userRepository.remove(existing);
    }
  }

  async list(offset: number, limit: number, organizationId: string): Promise<{ items: User[]; total: number }> {
    const [items, total] = await this.userRepository.findAndCount({
      relations: { roles: true },
      where: { organizationId },
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      items: items.map(IdentityMapper.toDomainUser.bind(IdentityMapper)),
      total,
    };
  }
}
