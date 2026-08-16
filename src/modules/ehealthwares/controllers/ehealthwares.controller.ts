import { Body, Controller, Get, Headers, Param, Post, UnauthorizedException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { EhealthwaresService } from '../services/ehealthwares.service';
import { CreateContactDto } from '../dto/ehealthwares.dto';

@ApiTags('ehealthwares')
@Controller('ehealthwares')
export class EhealthwaresController {
  constructor(
    private readonly ehealthwaresService: EhealthwaresService,
    private readonly config: ConfigService,
  ) {}

  @Get('sections')
  @ApiOperation({ summary: 'Get all active site sections' })
  getSections() {
    return this.ehealthwaresService.getSections();
  }

  @Get('products')
  @ApiOperation({ summary: 'Get all active products' })
  getProducts() {
    return this.ehealthwaresService.getProducts();
  }

  @Get('products/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  getProductBySlug(@Param('slug') slug: string) {
    return this.ehealthwaresService.getProductBySlug(slug);
  }

  @Get('services')
  @ApiOperation({ summary: 'Get all active services' })
  getServices() {
    return this.ehealthwaresService.getServices();
  }

  @Get('services/:slug')
  @ApiOperation({ summary: 'Get service by slug' })
  getServiceBySlug(@Param('slug') slug: string) {
    return this.ehealthwaresService.getServiceBySlug(slug);
  }

  @Get('testimonials')
  @ApiOperation({ summary: 'Get active testimonials' })
  getTestimonials() {
    return this.ehealthwaresService.getTestimonials();
  }

  @Get('partners')
  @ApiOperation({ summary: 'Get partners' })
  getPartners() {
    return this.ehealthwaresService.getPartners();
  }

  @Get('team')
  @ApiOperation({ summary: 'Get team members' })
  getTeam() {
    return this.ehealthwaresService.getTeam();
  }

  @Post('contact')
  @ApiOperation({ summary: 'Submit contact form' })
  submitContact(@Body() dto: CreateContactDto) {
    return this.ehealthwaresService.submitContact(dto);
  }

  @Get('settings')
  @ApiOperation({ summary: 'Get site settings as key-value map' })
  getSettings() {
    return this.ehealthwaresService.getSettings();
  }

  @Get('hero-slides')
  @ApiOperation({ summary: 'Get hero carousel slides' })
  getHeroSlides() {
    return this.ehealthwaresService.getHeroSlides();
  }

  @Get('categories')
  @ApiOperation({ summary: 'Get product categories' })
  getCategories() {
    return this.ehealthwaresService.getCategories();
  }

  @Get('articles')
  @ApiOperation({ summary: 'Get latest articles/topics' })
  getArticles() {
    return this.ehealthwaresService.getArticles();
  }

  @Get('investors')
  @ApiOperation({ summary: 'Get investor data' })
  getInvestors() {
    return this.ehealthwaresService.getInvestorData();
  }

  @Get('careers')
  @ApiOperation({ summary: 'Get career positions' })
  getCareers() {
    return this.ehealthwaresService.getCareers();
  }

  @Post('cache/clear')
  @ApiOperation({ summary: 'Clear the eHealthwares response cache (service-to-service)' })
  async clearCache(@Headers('x-api-key') apiKey?: string) {
    const expected = this.config.get<string>('INTERNAL_API_KEY', 'rxsoft-internal-key');
    if (!apiKey || apiKey !== expected) {
      throw new UnauthorizedException('Invalid or missing x-api-key');
    }
    return this.ehealthwaresService.clearCache();
  }
}
