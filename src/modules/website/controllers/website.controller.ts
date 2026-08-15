import { Body, Controller, Delete, Get, Headers, Param, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { OptionalAuthGuard } from '../guards/optional-auth.guard';
import { WebsiteService } from '../services/website.service';
import {
  ListQueryDto,
  CreatePrescriptionDto,
  CreateConsultationDto,
  AddToCartDto,
  CreateOrderDto,
  CreateContactDto,
  NewsletterSubscribeDto,
  CreateReviewDto,
  SearchQueryDto,
} from '../dto/website.dto';

@ApiTags('website')
@Controller('website')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  // ── Homepage ───────────────────────────────────────────────────

  @Get('homepage')
  @ApiOperation({ summary: 'Get homepage data' })
  getHomepage() {
    return this.websiteService.getHomepage();
  }

  // ── Products ───────────────────────────────────────────────────

  @Get('products')
  @ApiOperation({ summary: 'List products with search/filter/pagination' })
  listProducts(@Query() query: ListQueryDto) {
    return this.websiteService.listProducts(query);
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Get product detail' })
  getProduct(@Param('id') id: string) {
    return this.websiteService.getProduct(id);
  }

  // ── Categories ─────────────────────────────────────────────────

  @Get('categories')
  @ApiOperation({ summary: 'List all categories' })
  listCategories() {
    return this.websiteService.listCategories();
  }

  @Get('categories/:slug')
  @ApiOperation({ summary: 'Get category by slug with products' })
  getCategoryBySlug(@Param('slug') slug: string, @Headers('x-organization-id') organizationId?: string) {
    return this.websiteService.getCategoryBySlug(slug, organizationId);
  }

  // ── Health Concerns ────────────────────────────────────────────

  @Get('health-concerns')
  @ApiOperation({ summary: 'List health concerns' })
  listHealthConcerns() {
    return this.websiteService.listHealthConcerns();
  }

  @Get('health-concerns/:slug')
  @ApiOperation({ summary: 'Get health concern by slug' })
  getHealthConcernBySlug(@Param('slug') slug: string, @Headers('x-organization-id') organizationId?: string) {
    return this.websiteService.getHealthConcernBySlug(slug, organizationId);
  }

  // ── Prescriptions ──────────────────────────────────────────────

  @Post('prescriptions')
  @UseInterceptors(FilesInterceptor('files', 10))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreatePrescriptionDto })
  @ApiOperation({ summary: 'Upload prescription with files' })
  createPrescription(@UploadedFiles() files: Express.Multer.File[], @Body() payload: CreatePrescriptionDto) {
    return this.websiteService.createPrescription(files || [], payload);
  }

  @UseGuards(OptionalAuthGuard)
  @Get('prescriptions')
  @ApiOperation({ summary: 'List prescriptions' })
  listPrescriptions(@Req() req: any) {
    return this.websiteService.listPrescriptions(req.user?.sub);
  }

  // ── Consultations ──────────────────────────────────────────────

  @Post('consultations')
  @ApiOperation({ summary: 'Book a consultation' })
  createConsultation(@Body() payload: CreateConsultationDto) {
    return this.websiteService.createConsultation(payload);
  }

  @UseGuards(OptionalAuthGuard)
  @Get('consultations')
  @ApiOperation({ summary: 'List consultations' })
  listConsultations(@Req() req: any) {
    return this.websiteService.listConsultations(req.user?.sub);
  }

  // ── Cart ───────────────────────────────────────────────────────

  @Post('cart')
  @ApiOperation({ summary: 'Add to cart (returns product details for given ids)' })
  @ApiBody({ type: [AddToCartDto] })
  addToCart(@Body() payload: AddToCartDto[], @Headers('x-organization-id') organizationId?: string) {
    const ids = payload.map((p) => p.productId);
    return this.websiteService.getCart(ids, organizationId);
  }

  @Get('cart')
  @ApiOperation({ summary: 'Get cart product details' })
  getCart(@Query('ids') ids: string, @Headers('x-organization-id') organizationId?: string) {
    const productIds = ids ? ids.split(',').filter(Boolean) : [];
    return this.websiteService.getCart(productIds, organizationId);
  }

  @Delete('cart/:id')
  @ApiOperation({ summary: 'Remove from cart (no-op on server, client-managed)' })
  removeFromCart() {
    return { ok: true };
  }

  // ── Orders ─────────────────────────────────────────────────────

  @UseGuards(OptionalAuthGuard)
  @Post('orders')
  @ApiOperation({ summary: 'Create order' })
  createOrder(@Body() payload: CreateOrderDto, @Req() req: any, @Headers('x-organization-id') organizationId?: string) {
    return this.websiteService.createOrder(payload, req.user?.sub, organizationId);
  }

  @UseGuards(OptionalAuthGuard)
  @Get('orders')
  @ApiOperation({ summary: 'List orders' })
  listOrders(@Req() req: any) {
    return this.websiteService.listOrders(req.user?.sub);
  }

  @Get('orders/track/:trackingCode')
  @ApiOperation({ summary: 'Track order by code' })
  trackOrder(@Param('trackingCode') trackingCode: string) {
    return this.websiteService.trackOrder(trackingCode);
  }

  @UseGuards(OptionalAuthGuard)
  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order detail' })
  getOrder(@Param('id') id: string) {
    return this.websiteService.getOrder(id);
  }

  // ── Blog ───────────────────────────────────────────────────────

  @Get('articles')
  @ApiOperation({ summary: 'List published articles' })
  listArticles(@Query() query: ListQueryDto) {
    return this.websiteService.listArticles(query);
  }

  @Get('articles/:slug')
  @ApiOperation({ summary: 'Get article by slug' })
  getArticleBySlug(@Param('slug') slug: string) {
    return this.websiteService.getArticleBySlug(slug);
  }

  // ── Delivery Areas ─────────────────────────────────────────────

  @Get('delivery-areas')
  @ApiOperation({ summary: 'List delivery areas' })
  listDeliveryAreas() {
    return this.websiteService.listDeliveryAreas();
  }

  // ── Branches ───────────────────────────────────────────────────

  @Get('branches')
  @ApiOperation({ summary: 'List branches' })
  listBranches() {
    return this.websiteService.listBranches();
  }

  @Get('branches/:id')
  @ApiOperation({ summary: 'Get branch detail' })
  getBranch(@Param('id') id: string) {
    return this.websiteService.getBranch(id);
  }

  // ── Contact ────────────────────────────────────────────────────

  @Post('contact')
  @ApiOperation({ summary: 'Submit contact form' })
  submitContact(@Body() payload: CreateContactDto) {
    return this.websiteService.submitContact(payload);
  }

  // ── Newsletter ─────────────────────────────────────────────────

  @Post('newsletter/subscribe')
  @ApiOperation({ summary: 'Subscribe to newsletter' })
  subscribe(@Body() payload: NewsletterSubscribeDto) {
    return this.websiteService.subscribe(payload);
  }

  // ── Reviews ────────────────────────────────────────────────────

  @UseGuards(OptionalAuthGuard)
  @Post('reviews')
  @ApiOperation({ summary: 'Submit product review' })
  createReview(@Body() payload: CreateReviewDto, @Req() req: any) {
    return this.websiteService.createReview(payload, req.user?.sub);
  }

  @Get('reviews/:productId')
  @ApiOperation({ summary: 'Get product reviews' })
  getProductReviews(@Param('productId') productId: string) {
    return this.websiteService.getProductReviews(productId);
  }

  // ── Rewards ────────────────────────────────────────────────────

  @UseGuards(OptionalAuthGuard)
  @Get('rewards')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get rewards data' })
  getRewards(@Req() req: any) {
    return this.websiteService.getRewards(req.user?.sub);
  }

  // ── Search ─────────────────────────────────────────────────────

  @Get('search')
  @ApiOperation({ summary: 'Global search' })
  search(@Query() query: SearchQueryDto, @Headers('x-organization-id') organizationId?: string) {
    return this.websiteService.search(query, organizationId);
  }
}
