import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthResponseDto } from '../../identity/dto/auth-response.dto';
import { LoginDto } from '../../identity/dto/login.dto';
import { CreateUserUseCase } from '../../identity/services/create-user.use-case';
import { LoginUseCase } from '../../identity/services/login.use-case';
import { RegisterDto } from '../dto/website.dto';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';

@ApiTags('website-auth')
@Controller('website/auth')
export class WebsiteAuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new website user' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    await this.createUserUseCase.execute({
      username: dto.username,
      password: dto.password,
      phone: dto.phone,
      roleCodes: ['website_user'],
    }, DEFAULT_ORGANIZATION_ID);
    return this.loginUseCase.execute({ username: dto.username, password: dto.password });
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login for website users' })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    return this.loginUseCase.execute(dto);
  }
}
