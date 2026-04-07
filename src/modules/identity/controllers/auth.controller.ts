import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { LoginDto } from '../dto/login.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { LoginUseCase } from '../services/login.use-case';
import { RefreshTokenUseCase } from '../services/refresh-token.use-case';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
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
}
