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
exports.StakeholderSchemaFactory = exports.StakeholderSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let StakeholderSchema = class StakeholderSchema {
    id;
    name;
    phone;
    email;
    role;
    lgaId;
    wardId;
    affiliation;
    influenceLevel;
    conversionStatus;
    notes;
    isActive;
};
exports.StakeholderSchema = StakeholderSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], StakeholderSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], StakeholderSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], StakeholderSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], StakeholderSchema.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], StakeholderSchema.prototype, "lgaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], StakeholderSchema.prototype, "wardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], StakeholderSchema.prototype, "affiliation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'medium' }),
    __metadata("design:type", String)
], StakeholderSchema.prototype, "influenceLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'untouched' }),
    __metadata("design:type", String)
], StakeholderSchema.prototype, "conversionStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], StakeholderSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], StakeholderSchema.prototype, "isActive", void 0);
exports.StakeholderSchema = StakeholderSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_stakeholders', timestamps: true })
], StakeholderSchema);
exports.StakeholderSchemaFactory = mongoose_1.SchemaFactory.createForClass(StakeholderSchema);
//# sourceMappingURL=stakeholder.schema.js.map