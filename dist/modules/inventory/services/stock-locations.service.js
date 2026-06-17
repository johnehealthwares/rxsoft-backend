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
exports.StockLocationsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const mappers_1 = require("../../../shared/domain/mappers");
const warehouse_orm_entity_1 = require("../entities/warehouse.orm-entity");
const stock_location_orm_entity_1 = require("../entities/stock-location.orm-entity");
let StockLocationsService = class StockLocationsService {
    stockLocationRepository;
    warehouseRepository;
    constructor(stockLocationRepository, warehouseRepository) {
        this.stockLocationRepository = stockLocationRepository;
        this.warehouseRepository = warehouseRepository;
    }
    async list(query, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const qb = this.stockLocationRepository
            .createQueryBuilder('stock_location')
            .leftJoinAndSelect('stock_location.warehouse', 'warehouse')
            .leftJoinAndSelect('stock_location.parent', 'parent')
            .where('stock_location.organization_id = :organizationId', { organizationId })
            .skip(query.offset)
            .take(query.limit);
        if (query.search) {
            qb.andWhere('(stock_location.name ILIKE :search OR stock_location.code ILIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        if (query.warehouseId)
            qb.andWhere('warehouse.id = :warehouseId', { warehouseId: query.warehouseId });
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toStockLocationType), total };
    }
    async get(id, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const item = await this.stockLocationRepository.findOne({
            where: { id, organizationId },
            relations: { warehouse: true, parent: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Stock location not found');
        return (0, mappers_1.toStockLocationType)(item);
    }
    async create(payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const duplicate = await this.stockLocationRepository.findOne({
            where: { organizationId, name: payload.name },
        });
        if (duplicate)
            throw new common_1.BadRequestException('Stock location name already exists');
        const warehouse = payload.warehouseId
            ? await this.warehouseRepository.findOne({ where: { id: payload.warehouseId, organizationId } })
            : null;
        if (payload.warehouseId && !warehouse)
            throw new common_1.BadRequestException('Warehouse not found');
        const parent = payload.parentId
            ? await this.stockLocationRepository.findOne({ where: { id: payload.parentId, organizationId } })
            : null;
        if (payload.parentId && !parent)
            throw new common_1.BadRequestException('Parent stock location not found');
        const entity = this.stockLocationRepository.create({
            organizationId,
            warehouseId: warehouse?.id ?? null,
            warehouse,
            parentId: parent?.id ?? null,
            parent,
            code: payload.code ?? null,
            name: payload.name,
            locationType: payload.locationType ?? 'internal',
            isActive: payload.isActive ?? true,
        });
        const savedEntity = await this.stockLocationRepository.save(entity);
        const fullEntity = await this.stockLocationRepository.findOneOrFail({
            where: { id: savedEntity.id, organizationId },
            relations: { warehouse: true, parent: true },
        });
        return (0, mappers_1.toStockLocationType)(fullEntity);
    }
    async update(id, payload, organizationId = persistence_scope_1.DEFAULT_ORGANIZATION_ID) {
        const item = await this.stockLocationRepository.findOne({
            where: { id, organizationId },
            relations: { warehouse: true, parent: true },
        });
        if (!item)
            throw new common_1.NotFoundException('Stock location not found');
        if (payload.name && payload.name !== item.name) {
            const duplicate = await this.stockLocationRepository.findOne({
                where: { organizationId, name: payload.name },
            });
            if (duplicate && duplicate.id !== item.id) {
                throw new common_1.BadRequestException('Stock location name already exists');
            }
        }
        if (payload.warehouseId !== undefined) {
            if (!payload.warehouseId) {
                item.warehouse = null;
                item.warehouseId = null;
            }
            else {
                const warehouse = await this.warehouseRepository.findOne({ where: { id: payload.warehouseId, organizationId } });
                if (!warehouse)
                    throw new common_1.BadRequestException('Warehouse not found');
                item.warehouse = warehouse;
                item.warehouseId = warehouse.id;
            }
        }
        if (payload.parentId !== undefined) {
            if (!payload.parentId) {
                item.parent = null;
                item.parentId = null;
            }
            else {
                const parent = await this.stockLocationRepository.findOne({ where: { id: payload.parentId, organizationId } });
                if (!parent)
                    throw new common_1.BadRequestException('Parent stock location not found');
                item.parent = parent;
                item.parentId = parent.id;
            }
        }
        if (payload.code !== undefined)
            item.code = payload.code ?? null;
        if (payload.name !== undefined)
            item.name = payload.name;
        if (payload.locationType !== undefined)
            item.locationType = payload.locationType;
        if (payload.isActive !== undefined)
            item.isActive = payload.isActive;
        const savedItem = await this.stockLocationRepository.save(item);
        const fullEntity = await this.stockLocationRepository.findOneOrFail({
            where: { id: savedItem.id, organizationId },
            relations: { warehouse: true, parent: true },
        });
        return (0, mappers_1.toStockLocationType)(fullEntity);
    }
};
exports.StockLocationsService = StockLocationsService;
exports.StockLocationsService = StockLocationsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stock_location_orm_entity_1.StockLocationOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(warehouse_orm_entity_1.WarehouseOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StockLocationsService);
//# sourceMappingURL=stock-locations.service.js.map