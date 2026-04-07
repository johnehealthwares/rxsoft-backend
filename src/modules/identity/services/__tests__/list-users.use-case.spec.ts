import { ListUsersUseCase } from '../list-users.use-case';
import type { UserRepository } from '../../repositories/user.repository';

describe('ListUsersUseCase', () => {
  const userRepository: jest.Mocked<UserRepository> = {
    findByUsername: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
  };

  const useCase = new ListUsersUseCase(userRepository);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns paginated users from repository', async () => {
    userRepository.list.mockResolvedValue({
      items: [
        {
          id: 'u1',
          organizationId: 'org1',
          username: 'admin',
          passwordHash: 'h',
          isActive: true,
          roleCodes: ['admin'],
        },
      ],
      total: 1,
    });

    const result = await useCase.execute(0, 20, 'org1');

    expect(userRepository.list).toHaveBeenCalledWith(0, 20, 'org1');
    expect(result.total).toBe(1);
    expect(result.items[0]?.username).toBe('admin');
  });
});
