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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
const mappers_1 = require("../../../shared/domain/mappers");
const entities_1 = require("../entities");
let CustomersService = class CustomersService {
    partyRepository;
    constructor(partyRepository) {
        this.partyRepository = partyRepository;
    }
    async list(query) {
        const qb = this.partyRepository
            .createQueryBuilder('party')
            .where('party.organization_id = :organizationId', { organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID })
            .andWhere('party.deleted_at IS NULL')
            .andWhere("party.party_type IN ('customer', 'both')");
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
    async createCustomer(payload) {
        const customer = this.partyRepository.create({
            organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID,
            partyType: 'customer',
            code: null,
            name: payload.name,
            phone: payload.phone ?? null,
            email: payload.email ?? null,
            addressLine1: payload.address ?? null,
            isActive: true,
        });
        const savedCustomer = await this.partyRepository.save(customer);
        return (0, mappers_1.toPartyType)(savedCustomer);
    }
    async updateCustomer(id, payload) {
        const customer = await this.partyRepository.findOne({
            where: { id, organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID, deletedAt: (0, typeorm_2.IsNull)() },
        });
        if (!customer || (customer.partyType !== 'customer' && customer.partyType !== 'both')) {
            throw new common_1.NotFoundException('Customer not found');
        }
        if (payload.name !== undefined) {
            customer.name = payload.name;
        }
        if (payload.phone !== undefined) {
            customer.phone = payload.phone;
        }
        if (payload.email !== undefined) {
            customer.email = payload.email;
        }
        if (payload.address !== undefined) {
            customer.addressLine1 = payload.address;
        }
        const savedCustomer = await this.partyRepository.save(customer);
        return (0, mappers_1.toPartyType)(savedCustomer);
    }
    async archive(id) {
        const result = await this.partyRepository.softDelete({ id, organizationId: persistence_scope_1.DEFAULT_ORGANIZATION_ID });
        if (!result.affected) {
            throw new common_1.NotFoundException('Customer not found');
        }
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
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entities_1.PartyOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CustomersService);
//# sourceMappingURL=customers.service.js.map