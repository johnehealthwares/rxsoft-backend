import { UnauthorizedException } from '@nestjs/common';
import { LoginUseCase } from '../login.use-case';
import type { UserRepository } from '../../repositories/user.repository';
import type { RoleRepository } from '../../repositories/role.repository';
import type { PasswordHasherPort } from '../password-hasher.port';
import type { TokenIssuerPort } from '../token-issuer.port';
import type { RefreshTokenRepository } from '../../repositories/refresh-token.repository';

describe('LoginUseCase', () => {
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

  const passwordHasher: jest.Mocked<PasswordHasherPort> = {
    hash: jest.fn(),
    verify: jest.fn(),
  };

  const tokenIssuer: jest.Mocked<TokenIssuerPort> = {
    issuePair: jest.fn(),
    verifyRefreshToken: jest.fn(),
  };

  const refreshTokenRepository: jest.Mocked<RefreshTokenRepository> = {
    persist: jest.fn(),
    isValid: jest.fn(),
    revoke: jest.fn(),
  };

  const useCase = new LoginUseCase(
    userRepository,
    roleRepository,
    passwordHasher,
    tokenIssuer,
    refreshTokenRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns token pair for valid credentials', async () => {
    userRepository.findByUsername.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'admin',
      passwordHash: 'hashed',
      isActive: true,
      roleCodes: ['admin'],
    });
    passwordHasher.verify.mockResolvedValue(true);
    roleRepository.listByCodes.mockResolvedValue([
      { id: 'r1', organizationId: 'org1', code: 'admin', name: 'Admin', description: null, permissionCodes: ['users.read'] },
    ]);
    tokenIssuer.issuePair.mockResolvedValue({
      accessToken: 'a',
      refreshToken: 'r',
      accessTokenExpiresIn: 900,
      refreshTokenExpiresIn: 604800,
    });
    passwordHasher.hash.mockResolvedValue('refresh-hash');

    const result = await useCase.execute({ username: 'admin', password: 'secret123' });

    expect(result.accessToken).toBe('a');
    expect(tokenIssuer.issuePair).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'org1' }),
    );
    expect(refreshTokenRepository.persist).toHaveBeenCalled();
  });

  it('throws on invalid password', async () => {
    userRepository.findByUsername.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'admin',
      passwordHash: 'hashed',
      isActive: true,
      roleCodes: ['admin'],
    });
    passwordHasher.verify.mockResolvedValue(false);

    await expect(useCase.execute({ username: 'admin', password: 'wrong' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('throws when user is not found', async () => {
    userRepository.findByUsername.mockResolvedValue(null);

    await expect(useCase.execute({ username: 'missing', password: 'x' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
