import { Repository } from 'typeorm';
import { type RequestUser } from '../../../common/decorators/current-user.decorator';
import { WebsiteService } from '../services/website.service';
import { ListQueryDto, CreateHealthConcernDto, UpdateHealthConcernDto, CreateArticleDto, UpdateArticleDto, UpdatePrescriptionStatusDto, PostOrderAsSaleDto, UpdateOrderStatusDto } from '../dto/website.dto';
import { HealthConcernOrmEntity } from '../entities/health-concern.orm-entity';
import { BlogArticleOrmEntity } from '../entities/blog-article.orm-entity';
import { PrescriptionOrmEntity } from '../entities/prescription.orm-entity';
import { OrderOrmEntity } from '../entities/order.orm-entity';
import { ItemOrmEntity } from '../../../modules/catalog/entities/item.orm-entity';
import { SaleOrmEntity, SaleLineOrmEntity } from '../../sales/entities';
import { StockBalanceOrmEntity, StockAdjustmentOrmEntity, StoreStockLocationOrmEntity } from '../../inventory/entities';
export declare class WebsiteAdminController {
    private readonly websiteService;
    private readonly healthConcernRepo;
    private readonly blogRepo;
    private readonly prescriptionRepo;
    private readonly orderRepo;
    private readonly itemRepo;
    private readonly saleRepo;
    private readonly saleLineRepo;
    private readonly stockBalanceRepo;
    private readonly stockAdjustmentRepo;
    private readonly storeStockLocationRepo;
    constructor(websiteService: WebsiteService, healthConcernRepo: Repository<HealthConcernOrmEntity>, blogRepo: Repository<BlogArticleOrmEntity>, prescriptionRepo: Repository<PrescriptionOrmEntity>, orderRepo: Repository<OrderOrmEntity>, itemRepo: Repository<ItemOrmEntity>, saleRepo: Repository<SaleOrmEntity>, saleLineRepo: Repository<SaleLineOrmEntity>, stockBalanceRepo: Repository<StockBalanceOrmEntity>, stockAdjustmentRepo: Repository<StockAdjustmentOrmEntity>, storeStockLocationRepo: Repository<StoreStockLocationOrmEntity>);
    listHealthConcerns(): Promise<HealthConcernOrmEntity[]>;
    createHealthConcern(dto: CreateHealthConcernDto): Promise<HealthConcernOrmEntity>;
    updateHealthConcern(id: string, dto: UpdateHealthConcernDto): Promise<HealthConcernOrmEntity | null>;
    deleteHealthConcern(id: string): Promise<{
        id: string;
        isActive: boolean;
    }>;
    listArticles(query: ListQueryDto): Promise<{
        data: BlogArticleOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    createArticle(dto: CreateArticleDto): Promise<BlogArticleOrmEntity>;
    updateArticle(id: string, dto: UpdateArticleDto): Promise<BlogArticleOrmEntity | null>;
    deleteArticle(id: string): Promise<{
        id: string;
        deleted: boolean;
    }>;
    listPrescriptions(query: ListQueryDto, status?: string): Promise<{
        data: PrescriptionOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    updatePrescriptionStatus(id: string, dto: UpdatePrescriptionStatusDto): Promise<PrescriptionOrmEntity | null>;
    listOrders(status?: string, page?: number, limit?: number): Promise<{
        data: OrderOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOrder(id: string): Promise<OrderOrmEntity>;
    updateOrderStatus(id: string, dto: UpdateOrderStatusDto): Promise<OrderOrmEntity>;
    completeSale(saleId: string, currentUser: RequestUser): Promise<{
        id: string;
        status: "posted";
    }>;
    postOrderAsSale(id: string, dto: PostOrderAsSaleDto, currentUser: RequestUser): Promise<OrderOrmEntity | null>;
}
