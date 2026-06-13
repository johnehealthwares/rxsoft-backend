import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { MeResponseDto } from '../dto/me-response.dto';
import { LoginUseCase } from '../services/login.use-case';
import { RefreshTokenUseCase } from '../services/refresh-token.use-case';
import { MeUseCase } from '../services/me.use-case';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
    private readonly meUseCase: MeUseCase,
  ) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @AuditAction('identity.auth.login')
  @ApiOperation({ summary: 'Authenticate and issue access/refresh tokens' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  login(@Body() payload: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(payload);
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  @AuditAction('identity.auth.refresh_token')
  @ApiOperation({ summary: 'Rotate refresh token and issue a new token pair' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  refreshToken(@Body() payload: RefreshTokenDto): Promise<AuthResponseDto> {
    return this.refreshTokenUseCase.execute(payload);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile with accessible modules' })
  @ApiResponse({ status: 200, type: MeResponseDto })
  me(@CurrentUser() currentUser: RequestUser): Promise<MeResponseDto> {
    return this.meUseCase.execute(currentUser.sub, currentUser.organizationId);
  }
}
