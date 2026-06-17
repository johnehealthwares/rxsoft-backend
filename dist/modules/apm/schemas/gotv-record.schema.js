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
exports.GotvRecordSchemaFactory = exports.GotvRecordSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let GotvRecordSchema = class GotvRecordSchema {
    id;
    pollingUnitId;
    supporterName;
    supporterPhone;
    contacted;
    turnedOut;
    contactedVia;
    contactedAt;
    notes;
};
exports.GotvRecordSchema = GotvRecordSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], GotvRecordSchema.prototype, "pollingUnitId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], GotvRecordSchema.prototype, "supporterName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], GotvRecordSchema.prototype, "supporterPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], GotvRecordSchema.prototype, "contacted", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], GotvRecordSchema.prototype, "turnedOut", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], GotvRecordSchema.prototype, "contactedVia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], GotvRecordSchema.prototype, "contactedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], GotvRecordSchema.prototype, "notes", void 0);
exports.GotvRecordSchema = GotvRecordSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_gotv_records', timestamps: true })
], GotvRecordSchema);
exports.GotvRecordSchemaFactory = mongoose_1.SchemaFactory.createForClass(GotvRecordSchema);
//# sourceMappingURL=gotv-record.schema.js.map