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
exports.WarehousesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const mappers_1 = require("../../../shared/domain/mappers");
const code_validation_1 = require("../../../shared/utils/code-validation");
const warehouse_orm_entity_1 = require("../../inventory/entities/warehouse.orm-entity");
let WarehousesService = class WarehousesService {
    warehouseRepository;
    constructor(warehouseRepository) {
        this.warehouseRepository = warehouseRepository;
    }
    async list(query, organizationId) {
        const qb = this.warehouseRepository
            .createQueryBuilder('warehouse')
            .where('warehouse.organization_id = :organizationId', { organizationId })
            .orderBy('warehouse.updated_at', 'DESC')
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(warehouse.code ILIKE :search OR warehouse.name ILIKE :search)', { search: `%${query.search}%` });
        }
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toWarehouseType), total };
    }
    async get(id, organizationId) {
        const warehouse = await this.warehouseRepository.findOne({ where: { id, organizationId } });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        return (0, mappers_1.toWarehouseType)(warehouse);
    }
    async create(payload, organizationId) {
        if (payload.code) {
            const last = await this.warehouseRepository.findOne({
                where: { organizationId },
                order: { createdAt: 'DESC' },
            });
            const { valid, expectedCode } = (0, code_validation_1.validateSequentialCode)({
                providedCode: payload.code,
                lastCode: last?.code ?? undefined,
                override: payload.overrideCodeValidation,
            });
            if (!valid)
                throw new common_1.BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
        }
        const duplicate = await this.warehouseRepository.findOne({ where: { organizationId, code: payload.code } });
        if (duplicate)
            throw new common_1.BadRequestException('Warehouse code already exists');
        const entity = this.warehouseRepository.create({
            organizationId,
            code: payload.code,
            name: payload.name,
            address: payload.address ?? null,
            isActive: payload.isActive ?? true,
        });
        const saved = await this.warehouseRepository.save(entity);
        return (0, mappers_1.toWarehouseType)(saved);
    }
    async update(id, payload, organizationId) {
        const warehouse = await this.warehouseRepository.findOne({ where: { id, organizationId } });
        if (!warehouse)
            throw new common_1.NotFoundException('Warehouse not found');
        if (payload.code !== undefined) {
            if (payload.code !== warehouse.code) {
                const duplicate = await this.warehouseRepository.findOne({ where: { organizationId, code: payload.code } });
                if (duplicate)
                    throw new common_1.BadRequestException('Warehouse code already exists');
            }
            warehouse.code = payload.code;
        }
        if (payload.name !== undefined)
            warehouse.name = payload.name;
        if (payload.address !== undefined)
            warehouse.address = payload.address;
        if (payload.isActive !== undefined)
            warehouse.isActive = payload.isActive;
        const saved = await this.warehouseRepository.save(warehouse);
        return (0, mappers_1.toWarehouseType)(saved);
    }
    async remove(id, organizationId) {
        const result = await this.warehouseRepository.delete({ id, organizationId });
        if (!result.affected)
            throw new common_1.NotFoundException('Warehouse not found');
    }
};
exports.WarehousesService = WarehousesService;
exports.WarehousesService = WarehousesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(warehouse_orm_entity_1.WarehouseOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WarehousesService);
//# sourceMappingURL=warehouses.service.js.map