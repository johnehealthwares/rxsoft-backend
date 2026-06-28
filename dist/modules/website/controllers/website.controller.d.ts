import { WebsiteService } from '../services/website.service';
import { ListQueryDto, CreatePrescriptionDto, CreateConsultationDto, AddToCartDto, CreateOrderDto, CreateContactDto, NewsletterSubscribeDto, CreateReviewDto, SearchQueryDto } from '../dto/website.dto';
export declare class WebsiteController {
    private readonly websiteService;
    constructor(websiteService: WebsiteService);
    getHomepage(): Promise<{
        featuredProducts: import("../../catalog/entities").ItemOrmEntity[];
        categories: import("../../catalog/entities").ItemCategoryOrmEntity[];
        healthConcerns: import("../entities").HealthConcernOrmEntity[];
        testimonials: import("../entities").TestimonialOrmEntity[];
        articles: import("../entities").BlogArticleOrmEntity[];
    }>;
    listProducts(query: ListQueryDto): Promise<{
        data: import("../../catalog/entities").ItemOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getProduct(id: string): Promise<{
        product: import("../../catalog/entities").ItemOrmEntity;
        reviews: import("../entities").ProductReviewOrmEntity[];
        related: import("../../catalog/entities").ItemOrmEntity[];
    }>;
    listCategories(): Promise<import("../../catalog/entities").ItemCategoryOrmEntity[]>;
    getCategoryBySlug(slug: string): Promise<{
        category: import("../../catalog/entities").ItemCategoryOrmEntity;
        products: import("../../catalog/entities").ItemOrmEntity[];
    }>;
    listHealthConcerns(): Promise<import("../entities").HealthConcernOrmEntity[]>;
    getHealthConcernBySlug(slug: string): Promise<{
        concern: import("../entities").HealthConcernOrmEntity;
        products: import("../../catalog/entities").ItemOrmEntity[];
        articles: import("../entities").BlogArticleOrmEntity[];
    }>;
    createPrescription(files: Express.Multer.File[], payload: CreatePrescriptionDto): Promise<import("../entities").PrescriptionOrmEntity | null>;
    listPrescriptions(req: any): Promise<import("../entities").PrescriptionOrmEntity[]>;
    createConsultation(payload: CreateConsultationDto): Promise<import("../entities").ConsultationOrmEntity>;
    listConsultations(req: any): Promise<import("../entities").ConsultationOrmEntity[]>;
    addToCart(payload: AddToCartDto[]): Promise<import("../../catalog/entities").ItemOrmEntity[]>;
    getCart(ids: string): Promise<import("../../catalog/entities").ItemOrmEntity[]>;
    removeFromCart(): {
        ok: boolean;
    };
    createOrder(payload: CreateOrderDto, req: any): Promise<import("../entities").OrderOrmEntity | null>;
    listOrders(req: any): Promise<import("../entities").OrderOrmEntity[]>;
    trackOrder(trackingCode: string): Promise<import("../entities").OrderOrmEntity>;
    getOrder(id: string): Promise<import("../entities").OrderOrmEntity>;
    listArticles(query: ListQueryDto): Promise<{
        data: import("../entities").BlogArticleOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getArticleBySlug(slug: string): Promise<{
        article: import("../entities").BlogArticleOrmEntity;
        related: import("../entities").BlogArticleOrmEntity[];
    }>;
    listDeliveryAreas(): Promise<import("../entities").DeliveryAreaOrmEntity[]>;
    listBranches(): Promise<import("../entities").BranchOrmEntity[]>;
    getBranch(id: string): Promise<import("../entities").BranchOrmEntity>;
    submitContact(payload: CreateContactDto): Promise<import("../entities").ContactSubmissionOrmEntity>;
    subscribe(payload: NewsletterSubscribeDto): Promise<import("../entities").NewsletterSubscriberOrmEntity>;
    createReview(payload: CreateReviewDto, req: any): Promise<import("../entities").ProductReviewOrmEntity>;
    getProductReviews(productId: string): Promise<import("../entities").ProductReviewOrmEntity[]>;
    getRewards(req: any): Promise<{
        totalPoints: number;
        transactions: import("../entities").RewardTransactionOrmEntity[];
    }>;
    search(query: SearchQueryDto): Promise<Record<string, unknown[]>>;
}
