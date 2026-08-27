import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string>; user?: unknown }>();

    // Allow internal service-to-service calls via API key
    const apiKey = request.headers['x-api-key'];
    const internalKey = this.configService.get<string>('INTERNAL_API_KEY');
    if (apiKey && internalKey && apiKey === internalKey) {
      request.user = { sub: 'system', organizationId: '', username: 'system', roles: ['super_admin'], permissions: [] };
      return true;
    }

    const authHeader = request.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }

    const token = authHeader.slice('Bearer '.length);

    try {
      request.user = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET', 'rxsoft-access-secret'),
      });

      return true;
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }
}
