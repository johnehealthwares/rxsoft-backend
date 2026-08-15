import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import {
  ArticleDocument,
  CareerDocument,
  CategoryDocument,
  HeroSlideDocument,
  InvestorDataDocument,
  PartnerDocument,
  ProductDocument,
  ServiceDocument,
  SiteSectionDocument,
  SiteSettingDocument,
  TeamMemberDocument,
  TestimonialDocument,
  ContactSubmissionDocument,
} from '../schemas';
import { EhealthwaresAdminService } from '../services/ehealthwares-admin.service';
import {
  CreateArticleDto,
  CreateCareerDto,
  CreateCategoryDto,
  CreateHeroSlideDto,
  CreateInvestorDataDto,
  CreatePartnerDto,
  CreateProductDto,
  CreateServiceDto,
  CreateSiteSectionDto,
  CreateSiteSettingDto,
  CreateTeamMemberDto,
  CreateTestimonialDto,
  EhealthwaresListQueryDto,
  UpdateArticleDto,
  UpdateCareerDto,
  UpdateCategoryDto,
  UpdateContactSubmissionDto,
  UpdateHeroSlideDto,
  UpdateInvestorDataDto,
  UpdatePartnerDto,
  UpdateProductDto,
  UpdateServiceDto,
  UpdateSiteSectionDto,
  UpdateSiteSettingDto,
  UpdateTeamMemberDto,
  UpdateTestimonialDto,
} from '../dto/ehealthwares-admin.dto';

@ApiTags('ehealthwares-admin')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin', 'super_admin')
@Controller('ehealthwares/admin')
export class EhealthwaresAdminController {
  constructor(
    private readonly adminService: EhealthwaresAdminService,
    @InjectModel('SiteSection')
    private readonly sectionModel: Model<SiteSectionDocument>,
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
    @InjectModel('Service')
    private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel('Testimonial')
    private readonly testimonialModel: Model<TestimonialDocument>,
    @InjectModel('Partner')
    private readonly partnerModel: Model<PartnerDocument>,
    @InjectModel('TeamMember')
    private readonly teamModel: Model<TeamMemberDocument>,
    @InjectModel('SiteSetting')
    private readonly settingModel: Model<SiteSettingDocument>,
    @InjectModel('HeroSlide')
    private readonly heroSlideModel: Model<HeroSlideDocument>,
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Article')
    private readonly articleModel: Model<ArticleDocument>,
    @InjectModel('InvestorData')
    private readonly investorModel: Model<InvestorDataDocument>,
    @InjectModel('Career') private readonly careerModel: Model<CareerDocument>,
    @InjectModel('ContactSubmission')
    private readonly contactModel: Model<ContactSubmissionDocument>,
  ) {}

  // ── Site Sections ────────────────────────────────────────────

