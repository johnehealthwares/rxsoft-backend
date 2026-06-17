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
exports.EventRegistrationOrmEntity = void 0;
const typeorm_1 = require("typeorm");
let EventRegistrationOrmEntity = class EventRegistrationOrmEntity {
    id;
    eventId;
    name;
    phone;
    email;
    lga;
    ward;
    attended;
    createdAt;
};
exports.EventRegistrationOrmEntity = EventRegistrationOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EventRegistrationOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_id', type: 'text' }),
    __metadata("design:type", String)
], EventRegistrationOrmEntity.prototype, "eventId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EventRegistrationOrmEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], EventRegistrationOrmEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventRegistrationOrmEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventRegistrationOrmEntity.prototype, "lga", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", Object)
], EventRegistrationOrmEntity.prototype, "ward", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], EventRegistrationOrmEntity.prototype, "attended", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], EventRegistrationOrmEntity.prototype, "createdAt", void 0);
exports.EventRegistrationOrmEntity = EventRegistrationOrmEntity = __decorate([
    (0, typeorm_1.Entity)('apm_event_registrations')
], EventRegistrationOrmEntity);
//# sourceMappingURL=event-registration.orm-entity.js.map