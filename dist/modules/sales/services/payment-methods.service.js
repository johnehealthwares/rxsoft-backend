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
exports.PaymentMethodsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const payment_method_orm_entity_1 = require("../entities/payment-method.orm-entity");
const code_validation_1 = require("../../../shared/utils/code-validation");
let PaymentMethodsService = class PaymentMethodsService {
    paymentMethodRepository;
    constructor(paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }
    async list(query, organizationId) {
        const qb = this.paymentMethodRepository
            .createQueryBuilder('payment_method')
            .where('payment_method.organization_id = :organizationId', { organizationId })
            .orderBy('payment_method.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(payment_method.code ILIKE :search OR payment_method.name ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toPaymentMethodType), total };
    }
    async get(id, organizationId) {
        const item = await this.paymentMethodRepository.findOne({ where: { id, organizationId } });
        if (!item)
            throw new common_1.NotFoundException('Payment method not found');
        return (0, mappers_1.toPaymentMethodType)(item);
    }
    async create(payload, organizationId) {
        const last = await this.paymentMethodRepository.findOne({
            where: { organizationId },
            order: { createdAt: 'DESC' },
            select: ['code'],
        });
        const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
            providedCode: payload.code,
            lastCode: last?.code,
            override: payload.overrideCodeValidation,
        });
        if (!valid) {
            throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        const duplicate = await this.paymentMethodRepository.findOne({ where: { organizationId, code: payload.code } });
        if (duplicate)
            throw new common_1.BadRequestException('Payment method code already exists');
        const entity = this.paymentMethodRepository.create({
            organizationId,
            code: payload.code,
            name: payload.name,
            methodType: payload.methodType,
            isActive: payload.isActive ?? true,
        });
        const saved = await this.paymentMethodRepository.save(entity);
        return (0, mappers_1.toPaymentMethodType)(saved);
    }
    async update(id, payload, organizationId) {
        const item = await this.paymentMethodRepository.findOne({ where: { id, organizationId } });
        if (!item)
            throw new common_1.NotFoundException('Payment method not found');
        if (payload.code && payload.code !== item.code) {
            const duplicate = await this.paymentMethodRepository.findOne({ where: { organizationId, code: payload.code } });
            if (duplicate)
                throw new common_1.BadRequestException('Payment method code already exists');
            item.code = payload.code;
        }
        if (payload.name !== undefined)
            item.name = payload.name;
        if (payload.methodType !== undefined)
            item.methodType = payload.methodType;
        if (payload.isActive !== undefined)
            item.isActive = payload.isActive;
        const saved = await this.paymentMethodRepository.save(item);
        return (0, mappers_1.toPaymentMethodType)(saved);
    }
    async remove(id, organizationId) {
        const result = await this.paymentMethodRepository.delete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Payment method not found');
    }
};
exports.PaymentMethodsService = PaymentMethodsService;
exports.PaymentMethodsService = PaymentMethodsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_method_orm_entity_1.PaymentMethodOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PaymentMethodsService);
//# sourceMappingURL=payment-methods.service.js.map