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
exports.AttributeSyncService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AttributeSyncService = class AttributeSyncService {
    attributeRepo;
    valueRepo;
    constructor(attributeRepo, valueRepo) {
        this.attributeRepo = attributeRepo;
        this.valueRepo = valueRepo;
    }
    async sync(entityType, entities, rows, config) {
        const eavColumns = config.eav ?? [];
        if (!eavColumns.length) {
            return;
        }
        const entityByUuid = new Map(entities.map((e) => [e.uuid, e]));
        const attributes = await this.attributeRepo.find();
        const attributeByCode = new Map(attributes.map((a) => [a.code, a]));
        const entityUuids = entities.map((e) => e.uuid);
        const existingValues = await this.valueRepo.find({
            where: { entityType, entityUuid: (0, typeorm_1.In)(entityUuids) },
        });
        const valueCache = new Map(existingValues.map((v) => [
            `${v.entityUuid}:${v.attributeId}`,
            v,
        ]));
        const valuesToSave = [];
        for (const row of rows) {
            const entity = entityByUuid.get(row.uuid);
            if (!entity)
                continue;
            for (const code of eavColumns) {
                const value = row[code];
                if (value === undefined || value === null) {
                    continue;
                }
                const attribute = attributeByCode.get(code);
                if (!attribute) {
                    throw new Error(`Attribute ${code} not found`);
                }
                const key = `${entity.uuid}:${attribute.id}`;
                const existing = valueCache.get(key);
                if (existing) {
                    existing.value = String(value);
                    valuesToSave.push(existing);
                }
                else {
                    const newVal = {
                        entityType,
                        entityUuid: entity.uuid,
                        attributeId: attribute.id,
                        value: String(value),
                    };
                    valuesToSave.push(newVal);
                }
            }
        }
        if (valuesToSave.length) {
            await this.valueRepo.save(valuesToSave);
        }
    }
};
exports.AttributeSyncService = AttributeSyncService;
exports.AttributeSyncService = AttributeSyncService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object])
], AttributeSyncService);
//# sourceMappingURL=attribute-sync.service.js.map