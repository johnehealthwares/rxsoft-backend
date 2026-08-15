import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersProxyService } from '../../../modules/users-proxy/users-proxy.service';
import { RegisterDto } from '../dto/website.dto';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';

@ApiTags('website-auth')
@Controller('website/auth')
export class WebsiteAuthController {
  constructor(
    private readonly usersProxy: UsersProxyService,
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepo: Repository<PartyOrmEntity>,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new website user' })
  @ApiResponse({ status: 201 })
  async register(@Body() dto: RegisterDto) {
    const authResult = await this.usersProxy.register({
      username: dto.username,
      password: dto.password,
      phone: dto.phone,
      email: dto.email,
    });

    const currentUser = await this.usersProxy.me(authResult.accessToken);

    const existingParty = await this.partyRepo.findOne({ where: { userId: currentUser.sub } });
    if (!existingParty) {
      await this.partyRepo.save(
        this.partyRepo.create({
          organizationId: currentUser.organizationId,
          partyType: 'customer',
          name: dto.username,
          phone: dto.phone ?? null,
          email: dto.email ?? null,
          userId: currentUser.sub,
        }),
      );
    }

    return authResult;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login for website users' })
  @ApiResponse({ status: 200 })
  async login(@Body() body: { username: string; password: string }) {
    return this.usersProxy.login(body.username, body.password);
  }
}
