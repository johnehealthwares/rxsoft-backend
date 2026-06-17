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
exports.ResultEntryOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let ResultEntryOrmEntity = class ResultEntryOrmEntity {
    id;
    pollingUnitId;
    lgaId;
    wardId;
    apmVotes;
    pdpVotes;
    apcVotes;
    otherVotes;
    totalVotes;
    registeredVoters;
    photoUrl;
    enteredBy;
    status;
    notes;
    createdAt;
    updatedAt;
};
exports.ResultEntryOrmEntity = ResultEntryOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ResultEntryOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'polling_unit_id', type: 'text' }),
    __metadata("design:type", String)
], ResultEntryOrmEntity.prototype, "pollingUnitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lga_id', type: 'text' }),
    __metadata("design:type", String)
], ResultEntryOrmEntity.prototype, "lgaId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ward_id', type: 'text' }),
    __metadata("design:type", String)
], ResultEntryOrmEntity.prototype, "wardId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apm_votes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ResultEntryOrmEntity.prototype, "apmVotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pdp_votes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ResultEntryOrmEntity.prototype, "pdpVotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apc_votes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ResultEntryOrmEntity.prototype, "apcVotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'other_votes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ResultEntryOrmEntity.prototype, "otherVotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_votes', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ResultEntryOrmEntity.prototype, "totalVotes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'registered_voters', type: 'int', default: 0 }),
    __metadata("design:type", Number)
], ResultEntryOrmEntity.prototype, "registeredVoters", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'photo_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ResultEntryOrmEntity.prototype, "photoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'entered_by', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ResultEntryOrmEntity.prototype, "enteredBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'draft' }),
    __metadata("design:type", String)
], ResultEntryOrmEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], ResultEntryOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ResultEntryOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ResultEntryOrmEntity.prototype, "updatedAt", void 0);
exports.ResultEntryOrmEntity = ResultEntryOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_result_entries')
], ResultEntryOrmEntity);
//# sourceMappingURL=result-entry.orm-entity.js.map