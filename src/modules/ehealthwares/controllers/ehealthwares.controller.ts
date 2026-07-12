import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EhealthwaresService } from '../services/ehealthwares.service';
import { CreateContactDto } from '../dto/ehealthwares.dto';

@ApiTags('ehealthwares')
@Controller('ehealthwares')
export class EhealthwaresController {
  constructor(private readonly ehealthwaresService: EhealthwaresService) {}

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
}
