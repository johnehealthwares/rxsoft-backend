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
exports.PollingUnitSchemaFactory = exports.PollingUnitSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PollingUnitSchema = class PollingUnitSchema {
    id;
    code;
    name;
    wardId;
    lgaId;
    registeredVoters;
    pastResultApm;
    pastResultPdp;
    pastResultApc;
    pastResultOther;
    latitude;
    longitude;
    riskLevel;
    conversionStatus;
    assignedAgentName;
    assignedAgentPhone;
    notes;
    isActive;
};
exports.PollingUnitSchema = PollingUnitSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], PollingUnitSchema.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PollingUnitSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PollingUnitSchema.prototype, "wardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PollingUnitSchema.prototype, "lgaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PollingUnitSchema.prototype, "registeredVoters", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PollingUnitSchema.prototype, "pastResultApm", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PollingUnitSchema.prototype, "pastResultPdp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PollingUnitSchema.prototype, "pastResultApc", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], PollingUnitSchema.prototype, "pastResultOther", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PollingUnitSchema.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PollingUnitSchema.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'grey' }),
    __metadata("design:type", String)
], PollingUnitSchema.prototype, "riskLevel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'untouched' }),
    __metadata("design:type", String)
], PollingUnitSchema.prototype, "conversionStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PollingUnitSchema.prototype, "assignedAgentName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PollingUnitSchema.prototype, "assignedAgentPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PollingUnitSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], PollingUnitSchema.prototype, "isActive", void 0);
exports.PollingUnitSchema = PollingUnitSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_polling_units', timestamps: true })
], PollingUnitSchema);
exports.PollingUnitSchemaFactory = mongoose_1.SchemaFactory.createForClass(PollingUnitSchema);
//# sourceMappingURL=polling-unit.schema.js.map