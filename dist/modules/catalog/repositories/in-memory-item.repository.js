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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryItemRepository = void 0;
const common_1 = require("@nestjs/common");
const item_entity_1 = require("../domains/item.entity");
const item_category_entity_1 = require("../domains/item-category.entity");
let InMemoryItemRepository = class InMemoryItemRepository {
    items = new Map();
    createdAtById = new Map();
    categories = new Map();
    uoms = new Map();
    constructor() {
        const category = new item_category_entity_1.ItemCategory('d76d8e07-6368-4f96-8dd1-cd9b610ce208', 'ANALGESICS', 'Analgesics');
        const uom = { id: 'u1', code: 'UNIT', name: 'Unit', uomType: 'reference', rounding: 1, factor: 1, isActive: true };
        const product = new item_entity_1.Item('7cf2f9c1-e045-46f7-b8e6-d6d218f7dd23', 'org1', 'PCM500', 'Paracetamol 500mg Tablet', 'GEN001', category.id, category, uom.id, null, uom.id, uom, null, uom, '1234567890123', true, true, null, true);
        this.items.set(product.id, product);
        this.categories.set(category.id, category);
        this.uoms.set(uom.id, uom);
        this.createdAtById.set(product.id, new Date('2026-01-01T00:00:00.000Z'));
    }
    async list(query) {
        let items = [...this.items.values()].filter((product) => product.organizationId === query.organizationId && product.isActive);
        if (query.search) {
            const q = query.search.toLowerCase();
            items = items.filter((product) => product.name.toLowerCase().includes(q) || product.code.toLowerCase().includes(q));
        }
        if (query.categoryCode) {
            const categoryCode = query.categoryCode.toLowerCase();
            items = items.filter((product) => product.category.code.toLowerCase() === categoryCode);
        }
        items.sort((a, b) => {
            let left;
            let right;
            if (query.sortBy === 'createdAt') {
                left = this.createdAtById.get(a.id) ?? new Date(0);
                right = this.createdAtById.get(b.id) ?? new Date(0);
            }
            else if (query.sortBy === 'code') {
                left = a.code;
                right = b.code;
            }
            else {
                left = a.name;
                right = b.name;
            }
            const direction = query.sortOrder === 'asc' ? 1 : -1;
            if (left < right)
                return -1 * direction;
            if (left > right)
                return 1 * direction;
            return 0;
        });
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async findById(id, organizationId) {
        const item = this.items.get(id) ?? null;
        if (!item || item.organizationId !== organizationId || !item.isActive) {
            return null;
        }
        return item;
    }
    async findByCode(code, organizationId) {
        return ([...this.items.values()].find((product) => product.code === code && product.organizationId === organizationId && product.isActive) ?? null);
    }
    async findByBarcode(barcode, organizationId) {
        return ([...this.items.values()].find((product) => product.barcode === barcode && product.organizationId === organizationId && product.isActive) ?? null);
    }
    async findCategoryById(id, _organizationId) {
        return this.categories.get(id) ?? null;
    }
    async findUomById(id, _organizationId) {
        return this.uoms.get(id) ?? null;
    }
    async listCategories(query) {
        let items = [...this.categories.values()].map((item) => ({
            id: item.id,
            code: item.code,
            name: item.name,
        }));
        if (query.search) {
            const s = query.search.toLowerCase();
            items = items.filter((item) => item.name.toLowerCase().includes(s) || item.code.toLowerCase().includes(s));
        }
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async listUoms(query) {
        let items = [...this.uoms.values()];
        if (query.search) {
            const s = query.search.toLowerCase();
            items = items.filter((item) => item.name.toLowerCase().includes(s) || (item.code ? item.code.toLowerCase().includes(s) : false));
        }
        const total = items.length;
        return {
            items: items.slice(query.offset, query.offset + query.limit),
            total,
        };
    }
    async findLastCreated(organizationId) {
        const items = [...this.items.values()]
            .filter((p) => p.organizationId === organizationId && p.isActive)
            .sort((a, b) => {
            const da = this.createdAtById.get(a.id) ?? new Date(0);
            const db = this.createdAtById.get(b.id) ?? new Date(0);
            return db.getTime() - da.getTime();
        });
        return items[0] ?? null;
    }
    async getMetrics(query) {
        let items = [...this.items.values()].filter((p) => p.organizationId === query.organizationId);
        if (query.search) {
            const q = query.search.toLowerCase();
            items = items.filter((p) => p.name.toLowerCase().includes(q) || (p.code ? p.code.toLowerCase().includes(q) : false));
        }
        if (query.categoryCode) {
            const cc = query.categoryCode.toLowerCase();
            items = items.filter((p) => p.category?.code?.toLowerCase() === cc);
        }
        return {
            total: items.length,
            active: items.filter((p) => p.isActive).length,
            inactive: items.filter((p) => !p.isActive).length,
            noCategory: items.filter((p) => !p.category?.code || p.category.code.toLowerCase() === 'not found').length,
            noGenericProductCode: items.filter((p) => !p.genericProductCode).length,
        };
    }
    async save(product) {
        this.items.set(product.id, product);
        this.createdAtById.set(product.id, new Date());
        return product;
    }
};
exports.InMemoryItemRepository = InMemoryItemRepository;
exports.InMemoryItemRepository = InMemoryItemRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryItemRepository);
//# sourceMappingURL=in-memory-item.repository.js.map