  @Get('sections')
  @ApiOperation({ summary: 'List site sections (admin)' })
  listSections(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.sectionModel,
      query,
      ['key', 'title', 'subtitle', 'content'],
      ['key', 'title', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('sections')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a site section' })
  createSection(@Body() dto: CreateSiteSectionDto) {
    return this.adminService.create(this.sectionModel, dto);
  }

  @Patch('sections/:id')
  @Put('sections/:id')
  @ApiOperation({ summary: 'Update a site section' })
  updateSection(@Param('id') id: string, @Body() dto: UpdateSiteSectionDto) {
    return this.adminService.update(this.sectionModel, id, dto);
  }

  @Delete('sections/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a site section' })
  deleteSection(@Param('id') id: string) {
    return this.adminService.remove(this.sectionModel, id, { deletedAt: true });
  }

  // ── Products ─────────────────────────────────────────────────

  @Get('products')
  @ApiOperation({ summary: 'List products (admin)' })
  listProducts(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.productModel,
      query,
      ['name', 'slug', 'tagline', 'description'],
      ['name', 'slug', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('products')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a product' })
  createProduct(@Body() dto: CreateProductDto) {
    return this.adminService.create(this.productModel, dto);
  }

  @Patch('products/:id')
  @Put('products/:id')
  @ApiOperation({ summary: 'Update a product' })
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.adminService.update(this.productModel, id, dto);
  }

  @Delete('products/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a product' })
  deleteProduct(@Param('id') id: string) {
    return this.adminService.remove(this.productModel, id, { deletedAt: true });
  }

  // ── Services ─────────────────────────────────────────────────

  @Get('services')
  @ApiOperation({ summary: 'List services (admin)' })
  listServices(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.serviceModel,
      query,
      ['name', 'slug', 'tagline', 'description'],
      ['name', 'slug', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('services')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a service' })
  createService(@Body() dto: CreateServiceDto) {
    return this.adminService.create(this.serviceModel, dto);
  }

  @Patch('services/:id')
  @Put('services/:id')
  @ApiOperation({ summary: 'Update a service' })
  updateService(@Param('id') id: string, @Body() dto: UpdateServiceDto) {
    return this.adminService.update(this.serviceModel, id, dto);
  }

  @Delete('services/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a service' })
  deleteService(@Param('id') id: string) {
    return this.adminService.remove(this.serviceModel, id, { deletedAt: true });
  }

  // ── Testimonials ─────────────────────────────────────────────

  @Get('testimonials')
  @ApiOperation({ summary: 'List testimonials (admin)' })
  listTestimonials(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.testimonialModel,
      query,
      ['name', 'role', 'company', 'text'],
      ['name', 'role', 'company', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('testimonials')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a testimonial' })
  createTestimonial(@Body() dto: CreateTestimonialDto) {
    return this.adminService.create(this.testimonialModel, dto);
  }

  @Patch('testimonials/:id')
  @Put('testimonials/:id')
  @ApiOperation({ summary: 'Update a testimonial' })
  updateTestimonial(
    @Param('id') id: string,
    @Body() dto: UpdateTestimonialDto,
  ) {
    return this.adminService.update(this.testimonialModel, id, dto);
  }

  @Delete('testimonials/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a testimonial' })
  deleteTestimonial(@Param('id') id: string) {
    return this.adminService.remove(this.testimonialModel, id, {
      deletedAt: true,
    });
  }

  // ── Partners ─────────────────────────────────────────────────

  @Get('partners')
  @ApiOperation({ summary: 'List partners (admin)' })
  listPartners(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.partnerModel,
      query,
      ['name'],
      ['name', 'displayOrder', 'createdAt'],
    );
  }

  @Post('partners')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a partner' })
  createPartner(@Body() dto: CreatePartnerDto) {
    return this.adminService.create(this.partnerModel, dto);
  }

  @Patch('partners/:id')
  @Put('partners/:id')
  @ApiOperation({ summary: 'Update a partner' })
  updatePartner(@Param('id') id: string, @Body() dto: UpdatePartnerDto) {
    return this.adminService.update(this.partnerModel, id, dto);
  }

  @Delete('partners/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a partner' })
  deletePartner(@Param('id') id: string) {
    return this.adminService.remove(this.partnerModel, id, { deletedAt: true });
  }

  // ── Team Members ─────────────────────────────────────────────

  @Get('team')
  @ApiOperation({ summary: 'List team members (admin)' })
  listTeam(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.teamModel,
      query,
      ['name', 'role', 'bio'],
      ['name', 'role', 'displayOrder', 'createdAt'],
    );
  }

  @Post('team')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a team member' })
  createTeamMember(@Body() dto: CreateTeamMemberDto) {
    return this.adminService.create(this.teamModel, dto);
  }

  @Patch('team/:id')
  @Put('team/:id')
  @ApiOperation({ summary: 'Update a team member' })
  updateTeamMember(@Param('id') id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.adminService.update(this.teamModel, id, dto);
  }

