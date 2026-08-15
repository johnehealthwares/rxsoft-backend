import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, In, IsNull } from 'typeorm';
import { ItemOrmEntity } from '../../../modules/catalog/entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../../../modules/catalog/entities/item-category.orm-entity';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import { OrdersService } from '../../orders/orders.service';
import { PricingService } from '../../pricing/services/pricing.service';
import {
  HealthConcernOrmEntity,
  PrescriptionOrmEntity,
  PrescriptionFileOrmEntity,
  ConsultationOrmEntity,
  TestimonialOrmEntity,
  BlogArticleOrmEntity,
  DeliveryAreaOrmEntity,
  BranchOrmEntity,
  ContactSubmissionOrmEntity,
  NewsletterSubscriberOrmEntity,
  ProductReviewOrmEntity,
  RewardTransactionOrmEntity,
} from '../entities';
import { ListQueryDto, CreateConsultationDto, CreateContactDto, NewsletterSubscribeDto, CreateReviewDto, SearchQueryDto, CreateOrderDto, CreatePrescriptionDto } from '../dto/website.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(ItemOrmEntity)
    private readonly itemRepo: Repository<ItemOrmEntity>,
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepo: Repository<ItemCategoryOrmEntity>,
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepo: Repository<PartyOrmEntity>,
    @InjectRepository(HealthConcernOrmEntity)
    private readonly healthConcernRepo: Repository<HealthConcernOrmEntity>,
    @InjectRepository(PrescriptionOrmEntity)
    private readonly prescriptionRepo: Repository<PrescriptionOrmEntity>,
    @InjectRepository(PrescriptionFileOrmEntity)
    private readonly prescriptionFileRepo: Repository<PrescriptionFileOrmEntity>,
    @InjectRepository(ConsultationOrmEntity)
    private readonly consultationRepo: Repository<ConsultationOrmEntity>,
    @InjectRepository(TestimonialOrmEntity)
    private readonly testimonialRepo: Repository<TestimonialOrmEntity>,
    @InjectRepository(BlogArticleOrmEntity)
    private readonly blogRepo: Repository<BlogArticleOrmEntity>,
    @InjectRepository(DeliveryAreaOrmEntity)
    private readonly deliveryAreaRepo: Repository<DeliveryAreaOrmEntity>,
    @InjectRepository(BranchOrmEntity)
    private readonly branchRepo: Repository<BranchOrmEntity>,
    @InjectRepository(ContactSubmissionOrmEntity)
    private readonly contactRepo: Repository<ContactSubmissionOrmEntity>,
    @InjectRepository(NewsletterSubscriberOrmEntity)
    private readonly newsletterRepo: Repository<NewsletterSubscriberOrmEntity>,
    @InjectRepository(ProductReviewOrmEntity)
    private readonly reviewRepo: Repository<ProductReviewOrmEntity>,
    @InjectRepository(RewardTransactionOrmEntity)
    private readonly rewardRepo: Repository<RewardTransactionOrmEntity>,
    private readonly genericDrugCache: GenericDrugCacheService,
    private readonly ordersService: OrdersService,
    private readonly pricingService: PricingService,
  ) {}

  // ── Homepage ──────────────────────────────────────────────────

  async getHomepage(organizationId?: string) {
    const featuredProducts = await this.getFeaturedProducts(organizationId);
    const categories = await this.categoryRepo.find({ where: { deletedAt: IsNull() }, take: 9 });
    const healthConcerns = await this.healthConcernRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    const testimonials = await this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' }, take: 6 });
    const articles = await this.blogRepo.find({ where: { isPublished: true }, order: { publishedAt: 'DESC' }, take: 3 });

    return { featuredProducts, categories, healthConcerns, testimonials, articles };
  }

  // ── Products ───────────────────────────────────────────────────

  async listProducts(query: ListQueryDto, organizationId?: string) {
    const qb = this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.deletedAt IS NULL')
      .andWhere('item.isActive = :active', { active: true });

    if (organizationId) {
      qb.andWhere('item.organizationId = :orgId', { orgId: organizationId });
    }

    if (query.search) {
      qb.andWhere('item.name ILIKE :search', { search: `%${query.search}%` });
    }

    if (query.category) {
      qb.andWhere('category.code = :catSlug', { catSlug: query.category });
    }

    const total = await qb.getCount();

    const sortBy = query.sortBy || 'item.createdAt';
    const sortOrder = query.sortOrder || 'DESC';
    qb.orderBy(sortBy, sortOrder as 'ASC' | 'DESC');

    const skip = (query.page - 1) * query.limit;
    qb.skip(skip).take(query.limit);

    const data = await qb.getMany();

    const enriched = organizationId
      ? await this.enrichWithPrices(data, organizationId)
      : data;

    return { data: enriched, total, page: query.page, limit: query.limit };
  }

  async getProduct(id: string, organizationId?: string) {
    const qb = this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.id = :id', { id })
      .andWhere('item.isActive = :active', { active: true });

    if (organizationId) {
      qb.andWhere('item.organizationId = :orgId', { orgId: organizationId });
    }

    const product = await qb.getOne();

    if (!product) throw new NotFoundException('Product not found');

    const reviews = await this.reviewRepo.find({ where: { productId: id, isApproved: true }, order: { createdAt: 'DESC' }, take: 10 });

    const relatedQb = this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.deletedAt IS NULL')
      .andWhere('item.isActive = :active', { active: true })
      .andWhere('item.id != :id', { id })
      .andWhere('category.id = :catId', { catId: product.category?.id })
      .take(4);

    if (organizationId) {
      relatedQb.andWhere('item.organizationId = :orgId', { orgId: organizationId });
    }

    const related = await relatedQb.getMany();

    const [enrichedProduct] = organizationId
      ? await this.enrichWithPrices([product], organizationId)
      : [product];
    const enrichedRelated = organizationId
      ? await this.enrichWithPrices(related, organizationId)
      : related;

    return { product: enrichedProduct, reviews, related: enrichedRelated };
  }

  // ── Categories ─────────────────────────────────────────────────

  async listCategories() {
    return this.categoryRepo.find({ where: { deletedAt:  IsNull() }, order: { name: 'ASC' } });
  }

  async getCategoryBySlug(slug: string, organizationId?: string) {
    const category = await this.categoryRepo.findOne({ where: { code: slug, deletedAt:  IsNull() } });
    if (!category) throw new NotFoundException('Category not found');

    const where: any = { category: { id: category.id }, deletedAt:  IsNull(), isActive: true };
    if (organizationId) where.organizationId = organizationId;

    const products = await this.itemRepo.find({ where });

    const enriched = organizationId
      ? await this.enrichWithPrices(products, organizationId)
      : products;

    return { category, products: enriched };
  }

  // ── Health Concerns ────────────────────────────────────────────

  async listHealthConcerns() {
    return this.healthConcernRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  async getHealthConcernBySlug(slug: string, organizationId?: string) {
    const concern = await this.healthConcernRepo.findOne({ where: { slug, isActive: true } });
    if (!concern) throw new NotFoundException('Health concern not found');

    const where: any = { deletedAt:  IsNull(), isActive: true };
    if (organizationId) where.organizationId = organizationId;

    const products = await this.itemRepo.find({
      where,
      relations: ['category'],
      take: 20,
    });

    const enriched = organizationId
      ? await this.enrichWithPrices(products, organizationId)
      : products;

    const articles = await this.blogRepo.find({
      where: { isPublished: true },
      order: { publishedAt: 'DESC' },
      take: 3,
    });

    return { concern, products: enriched, articles };
  }

  // ── Prescriptions ──────────────────────────────────────────────

  async createPrescription(files: Express.Multer.File[], payload: CreatePrescriptionDto) {
    const prescription = this.prescriptionRepo.create({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      adminNotes: payload.notes,
      status: 'Pending',
    });

    const saved = await this.prescriptionRepo.save(prescription);

    for (const file of files) {
      const pf = this.prescriptionFileRepo.create({
        prescription: saved,
        fileUrl: file.path || `/uploads/${file.filename}`,
        mime: file.mimetype,
        originalName: file.originalname,
        size: file.size,
      });
      await this.prescriptionFileRepo.save(pf);
    }

    return this.prescriptionRepo.findOne({ where: { id: saved.id }, relations: ['files'] });
  }

  async listPrescriptions(userId?: string) {
    const where = userId ? { userId } : {};
    return this.prescriptionRepo.find({ where, relations: ['files'], order: { createdAt: 'DESC' } });
  }

  // ── Consultations ──────────────────────────────────────────────

  async createConsultation(payload: CreateConsultationDto) {
    const consultation = this.consultationRepo.create({
      name: payload.name,
      phone: payload.phone,
      email: payload.email,
      symptoms: payload.symptoms,
      questions: payload.questions,
      channel: payload.channel || 'WhatsApp',
      status: 'Pending',
    });
    return this.consultationRepo.save(consultation);
  }

  async listConsultations(userId?: string) {
    const where = userId ? { userId } : {};
    return this.consultationRepo.find({ where, order: { createdAt: 'DESC' } });
  }

  // ── Cart ───────────────────────────────────────────────────────

  async getCart(productIds: string[], organizationId?: string) {
    if (!productIds.length) return [];
    const where: any = { id: In(productIds), deletedAt:  IsNull(), isActive: true };
    if (organizationId) where.organizationId = organizationId;

    const items = await this.itemRepo.find({ where });

    return organizationId ? this.enrichWithPrices(items, organizationId) : items;
  }

  // ── Orders (delegated to OrdersModule) ──────────────────────────

  async listOrders(userId?: string) {
    return this.ordersService.listOrders(userId);
  }

  async getOrder(id: string) {
    return this.ordersService.getOrder(id);
  }

  async trackOrder(orderNumber: string) {
    return this.ordersService.trackOrder(orderNumber);
  }

  async createOrder(payload: CreateOrderDto, userId?: string, organizationId?: string) {
    return this.ordersService.createOrder(payload, userId, organizationId);
  }

  // ── Blog ───────────────────────────────────────────────────────

  async listArticles(query: ListQueryDto) {
    const [data, total] = await this.blogRepo.findAndCount({
      where: { isPublished: true },
      order: { publishedAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return { data, total, page: query.page, limit: query.limit };
  }

  async getArticleBySlug(slug: string) {
    const article = await this.blogRepo.findOne({ where: { slug, isPublished: true } });
    if (!article) throw new NotFoundException('Article not found');

    const related = await this.blogRepo.find({
      where: { isPublished: true },
      order: { publishedAt: 'DESC' },
      take: 3,
    });

    return { article, related };
  }

  // ── Delivery Areas ─────────────────────────────────────────────

  async listDeliveryAreas() {
    return this.deliveryAreaRepo.find({ where: { isActive: true }, order: { state: 'ASC', city: 'ASC' } });
  }

  // ── Branches ───────────────────────────────────────────────────

  async listBranches() {
    return this.branchRepo.find({ where: { isActive: true }, order: { name: 'ASC' } });
  }

  async getBranch(id: string) {
    const branch = await this.branchRepo.findOne({ where: { id, isActive: true } });
    if (!branch) throw new NotFoundException('Branch not found');
    return branch;
  }

  // ── Contact ────────────────────────────────────────────────────

  async submitContact(payload: CreateContactDto) {
    return this.contactRepo.save(this.contactRepo.create(payload));
  }

  // ── Newsletter ─────────────────────────────────────────────────

  async subscribe(payload: NewsletterSubscribeDto) {
    const existing = await this.newsletterRepo.findOne({ where: { email: payload.email } });
    if (existing) {
      existing.subscribed = true;
      if (payload.phone) existing.phone = payload.phone;
      return this.newsletterRepo.save(existing);
    }
    return this.newsletterRepo.save(this.newsletterRepo.create(payload));
  }

  // ── Reviews ────────────────────────────────────────────────────

  async createReview(payload: CreateReviewDto, userId?: string) {
    return this.reviewRepo.save(this.reviewRepo.create({ ...payload, userId }));
  }

  async getProductReviews(productId: string) {
    return this.reviewRepo.find({ where: { productId, isApproved: true }, order: { createdAt: 'DESC' } });
  }

  // ── Rewards ────────────────────────────────────────────────────

  async getRewards(userId?: string) {
    if (!userId) return { totalPoints: 0, transactions: [] };
    const transactions = await this.rewardRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
    const totalPoints = transactions.reduce((sum, t) => (t.type === 'earned' || t.type === 'referral_bonus' ? sum + t.points : sum - t.points), 0);
    return { totalPoints, transactions };
  }

  // ── Search ─────────────────────────────────────────────────────

  async search(query: SearchQueryDto, organizationId?: string) {
    const results: Record<string, unknown[]> = {};

    if (!query.type || query.type === 'medicines') {
      const where: any[] = [
        { name: ILike(`%${query.q}%`), deletedAt:  IsNull(), isActive: true },
        { code: ILike(`%${query.q}%`), deletedAt:  IsNull(), isActive: true },
      ];
      if (organizationId) {
        where.forEach((w) => (w.organizationId = organizationId));
      }

      const medicines = await this.itemRepo.find({ where, take: 10 });

      results.medicines = organizationId
        ? await this.enrichWithPrices(medicines, organizationId)
        : medicines;
    }

    if (!query.type || query.type === 'categories') {
      const categories = await this.categoryRepo.find({
        where: [
          { name: ILike(`%${query.q}%`), deletedAt:  IsNull() },
          { code: ILike(`%${query.q}%`), deletedAt:  IsNull() },
        ],
        take: 5,
      });
      results.categories = categories;
    }

    if (!query.type || query.type === 'articles') {
      const articles = await this.blogRepo.find({
        where: { title: ILike(`%${query.q}%`), isPublished: true },
        take: 5,
      });
      results.articles = articles;
    }

    if (!query.type || query.type === 'health_concerns') {
      const concerns = await this.healthConcernRepo.find({
        where: { name: ILike(`%${query.q}%`), isActive: true },
        take: 5,
      });
      results.healthConcerns = concerns;
    }

    return results;
  }

  // ── Helpers ────────────────────────────────────────────────────

  private async getFeaturedProducts(organizationId?: string) {
    const where: any = { deletedAt:  IsNull(), isActive: true };
    if (organizationId) where.organizationId = organizationId;

    const items = await this.itemRepo.find({
      where,
      relations: ['category'],
      take: 8,
      order: { createdAt: 'DESC' },
    });

    return organizationId ? this.enrichWithPrices(items, organizationId) : items;
  }

  private async enrichWithPrices(items: any[], organizationId: string) {
    if (!items.length) return items;
    const prices = await this.pricingService.getPricesForItems(
      items.map((i) => i.id),
      organizationId,
    );
    return items.map((item) => ({
      ...item,
      unitPrice: prices.get(item.id) ?? null,
    }));
  }
}
