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
exports.SuppliersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const party_orm_entity_1 = require("../entities/party.orm-entity");
const mappers_1 = require("../../../shared/domain/mappers");
let SuppliersService = class SuppliersService {
    partyRepository;
    constructor(partyRepository) {
        this.partyRepository = partyRepository;
    }
    async list(query) {
        const qb = this.partyRepository
            .createQueryBuilder('party')
            .where('party.organization_id = :organizationId', { organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID })
            .andWhere('party.deleted_at IS NULL')
            .andWhere("party.party_type IN ('supplier', 'both')");
        if (query.search) {
            qb.andWhere('(party.name LIKE :search OR party.phone LIKE :search OR party.email LIKE :search)', {
                search: `%${query.search}%`,
            });
        }
        if (query.filter) {
            qb.andWhere('(party.name LIKE :filter OR party.phone LIKE :filter OR party.email LIKE :filter)', {
                filter: `%${query.filter}%`,
            });
        }
        qb.orderBy(this.resolveSortColumn(query.sortBy), query.sortOrder.toUpperCase())
            .skip(query.offset)
            .take(query.limit);
        const [data, total] = await qb.getManyAndCount();
        return { data: data.map(mappers_1.toPartyType), total };
    }
    async create(payload) {
        const party = this.partyRepository.create({
            organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID,
            partyType: 'supplier',
            code: null,
            name: payload.name,
            phone: payload.phone ?? null,
            email: payload.email ?? null,
            addressLine1: payload.address ?? null,
            isActive: true,
        });
        const saved = await this.partyRepository.save(party);
        return { id: saved.id, name: saved.name, phone: saved.phone, email: saved.email };
    }
    resolveSortColumn(sortBy) {
        const map = {
            name: 'party.name',
            email: 'party.email',
            phone: 'party.phone',
            updatedAt: 'party.updated_at',
            createdAt: 'party.created_at',
        };
        return map[sortBy] ?? 'party.created_at';
    }
};
exports.SuppliersService = SuppliersService;
exports.SuppliersService = SuppliersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(party_orm_entity_1.PartyOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SuppliersService);
//# sourceMappingURL=suppliers.service.js.map