export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export interface TokenPayload {
  sub: string;
  organizationId: string;
  username: string;
  roles: string[];
  permissions: string[];
}

export interface TokenIssuerPort {
  issuePair(payload: TokenPayload): Promise<TokenPair>;
  verifyRefreshToken(token: string): Promise<TokenPayload>;
}
