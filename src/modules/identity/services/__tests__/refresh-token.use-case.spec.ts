import { UnauthorizedException } from '@nestjs/common';
import { RefreshTokenUseCase } from '../refresh-token.use-case';
import type { RefreshTokenRepository } from '../../repositories/refresh-token.repository';
import type { PasswordHasherPort } from '../password-hasher.port';
import type { TokenIssuerPort } from '../token-issuer.port';
import type { UserRepository } from '../../repositories/user.repository';

describe('RefreshTokenUseCase', () => {
  const refreshTokenRepository: jest.Mocked<RefreshTokenRepository> = {
    persist: jest.fn(),
    isValid: jest.fn(),
    revoke: jest.fn(),
  };

  const passwordHasher: jest.Mocked<PasswordHasherPort> = {
    hash: jest.fn(),
    verify: jest.fn(),
  };

  const tokenIssuer: jest.Mocked<TokenIssuerPort> = {
    issuePair: jest.fn(),
    verifyRefreshToken: jest.fn(),
  };

  const userRepository: jest.Mocked<UserRepository> = {
    findByUsername: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    list: jest.fn(),
  };

  const useCase = new RefreshTokenUseCase(
    refreshTokenRepository,
    passwordHasher,
    tokenIssuer,
    userRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('rotates token pair for valid refresh token', async () => {
    tokenIssuer.verifyRefreshToken.mockResolvedValue({
      sub: 'u1',
      organizationId: 'org1',
      username: 'admin',
      roles: ['admin'],
      permissions: ['users.read'],
    });
    userRepository.findById.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'admin',
      passwordHash: 'h',
      isActive: true,
      roleCodes: ['admin'],
    });
    passwordHasher.hash.mockResolvedValue('token-hash');
    refreshTokenRepository.isValid.mockResolvedValue(true);
    tokenIssuer.issuePair.mockResolvedValue({
      accessToken: 'new-access',
      refreshToken: 'new-refresh',
      accessTokenExpiresIn: 900,
      refreshTokenExpiresIn: 604800,
    });

    const result = await useCase.execute({ refreshToken: 'old-refresh' });

    expect(result.accessToken).toBe('new-access');
    expect(tokenIssuer.issuePair).toHaveBeenCalledWith(
      expect.objectContaining({ organizationId: 'org1' }),
    );
    expect(refreshTokenRepository.revoke).toHaveBeenCalledWith('u1', 'token-hash');
  });

  it('throws when user is missing', async () => {
    tokenIssuer.verifyRefreshToken.mockResolvedValue({
      sub: 'u1',
      organizationId: 'org1',
      username: 'admin',
      roles: ['admin'],
      permissions: [],
    });
    userRepository.findById.mockResolvedValue(null);

    await expect(useCase.execute({ refreshToken: 'x' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('throws when token hash is invalid', async () => {
    tokenIssuer.verifyRefreshToken.mockResolvedValue({
      sub: 'u1',
      organizationId: 'org1',
      username: 'admin',
      roles: ['admin'],
      permissions: [],
    });
    userRepository.findById.mockResolvedValue({
      id: 'u1',
      organizationId: 'org1',
      username: 'admin',
      passwordHash: 'h',
      isActive: true,
      roleCodes: ['admin'],
    });
    passwordHasher.hash.mockResolvedValue('token-hash');
    refreshTokenRepository.isValid.mockResolvedValue(false);

    await expect(useCase.execute({ refreshToken: 'x' })).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