  @Delete('team/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Soft delete a team member' })
  deleteTeamMember(@Param('id') id: string) {
    return this.adminService.remove(this.teamModel, id, { deletedAt: true });
  }

  // ── Site Settings ────────────────────────────────────────────

  @Get('settings')
  @ApiOperation({ summary: 'List site settings (admin)' })
  listSettings(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.settingModel,
      query,
      ['key'],
      ['key', 'createdAt'],
    );
  }

  @Post('settings')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a site setting' })
  createSetting(@Body() dto: CreateSiteSettingDto) {
    return this.adminService.create(this.settingModel, dto);
  }

  @Patch('settings/:id')
  @Put('settings/:id')
  @ApiOperation({ summary: 'Update a site setting' })
  updateSetting(@Param('id') id: string, @Body() dto: UpdateSiteSettingDto) {
    return this.adminService.update(this.settingModel, id, dto);
  }

  @Delete('settings/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a site setting' })
  deleteSetting(@Param('id') id: string) {
    return this.adminService.remove(this.settingModel, id);
  }

  // ── Hero Slides ──────────────────────────────────────────────

  @Get('hero-slides')
  @ApiOperation({ summary: 'List hero slides (admin)' })
  listHeroSlides(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.heroSlideModel,
      query,
      ['title', 'subtitle'],
      ['title', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('hero-slides')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a hero slide' })
  createHeroSlide(@Body() dto: CreateHeroSlideDto) {
    return this.adminService.create(this.heroSlideModel, dto);
  }

  @Patch('hero-slides/:id')
  @Put('hero-slides/:id')
  @ApiOperation({ summary: 'Update a hero slide' })
  updateHeroSlide(@Param('id') id: string, @Body() dto: UpdateHeroSlideDto) {
    return this.adminService.update(this.heroSlideModel, id, dto);
  }

  @Delete('hero-slides/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate a hero slide' })
  deleteHeroSlide(@Param('id') id: string) {
    return this.adminService.remove(this.heroSlideModel, id, {
      isActive: true,
    });
  }

  // ── Categories ───────────────────────────────────────────────

  @Get('categories')
  @ApiOperation({ summary: 'List categories (admin)' })
  listCategories(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.categoryModel,
      query,
      ['name', 'slug', 'description'],
      ['name', 'slug', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('categories')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a category' })
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.adminService.create(this.categoryModel, dto);
  }

  @Patch('categories/:id')
  @Put('categories/:id')
  @ApiOperation({ summary: 'Update a category' })
  updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return this.adminService.update(this.categoryModel, id, dto);
  }

  @Delete('categories/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate a category' })
  deleteCategory(@Param('id') id: string) {
    return this.adminService.remove(this.categoryModel, id, { isActive: true });
  }

  // ── Articles ─────────────────────────────────────────────────

  @Get('articles')
  @ApiOperation({ summary: 'List articles (admin)' })
  listArticles(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.articleModel,
      query,
      ['title', 'slug', 'excerpt', 'category'],
      ['title', 'slug', 'category', 'publishedAt', 'isActive', 'createdAt'],
    );
  }

  @Post('articles')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create an article' })
  createArticle(@Body() dto: CreateArticleDto) {
    return this.adminService.create(this.articleModel, dto);
  }

  @Patch('articles/:id')
  @Put('articles/:id')
  @ApiOperation({ summary: 'Update an article' })
  updateArticle(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.adminService.update(this.articleModel, id, dto);
  }

  @Delete('articles/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate an article' })
  deleteArticle(@Param('id') id: string) {
    return this.adminService.remove(this.articleModel, id, { isActive: true });
  }

  // ── Investor Data ────────────────────────────────────────────

  @Get('investors')
  @ApiOperation({ summary: 'List investor data (admin)' })
  listInvestors(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.investorModel,
      query,
      ['label', 'value', 'description'],
      ['label', 'value', 'displayOrder', 'isActive', 'createdAt'],
    );
  }

  @Post('investors')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create investor data' })
  createInvestorData(@Body() dto: CreateInvestorDataDto) {
    return this.adminService.create(this.investorModel, dto);
  }

  @Patch('investors/:id')
  @Put('investors/:id')
  @ApiOperation({ summary: 'Update investor data' })
  updateInvestorData(
    @Param('id') id: string,
    @Body() dto: UpdateInvestorDataDto,
  ) {
    return this.adminService.update(this.investorModel, id, dto);
  }

  @Delete('investors/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate investor data' })
  deleteInvestorData(@Param('id') id: string) {
    return this.adminService.remove(this.investorModel, id, { isActive: true });
  }

  // ── Careers ──────────────────────────────────────────────────

  @Get('careers')
  @ApiOperation({ summary: 'List careers (admin)' })
  listCareers(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.careerModel,
      query,
      ['title', 'slug', 'location', 'department', 'type'],
      [
        'title',
        'slug',
        'location',
        'department',
        'type',
        'isActive',
        'createdAt',
      ],
    );
  }

  @Post('careers')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a career position' })
  createCareer(@Body() dto: CreateCareerDto) {
    return this.adminService.create(this.careerModel, dto);
  }

  @Patch('careers/:id')
  @Put('careers/:id')
  @ApiOperation({ summary: 'Update a career position' })
  updateCareer(@Param('id') id: string, @Body() dto: UpdateCareerDto) {
    return this.adminService.update(this.careerModel, id, dto);
  }

  @Delete('careers/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Deactivate a career position' })
  deleteCareer(@Param('id') id: string) {
    return this.adminService.remove(this.careerModel, id, { isActive: true });
  }

  // ── Contact Submissions ──────────────────────────────────────

  @Get('contact-submissions')
  @ApiOperation({ summary: 'List contact submissions (admin)' })
  listContacts(@Query() query: EhealthwaresListQueryDto) {
    return this.adminService.list(
      this.contactModel,
      query,
      ['name', 'email', 'subject', 'message'],
      ['name', 'email', 'subject', 'read', 'createdAt'],
    );
  }

  @Patch('contact-submissions/:id')
  @Put('contact-submissions/:id')
  @ApiOperation({ summary: 'Update a contact submission (e.g. mark read)' })
  updateContact(
    @Param('id') id: string,
    @Body() dto: UpdateContactSubmissionDto,
  ) {
    return this.adminService.update(this.contactModel, id, dto);
  }

  @Delete('contact-submissions/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a contact submission' })
  deleteContact(@Param('id') id: string) {
    return this.adminService.remove(this.contactModel, id);
  }
}
