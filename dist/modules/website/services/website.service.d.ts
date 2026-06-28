import { Repository } from 'typeorm';
import { ItemOrmEntity } from '../../../modules/catalog/entities/item.orm-entity';
import { ItemCategoryOrmEntity } from '../../../modules/catalog/entities/item-category.orm-entity';
import { PartyOrmEntity } from '../../../modules/customers/entities/party.orm-entity';
import { GenericDrugCacheService } from '../../../services/generic-drug-cache.service';
import { HealthConcernOrmEntity, PrescriptionOrmEntity, PrescriptionFileOrmEntity, ConsultationOrmEntity, TestimonialOrmEntity, BlogArticleOrmEntity, DeliveryAreaOrmEntity, BranchOrmEntity, ContactSubmissionOrmEntity, NewsletterSubscriberOrmEntity, ProductReviewOrmEntity, RewardTransactionOrmEntity, OrderOrmEntity, OrderItemOrmEntity, DeliveryOrmEntity } from '../entities';
import { ListQueryDto, CreateConsultationDto, CreateContactDto, NewsletterSubscribeDto, CreateReviewDto, SearchQueryDto, CreateOrderDto, CreatePrescriptionDto } from '../dto/website.dto';
export declare class WebsiteService {
    private readonly itemRepo;
    private readonly categoryRepo;
    private readonly partyRepo;
    private readonly healthConcernRepo;
    private readonly prescriptionRepo;
    private readonly prescriptionFileRepo;
    private readonly consultationRepo;
    private readonly testimonialRepo;
    private readonly blogRepo;
    private readonly deliveryAreaRepo;
    private readonly branchRepo;
    private readonly contactRepo;
    private readonly newsletterRepo;
    private readonly reviewRepo;
    private readonly rewardRepo;
    private readonly orderRepo;
    private readonly orderItemRepo;
    private readonly deliveryRepo;
    private readonly genericDrugCache;
    constructor(itemRepo: Repository<ItemOrmEntity>, categoryRepo: Repository<ItemCategoryOrmEntity>, partyRepo: Repository<PartyOrmEntity>, healthConcernRepo: Repository<HealthConcernOrmEntity>, prescriptionRepo: Repository<PrescriptionOrmEntity>, prescriptionFileRepo: Repository<PrescriptionFileOrmEntity>, consultationRepo: Repository<ConsultationOrmEntity>, testimonialRepo: Repository<TestimonialOrmEntity>, blogRepo: Repository<BlogArticleOrmEntity>, deliveryAreaRepo: Repository<DeliveryAreaOrmEntity>, branchRepo: Repository<BranchOrmEntity>, contactRepo: Repository<ContactSubmissionOrmEntity>, newsletterRepo: Repository<NewsletterSubscriberOrmEntity>, reviewRepo: Repository<ProductReviewOrmEntity>, rewardRepo: Repository<RewardTransactionOrmEntity>, orderRepo: Repository<OrderOrmEntity>, orderItemRepo: Repository<OrderItemOrmEntity>, deliveryRepo: Repository<DeliveryOrmEntity>, genericDrugCache: GenericDrugCacheService);
    getHomepage(): Promise<{
        featuredProducts: ItemOrmEntity[];
        categories: ItemCategoryOrmEntity[];
        healthConcerns: HealthConcernOrmEntity[];
        testimonials: TestimonialOrmEntity[];
        articles: BlogArticleOrmEntity[];
    }>;
    listProducts(query: ListQueryDto): Promise<{
        data: ItemOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getProduct(id: string): Promise<{
        product: ItemOrmEntity;
        reviews: ProductReviewOrmEntity[];
        related: ItemOrmEntity[];
    }>;
    listCategories(): Promise<ItemCategoryOrmEntity[]>;
    getCategoryBySlug(slug: string): Promise<{
        category: ItemCategoryOrmEntity;
        products: ItemOrmEntity[];
    }>;
    listHealthConcerns(): Promise<HealthConcernOrmEntity[]>;
    getHealthConcernBySlug(slug: string): Promise<{
        concern: HealthConcernOrmEntity;
        products: ItemOrmEntity[];
        articles: BlogArticleOrmEntity[];
    }>;
    createPrescription(files: Express.Multer.File[], payload: CreatePrescriptionDto): Promise<PrescriptionOrmEntity | null>;
    listPrescriptions(userId?: string): Promise<PrescriptionOrmEntity[]>;
    createConsultation(payload: CreateConsultationDto): Promise<ConsultationOrmEntity>;
    listConsultations(userId?: string): Promise<ConsultationOrmEntity[]>;
    getCart(productIds: string[]): Promise<ItemOrmEntity[]>;
    listOrders(userId?: string): Promise<OrderOrmEntity[]>;
    getOrder(id: string): Promise<OrderOrmEntity>;
    trackOrder(orderNumber: string): Promise<OrderOrmEntity>;
    createOrder(payload: CreateOrderDto, userId?: string): Promise<OrderOrmEntity | null>;
    listArticles(query: ListQueryDto): Promise<{
        data: BlogArticleOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getArticleBySlug(slug: string): Promise<{
        article: BlogArticleOrmEntity;
        related: BlogArticleOrmEntity[];
    }>;
    listDeliveryAreas(): Promise<DeliveryAreaOrmEntity[]>;
    listBranches(): Promise<BranchOrmEntity[]>;
    getBranch(id: string): Promise<BranchOrmEntity>;
    submitContact(payload: CreateContactDto): Promise<ContactSubmissionOrmEntity>;
    subscribe(payload: NewsletterSubscribeDto): Promise<NewsletterSubscriberOrmEntity>;
    createReview(payload: CreateReviewDto, userId?: string): Promise<ProductReviewOrmEntity>;
    getProductReviews(productId: string): Promise<ProductReviewOrmEntity[]>;
    getRewards(userId?: string): Promise<{
        totalPoints: number;
        transactions: RewardTransactionOrmEntity[];
    }>;
    search(query: SearchQueryDto): Promise<Record<string, unknown[]>>;
    private getFeaturedProducts;
}
