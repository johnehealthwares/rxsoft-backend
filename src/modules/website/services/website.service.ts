import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, In, IsNull } from 'typeorm';
import { ItemOrmEntity } from '../../../modules/catalog/entities/item.orm-entity';
import { GenericProductOrmEntity } from '../../../modules/catalog/entities/generic-product.orm-entity';
import { ItemCategoryOrmEntity } from '../../../modules/catalog/entities/item-category.orm-entity';
import { SaleOrmEntity, SaleLineOrmEntity } from '../../../modules/sales/entities';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';
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
    @InjectRepository(GenericProductOrmEntity)
    private readonly genericProductRepo: Repository<GenericProductOrmEntity>,
    @InjectRepository(ItemCategoryOrmEntity)
    private readonly categoryRepo: Repository<ItemCategoryOrmEntity>,
    @InjectRepository(SaleOrmEntity)
    private readonly saleRepo: Repository<SaleOrmEntity>,
    @InjectRepository(SaleLineOrmEntity)
    private readonly saleLineRepo: Repository<SaleLineOrmEntity>,
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
  ) {}

  // ── Homepage ──────────────────────────────────────────────────

  async getHomepage() {
    const featuredProducts = await this.getFeaturedProducts();
    const categories = await this.categoryRepo.find({ where: { deletedAt: IsNull() }, take: 9 });
    const healthConcerns = await this.healthConcernRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    const testimonials = await this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' }, take: 6 });
    const articles = await this.blogRepo.find({ where: { isPublished: true }, order: { publishedAt: 'DESC' }, take: 3 });

    return { featuredProducts, categories, healthConcerns, testimonials, articles };
  }

  // ── Products ───────────────────────────────────────────────────

  async listProducts(query: ListQueryDto) {
    const qb = this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('item.genericProduct', 'genericProduct')
      .leftJoinAndSelect('genericProduct.pharmaceutics', 'pharmaceutics')
      .where('item.deletedAt IS NULL')
      .andWhere('item.isActive = :active', { active: true });

    if (query.search) {
      qb.andWhere('(item.name ILIKE :search OR genericProduct.name ILIKE :search)', { search: `%${query.search}%` });
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
    return { data, total, page: query.page, limit: query.limit };
  }

  async getProduct(id: string) {
    const product = await this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .leftJoinAndSelect('item.genericProduct', 'genericProduct')
      .leftJoinAndSelect('genericProduct.pharmaceutics', 'pharmaceutics')
      .where('item.id = :id', { id })
      .getOne();

    if (!product) throw new NotFoundException('Product not found');

    const reviews = await this.reviewRepo.find({ where: { productId: id, isApproved: true }, order: { createdAt: 'DESC' }, take: 10 });

    const related = await this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('item.deletedAt IS NULL')
      .andWhere('item.id != :id', { id })
      .andWhere('category.id = :catId', { catId: product.category?.id })
      .take(4)
      .getMany();

    return { product, reviews, related };
  }

  // ── Categories ─────────────────────────────────────────────────

  async listCategories() {
    return this.categoryRepo.find({ where: { deletedAt:  IsNull() }, order: { name: 'ASC' } });
  }

  async getCategoryBySlug(slug: string) {
    const category = await this.categoryRepo.findOne({ where: { code: slug, deletedAt:  IsNull() } });
    if (!category) throw new NotFoundException('Category not found');

    const products = await this.itemRepo.find({
      where: { category: { id: category.id }, deletedAt:  IsNull(), isActive: true },
      relations: ['genericProduct'],
    });

    return { category, products };
  }

  // ── Health Concerns ────────────────────────────────────────────

  async listHealthConcerns() {
    return this.healthConcernRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  async getHealthConcernBySlug(slug: string) {
    const concern = await this.healthConcernRepo.findOne({ where: { slug, isActive: true } });
    if (!concern) throw new NotFoundException('Health concern not found');

    const products = await this.itemRepo.find({
      where: { deletedAt:  IsNull(), isActive: true },
      relations: ['genericProduct', 'category'],
      take: 20,
    });

    const articles = await this.blogRepo.find({
      where: { isPublished: true },
      order: { publishedAt: 'DESC' },
      take: 3,
    });

    return { concern, products, articles };
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

  async getCart(productIds: string[]) {
    if (!productIds.length) return [];
    return this.itemRepo.find({ where: { id: In(productIds), deletedAt:  IsNull() }, relations: ['genericProduct'] });
  }

  // ── Orders ─────────────────────────────────────────────────────

  async listOrders(userId?: string) {
    const where = userId ? { createdBy: userId } : {};
    return this.saleRepo.find({ where, relations: ['lines'], order: { createdAt: 'DESC' } });
  }

  async getOrder(id: string) {
    const order = await this.saleRepo.findOne({ where: { id }, relations: ['lines'] });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async trackOrder(trackingCode: string) {
    const order = await this.saleRepo.findOne({ where: { saleNumber: trackingCode }, relations: ['lines'] });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async createOrder(payload: CreateOrderDto, userId?: string) {
    const sale = this.saleRepo.create({
      ...payload,
      createdBy: userId,
      status: 'Pending',
    } as any);
    return this.saleRepo.save(sale);
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

  async search(query: SearchQueryDto) {
    const results: Record<string, unknown[]> = {};

    if (!query.type || query.type === 'medicines') {
      const medicines = await this.itemRepo.find({
        where: [
          { name: ILike(`%${query.q}%`), deletedAt:  IsNull() },
          { code: ILike(`%${query.q}%`), deletedAt:  IsNull() },
        ],
        relations: ['genericProduct'],
        take: 10,
      });
      results.medicines = medicines;
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

  private async getFeaturedProducts() {
    return this.itemRepo.find({
      where: { deletedAt:  IsNull(), isActive: true },
      relations: ['genericProduct', 'category'],
      take: 8,
      order: { createdAt: 'DESC' },
    });
  }
}
