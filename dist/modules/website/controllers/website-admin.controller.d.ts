import { Repository } from 'typeorm';
import { type RequestUser } from '../../../common/decorators/current-user.decorator';
import { WebsiteService } from '../services/website.service';
import { ListQueryDto, CreateHealthConcernDto, UpdateHealthConcernDto, CreateArticleDto, UpdateArticleDto, UpdatePrescriptionStatusDto } from '../dto/website.dto';
import { HealthConcernOrmEntity } from '../entities/health-concern.orm-entity';
import { BlogArticleOrmEntity } from '../entities/blog-article.orm-entity';
import { PrescriptionOrmEntity } from '../entities/prescription.orm-entity';
import { SaleOrmEntity } from '../../sales/entities';
import { StockBalanceOrmEntity, StockAdjustmentOrmEntity, StoreStockLocationOrmEntity } from '../../inventory/entities';
export declare class WebsiteAdminController {
    private readonly websiteService;
    private readonly healthConcernRepo;
    private readonly blogRepo;
    private readonly prescriptionRepo;
    private readonly saleRepo;
    private readonly stockBalanceRepo;
    private readonly stockAdjustmentRepo;
    private readonly storeStockLocationRepo;
    constructor(websiteService: WebsiteService, healthConcernRepo: Repository<HealthConcernOrmEntity>, blogRepo: Repository<BlogArticleOrmEntity>, prescriptionRepo: Repository<PrescriptionOrmEntity>, saleRepo: Repository<SaleOrmEntity>, stockBalanceRepo: Repository<StockBalanceOrmEntity>, stockAdjustmentRepo: Repository<StockAdjustmentOrmEntity>, storeStockLocationRepo: Repository<StoreStockLocationOrmEntity>);
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
        data: SaleOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getOrder(id: string): Promise<SaleOrmEntity>;
    updateOrderStatus(id: string, dto: {
        status: string;
    }, currentUser: RequestUser): Promise<SaleOrmEntity>;
    assignLocation(id: string, dto: {
        stockLocationId: string;
    }): Promise<SaleOrmEntity>;
    processOrder(id: string, currentUser: RequestUser): Promise<SaleOrmEntity>;
}
