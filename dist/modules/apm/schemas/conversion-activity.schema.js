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
exports.ConversionActivitySchemaFactory = exports.ConversionActivitySchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ConversionActivitySchema = class ConversionActivitySchema {
    id;
    stakeholderId;
    type;
    notes;
    outcome;
    conductedBy;
    conductedAt;
    followUpDate;
};
exports.ConversionActivitySchema = ConversionActivitySchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ConversionActivitySchema.prototype, "stakeholderId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ConversionActivitySchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ConversionActivitySchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ConversionActivitySchema.prototype, "outcome", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ConversionActivitySchema.prototype, "conductedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], ConversionActivitySchema.prototype, "conductedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], ConversionActivitySchema.prototype, "followUpDate", void 0);
exports.ConversionActivitySchema = ConversionActivitySchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_conversion_activities', timestamps: true })
], ConversionActivitySchema);
exports.ConversionActivitySchemaFactory = mongoose_1.SchemaFactory.createForClass(ConversionActivitySchema);
//# sourceMappingURL=conversion-activity.schema.js.map