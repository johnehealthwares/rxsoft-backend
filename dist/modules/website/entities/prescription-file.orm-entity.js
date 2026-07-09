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
exports.PrescriptionFileOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let PrescriptionFileOrmEntity = class PrescriptionFileOrmEntity {
    id;
    prescription;
    fileUrl;
    mime;
    originalName;
    size;
    createdAt;
};
exports.PrescriptionFileOrmEntity = PrescriptionFileOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PrescriptionFileOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)('PrescriptionOrmEntity', 'files', { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'prescription_id' }),
    __metadata("design:type", Function)
], PrescriptionFileOrmEntity.prototype, "prescription", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'file_url', type: 'text' }),
    __metadata("design:type", String)
], PrescriptionFileOrmEntity.prototype, "fileUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], PrescriptionFileOrmEntity.prototype, "mime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'original_name', type: 'text' }),
    __metadata("design:type", String)
], PrescriptionFileOrmEntity.prototype, "originalName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], PrescriptionFileOrmEntity.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], PrescriptionFileOrmEntity.prototype, "createdAt", void 0);
exports.PrescriptionFileOrmEntity = PrescriptionFileOrmEntity = __decorate([
    (0, typeorm_1.Entity)('prescription_files')
], PrescriptionFileOrmEntity);
//# sourceMappingURL=prescription-file.orm-entity.js.map