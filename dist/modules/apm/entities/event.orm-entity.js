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
exports.EventOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const column_transformer_1 = require("../../../shared/utils/column-transformer");
let EventOrmEntity = class EventOrmEntity {
    id;
    title;
    description;
    location;
    eventDate;
    eventTime;
    category;
    imageUrl;
    maxAttendees;
    isPublished;
    createdAt;
    updatedAt;
    deletedAt;
};
exports.EventOrmEntity = EventOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EventOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EventOrmEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_date', nullable: true, type: 'text', transformer: column_transformer_1.DateOrNullTransformer }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_time', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "eventTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_url', type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'max_attendees', type: 'int', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "maxAttendees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_published', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], EventOrmEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EventOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], EventOrmEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', nullable: true }),
    __metadata("design:type", Object)
], EventOrmEntity.prototype, "deletedAt", void 0);
exports.EventOrmEntity = EventOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_events')
], EventOrmEntity);
//# sourceMappingURL=event.orm-entity.js.map