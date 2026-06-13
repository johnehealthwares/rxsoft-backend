import { BadRequestException, NotFoundException } from '@nestjs/common';
import { AssignRoleUseCase } from '../assign-role.use-case';
import type { UserRepository } from '../../repositories/user.repository';
import type { RoleRepository } from '../../repositories/role.repository';

describe('AssignRoleUseCase', () => {
  const userRepository: jest.Mocked<UserRepository> = {
    findByUsername: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    list: jest.fn(),
  };

  const roleRepository: jest.Mocked<RoleRepository> = {
    findByCode: jest.fn(),
    listByCodes: jest.fn(),
    listAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
  };

  const useCase = new AssignRoleUseCase(userRepository, roleRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('assigns role when user and role exist', async () => {
    userRepository.findById.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'cashier01',
      passwordHash: 'h',
      isActive: true,
      roleCodes: ['cashier'],
    });
    roleRepository.findByCode.mockResolvedValue({
      id: 'r1',
      organizationId: 'org1',
      code: 'pharmacist',
      name: 'Pharmacist',
      description: null,
      permissionCodes: [],
    });
    userRepository.update.mockImplementation(async (user) => user);

    const result = await useCase.execute('u1', { roleCode: 'pharmacist' }, 'org1');

    expect(result.roleCodes).toEqual(['cashier', 'pharmacist']);
    expect(userRepository.update).toHaveBeenCalled();
    expect(roleRepository.findByCode).toHaveBeenCalledWith('pharmacist', 'org1');
  });

  it('does not re-assign duplicate role', async () => {
    userRepository.findById.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'cashier01',
      passwordHash: 'h',
      isActive: true,
      roleCodes: ['cashier'],
    });
    roleRepository.findByCode.mockResolvedValue({
      id: 'r1',
      organizationId: 'org1',
      code: 'cashier',
      name: 'Cashier',
      description: null,
      permissionCodes: [],
    });

    const result = await useCase.execute('u1', { roleCode: 'cashier' }, 'org1');

    expect(result.roleCodes).toEqual(['cashier']);
    expect(userRepository.update).not.toHaveBeenCalled();
  });

  it('throws when user does not exist', async () => {
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute('missing', { roleCode: 'cashier' }, 'org1')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('throws when role does not exist', async () => {
    userRepository.findById.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'x',
      passwordHash: 'h',
      isActive: true,
      roleCodes: [],
    });
    roleRepository.findByCode.mockResolvedValue(null);

    await expect(useCase.execute('u1', { roleCode: 'missing' }, 'org1')).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
