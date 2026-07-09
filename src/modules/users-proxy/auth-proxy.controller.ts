import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersProxyService } from './users-proxy.service';

@ApiTags('auth-proxy')
@Controller('auth')
export class AuthProxyController {
  constructor(private readonly proxy: UsersProxyService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login (proxied to rxsoft-identity)' })
  async login(@Body() body: { username: string; password: string }) {
    return this.proxy.login(body.username, body.password);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh token (proxied to rxsoft-identity)' })
  async refreshToken(@Body() body: { refreshToken: string }) {
    return this.proxy.refreshToken(body.refreshToken);
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user (proxied to rxsoft-identity)' })
  async me(@Headers('authorization') auth: string) {
    return this.proxy.me(auth?.replace('Bearer ', '') ?? '');
  }
}
