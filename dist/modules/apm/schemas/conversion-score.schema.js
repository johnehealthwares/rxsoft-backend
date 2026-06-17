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
exports.ConversionScoreSchemaFactory = exports.ConversionScoreSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ConversionScoreSchema = class ConversionScoreSchema {
    id;
    entityType;
    entityId;
    score;
    status;
    lastAssessedAt;
    assessedBy;
    notes;
};
exports.ConversionScoreSchema = ConversionScoreSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ConversionScoreSchema.prototype, "entityType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ConversionScoreSchema.prototype, "entityId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ConversionScoreSchema.prototype, "score", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'grey' }),
    __metadata("design:type", String)
], ConversionScoreSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], ConversionScoreSchema.prototype, "lastAssessedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ConversionScoreSchema.prototype, "assessedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ConversionScoreSchema.prototype, "notes", void 0);
exports.ConversionScoreSchema = ConversionScoreSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_conversion_scores', timestamps: true })
], ConversionScoreSchema);
exports.ConversionScoreSchemaFactory = mongoose_1.SchemaFactory.createForClass(ConversionScoreSchema);
//# sourceMappingURL=conversion-score.schema.js.map