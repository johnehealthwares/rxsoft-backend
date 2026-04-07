import { BadRequestException } from '@nestjs/common';
import { CreateUserUseCase } from '../create-user.use-case';
import type { UserRepository } from '../../repositories/user.repository';
import type { RoleRepository } from '../../repositories/role.repository';
import type { PasswordHasherPort } from '../password-hasher.port';

describe('CreateUserUseCase', () => {
  const userRepository: jest.Mocked<UserRepository> = {
    findByUsername: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
  };

  const roleRepository: jest.Mocked<RoleRepository> = {
    findByCode: jest.fn(),
    listByCodes: jest.fn(),
    listAll: jest.fn(),
  };

  const passwordHasher: jest.Mocked<PasswordHasherPort> = {
    hash: jest.fn(),
    verify: jest.fn(),
  };

  const useCase = new CreateUserUseCase(userRepository, passwordHasher, roleRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates user when username and roles are valid', async () => {
    userRepository.findByUsername.mockResolvedValue(null);
    roleRepository.listByCodes.mockResolvedValue([
      { id: 'r1', code: 'cashier', name: 'Cashier', permissionCodes: [] },
    ]);
    passwordHasher.hash.mockResolvedValue('hashed');
    userRepository.create.mockImplementation(async (user) => user);

    const result = await useCase.execute({
      username: 'cashier01',
      password: 'secret123',
      roleCodes: ['cashier'],
    }, 'org1');

    expect(result.username).toBe('cashier01');
    expect(result.organizationId).toBe('org1');
    expect(result.roleCodes).toEqual(['cashier']);
    expect(passwordHasher.hash).toHaveBeenCalledWith('secret123');
  });

  it('throws when username exists', async () => {
    userRepository.findByUsername.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'cashier01',
      passwordHash: 'x',
      isActive: true,
      roleCodes: ['cashier'],
    });

    await expect(
      useCase.execute({ username: 'cashier01', password: 'secret123', roleCodes: ['cashier'] }, 'org1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws when one or more roles are invalid', async () => {
    userRepository.findByUsername.mockResolvedValue(null);
    roleRepository.listByCodes.mockResolvedValue([{ id: 'r1', code: 'cashier', name: 'Cashier', permissionCodes: [] }]);

    await expect(
      useCase.execute({ username: 'x', password: 'secret123', roleCodes: ['cashier', 'admin'] }, 'org1'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
