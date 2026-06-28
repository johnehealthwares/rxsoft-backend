"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const item_orm_entity_1 = require("../../../modules/catalog/entities/item.orm-entity");
const item_category_orm_entity_1 = require("../../../modules/catalog/entities/item-category.orm-entity");
const party_orm_entity_1 = require("../../../modules/customers/entities/party.orm-entity");
const generic_drug_cache_service_1 = require("../../../services/generic-drug-cache.service");
const entities_1 = require("../entities");
let WebsiteService = class WebsiteService {
    itemRepo;
    categoryRepo;
    partyRepo;
    healthConcernRepo;
    prescriptionRepo;
    prescriptionFileRepo;
    consultationRepo;
    testimonialRepo;
    blogRepo;
    deliveryAreaRepo;
    branchRepo;
    contactRepo;
    newsletterRepo;
    reviewRepo;
    rewardRepo;
    orderRepo;
    orderItemRepo;
    deliveryRepo;
    genericDrugCache;
    constructor(itemRepo, categoryRepo, partyRepo, healthConcernRepo, prescriptionRepo, prescriptionFileRepo, consultationRepo, testimonialRepo, blogRepo, deliveryAreaRepo, branchRepo, contactRepo, newsletterRepo, reviewRepo, rewardRepo, orderRepo, orderItemRepo, deliveryRepo, genericDrugCache) {
        this.itemRepo = itemRepo;
        this.categoryRepo = categoryRepo;
        this.partyRepo = partyRepo;
        this.healthConcernRepo = healthConcernRepo;
        this.prescriptionRepo = prescriptionRepo;
        this.prescriptionFileRepo = prescriptionFileRepo;
        this.consultationRepo = consultationRepo;
        this.testimonialRepo = testimonialRepo;
        this.blogRepo = blogRepo;
        this.deliveryAreaRepo = deliveryAreaRepo;
        this.branchRepo = branchRepo;
        this.contactRepo = contactRepo;
        this.newsletterRepo = newsletterRepo;
        this.reviewRepo = reviewRepo;
        this.rewardRepo = rewardRepo;
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.deliveryRepo = deliveryRepo;
        this.genericDrugCache = genericDrugCache;
    }
    async getHomepage() {
        const featuredProducts = await this.getFeaturedProducts();
        const categories = await this.categoryRepo.find({ where: { deletedAt: (0, typeorm_2.IsNull)() }, take: 9 });
        const healthConcerns = await this.healthConcernRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
        const testimonials = await this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' }, take: 6 });
        const articles = await this.blogRepo.find({ where: { isPublished: true }, order: { publishedAt: 'DESC' }, take: 3 });
        return { featuredProducts, categories, healthConcerns, testimonials, articles };
    }
    async listProducts(query) {
        const qb = this.itemRepo
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.category', 'category')
            .where('item.deletedAt IS NULL')
            .andWhere('item.isActive = :active', { active: true });
        if (query.search) {
            qb.andWhere('item.name ILIKE :search', { search: `%${query.search}%` });
        }
        if (query.category) {
            qb.andWhere('category.code = :catSlug', { catSlug: query.category });
        }
        const total = await qb.getCount();
        const sortBy = query.sortBy || 'item.createdAt';
        const sortOrder = query.sortOrder || 'DESC';
        qb.orderBy(sortBy, sortOrder);
        const skip = (query.page - 1) * query.limit;
        qb.skip(skip).take(query.limit);
        const data = await qb.getMany();
        return { data, total, page: query.page, limit: query.limit };
    }
    async getProduct(id) {
        const product = await this.itemRepo
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.category', 'category')
            .where('item.id = :id', { id })
            .andWhere('item.isActive = :active', { active: true })
            .getOne();
        if (!product)
            throw new common_1.NotFoundException('Product not found');
        const reviews = await this.reviewRepo.find({ where: { productId: id, isApproved: true }, order: { createdAt: 'DESC' }, take: 10 });
        const related = await this.itemRepo
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.category', 'category')
            .where('item.deletedAt IS NULL')
            .andWhere('item.isActive = :active', { active: true })
            .andWhere('item.id != :id', { id })
            .andWhere('category.id = :catId', { catId: product.category?.id })
            .take(4)
            .getMany();
        return { product, reviews, related };
    }
    async listCategories() {
        return this.categoryRepo.find({ where: { deletedAt: (0, typeorm_2.IsNull)() }, order: { name: 'ASC' } });
    }
    async getCategoryBySlug(slug) {
        const category = await this.categoryRepo.findOne({ where: { code: slug, deletedAt: (0, typeorm_2.IsNull)() } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        const products = await this.itemRepo.find({
            where: { category: { id: category.id }, deletedAt: (0, typeorm_2.IsNull)(), isActive: true },
        });
        return { category, products };
    }
    async listHealthConcerns() {
        return this.healthConcernRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    }
    async getHealthConcernBySlug(slug) {
        const concern = await this.healthConcernRepo.findOne({ where: { slug, isActive: true } });
        if (!concern)
            throw new common_1.NotFoundException('Health concern not found');
        const products = await this.itemRepo.find({
            where: { deletedAt: (0, typeorm_2.IsNull)(), isActive: true },
            relations: ['category'],
            take: 20,
        });
        const articles = await this.blogRepo.find({
            where: { isPublished: true },
            order: { publishedAt: 'DESC' },
            take: 3,
        });
        return { concern, products, articles };
    }
    async createPrescription(files, payload) {
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
    async listPrescriptions(userId) {
        const where = userId ? { userId } : {};
        return this.prescriptionRepo.find({ where, relations: ['files'], order: { createdAt: 'DESC' } });
    }
    async createConsultation(payload) {
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
    async listConsultations(userId) {
        const where = userId ? { userId } : {};
        return this.consultationRepo.find({ where, order: { createdAt: 'DESC' } });
    }
    async getCart(productIds) {
        if (!productIds.length)
            return [];
        return this.itemRepo.find({ where: { id: (0, typeorm_2.In)(productIds), deletedAt: (0, typeorm_2.IsNull)(), isActive: true } });
    }
    async listOrders(userId) {
        const where = userId ? { createdBy: userId } : {};
        return this.orderRepo.find({ where, relations: ['items', 'delivery'], order: { createdAt: 'DESC' } });
    }
    async getOrder(id) {
        const order = await this.orderRepo.findOne({ where: { id }, relations: ['items', 'delivery'] });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async trackOrder(orderNumber) {
        const order = await this.orderRepo.findOne({ where: { orderNumber }, relations: ['items', 'delivery'] });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async createOrder(payload, userId) {
        const items = payload.items?.length
            ? await this.itemRepo.findBy({ id: (0, typeorm_2.In)(payload.items.map((i) => i.itemId)) })
            : [];
        const itemMap = new Map(items.map((i) => [i.id, i]));
        let subtotal = 0;
        const orderItems = [];
        for (const line of payload.items ?? []) {
            const item = itemMap.get(line.itemId);
            if (!item)
                continue;
            const price = line.unitPrice ?? 0;
            subtotal += price * line.quantity;
            orderItems.push({ itemId: line.itemId, quantity: line.quantity, unitPrice: price });
        }
        let customerId = payload.customerId ?? null;
        if (!customerId && userId) {
            const party = await this.partyRepo.findOne({ where: { userId } });
            if (party)
                customerId = party.id;
        }
        const order = this.orderRepo.create({
            orderNumber: `ORD-${Date.now()}`,
            customerId,
            paymentMethod: payload.paymentMethod,
            notes: payload.notes ?? null,
            orderStatus: 'pending',
            createdBy: userId ?? null,
            subtotalAmount: subtotal,
            totalAmount: subtotal,
        });
        const savedOrder = await this.orderRepo.save(order);
        if (orderItems.length > 0) {
            await this.orderItemRepo.save(orderItems.map((oi) => this.orderItemRepo.create({ order: savedOrder, ...oi })));
        }
        if (payload.delivery) {
            const delivery = this.deliveryRepo.create({
                order: savedOrder,
                address: payload.delivery.address,
                city: payload.delivery.city ?? null,
                state: payload.delivery.state ?? null,
                phone: payload.delivery.phone ?? null,
                shippingMethod: payload.delivery.shippingMethod ?? null,
            });
            await this.deliveryRepo.save(delivery);
        }
        return this.orderRepo.findOne({
            where: { id: savedOrder.id },
            relations: ['items', 'delivery'],
        });
    }
    async listArticles(query) {
        const [data, total] = await this.blogRepo.findAndCount({
            where: { isPublished: true },
            order: { publishedAt: 'DESC' },
            skip: (query.page - 1) * query.limit,
            take: query.limit,
        });
        return { data, total, page: query.page, limit: query.limit };
    }
    async getArticleBySlug(slug) {
        const article = await this.blogRepo.findOne({ where: { slug, isPublished: true } });
        if (!article)
            throw new common_1.NotFoundException('Article not found');
        const related = await this.blogRepo.find({
            where: { isPublished: true },
            order: { publishedAt: 'DESC' },
            take: 3,
        });
        return { article, related };
    }
    async listDeliveryAreas() {
        return this.deliveryAreaRepo.find({ where: { isActive: true }, order: { state: 'ASC', city: 'ASC' } });
    }
    async listBranches() {
        return this.branchRepo.find({ where: { isActive: true }, order: { name: 'ASC' } });
    }
    async getBranch(id) {
        const branch = await this.branchRepo.findOne({ where: { id, isActive: true } });
        if (!branch)
            throw new common_1.NotFoundException('Branch not found');
        return branch;
    }
    async submitContact(payload) {
        return this.contactRepo.save(this.contactRepo.create(payload));
    }
    async subscribe(payload) {
        const existing = await this.newsletterRepo.findOne({ where: { email: payload.email } });
        if (existing) {
            existing.subscribed = true;
            if (payload.phone)
                existing.phone = payload.phone;
            return this.newsletterRepo.save(existing);
        }
        return this.newsletterRepo.save(this.newsletterRepo.create(payload));
    }
    async createReview(payload, userId) {
        return this.reviewRepo.save(this.reviewRepo.create({ ...payload, userId }));
    }
    async getProductReviews(productId) {
        return this.reviewRepo.find({ where: { productId, isApproved: true }, order: { createdAt: 'DESC' } });
    }
    async getRewards(userId) {
        if (!userId)
            return { totalPoints: 0, transactions: [] };
        const transactions = await this.rewardRepo.find({ where: { userId }, order: { createdAt: 'DESC' } });
        const totalPoints = transactions.reduce((sum, t) => (t.type === 'earned' || t.type === 'referral_bonus' ? sum + t.points : sum - t.points), 0);
        return { totalPoints, transactions };
    }
    async search(query) {
        const results = {};
        if (!query.type || query.type === 'medicines') {
            const medicines = await this.itemRepo.find({
                where: [
                    { name: (0, typeorm_2.ILike)(`%${query.q}%`), deletedAt: (0, typeorm_2.IsNull)(), isActive: true },
                    { code: (0, typeorm_2.ILike)(`%${query.q}%`), deletedAt: (0, typeorm_2.IsNull)(), isActive: true },
                ],
                take: 10,
            });
            results.medicines = medicines;
        }
        if (!query.type || query.type === 'categories') {
            const categories = await this.categoryRepo.find({
                where: [
                    { name: (0, typeorm_2.ILike)(`%${query.q}%`), deletedAt: (0, typeorm_2.IsNull)() },
                    { code: (0, typeorm_2.ILike)(`%${query.q}%`), deletedAt: (0, typeorm_2.IsNull)() },
                ],
                take: 5,
            });
            results.categories = categories;
        }
        if (!query.type || query.type === 'articles') {
            const articles = await this.blogRepo.find({
                where: { title: (0, typeorm_2.ILike)(`%${query.q}%`), isPublished: true },
                take: 5,
            });
            results.articles = articles;
        }
        if (!query.type || query.type === 'health_concerns') {
            const concerns = await this.healthConcernRepo.find({
                where: { name: (0, typeorm_2.ILike)(`%${query.q}%`), isActive: true },
                take: 5,
            });
            results.healthConcerns = concerns;
        }
        return results;
    }
    async getFeaturedProducts() {
        return this.itemRepo.find({
            where: { deletedAt: (0, typeorm_2.IsNull)(), isActive: true },
            relations: ['category'],
            take: 8,
            order: { createdAt: 'DESC' },
        });
    }
};
exports.WebsiteService = WebsiteService;
exports.WebsiteService = WebsiteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(item_orm_entity_1.ItemOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(item_category_orm_entity_1.ItemCategoryOrmEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(party_orm_entity_1.PartyOrmEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(entities_1.HealthConcernOrmEntity)),
    __param(4, (0, typeorm_1.InjectRepository)(entities_1.PrescriptionOrmEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(entities_1.PrescriptionFileOrmEntity)),
    __param(6, (0, typeorm_1.InjectRepository)(entities_1.ConsultationOrmEntity)),
    __param(7, (0, typeorm_1.InjectRepository)(entities_1.TestimonialOrmEntity)),
    __param(8, (0, typeorm_1.InjectRepository)(entities_1.BlogArticleOrmEntity)),
    __param(9, (0, typeorm_1.InjectRepository)(entities_1.DeliveryAreaOrmEntity)),
    __param(10, (0, typeorm_1.InjectRepository)(entities_1.BranchOrmEntity)),
    __param(11, (0, typeorm_1.InjectRepository)(entities_1.ContactSubmissionOrmEntity)),
    __param(12, (0, typeorm_1.InjectRepository)(entities_1.NewsletterSubscriberOrmEntity)),
    __param(13, (0, typeorm_1.InjectRepository)(entities_1.ProductReviewOrmEntity)),
    __param(14, (0, typeorm_1.InjectRepository)(entities_1.RewardTransactionOrmEntity)),
    __param(15, (0, typeorm_1.InjectRepository)(entities_1.OrderOrmEntity)),
    __param(16, (0, typeorm_1.InjectRepository)(entities_1.OrderItemOrmEntity)),
    __param(17, (0, typeorm_1.InjectRepository)(entities_1.DeliveryOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        generic_drug_cache_service_1.GenericDrugCacheService])
], WebsiteService);
//# sourceMappingURL=website.service.js.map