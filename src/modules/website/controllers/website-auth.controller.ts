import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthResponseDto } from '../../identity/dto/auth-response.dto';
import { LoginDto } from '../../identity/dto/login.dto';
import { CreateUserUseCase } from '../../identity/services/create-user.use-case';
import { LoginUseCase } from '../../identity/services/login.use-case';
import { RegisterDto } from '../dto/website.dto';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';
import { DEFAULT_ORGANIZATION_ID } from '../../../shared/constants/persistence-scope';

@ApiTags('website-auth')
@Controller('website/auth')
export class WebsiteAuthController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepo: Repository<PartyOrmEntity>,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new website user' })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    const createdUser = await this.createUserUseCase.execute({
      username: dto.username,
      password: dto.password,
      phone: dto.phone,
      roleCodes: ['website_user'],
    }, DEFAULT_ORGANIZATION_ID);

    const existingParty = await this.partyRepo.findOne({ where: { userId: createdUser.id } });
    if (!existingParty) {
      await this.partyRepo.save(
        this.partyRepo.create({
          organizationId: DEFAULT_ORGANIZATION_ID,
          partyType: 'customer',
          name: dto.username,
          phone: dto.phone ?? null,
          email: dto.email ?? null,
          userId: createdUser.id,
        }),
      );
    }

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
