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
exports.RapidResponseSchemaFactory = exports.RapidResponseSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let RapidResponseSchema = class RapidResponseSchema {
    id;
    mentionId;
    responseType;
    content;
    publishedAt;
    publishedBy;
    platform;
    effectiveness;
};
exports.RapidResponseSchema = RapidResponseSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], RapidResponseSchema.prototype, "mentionId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'rebuttal' }),
    __metadata("design:type", String)
], RapidResponseSchema.prototype, "responseType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], RapidResponseSchema.prototype, "content", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], RapidResponseSchema.prototype, "publishedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], RapidResponseSchema.prototype, "publishedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], RapidResponseSchema.prototype, "platform", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], RapidResponseSchema.prototype, "effectiveness", void 0);
exports.RapidResponseSchema = RapidResponseSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_rapid_responses', timestamps: true })
], RapidResponseSchema);
exports.RapidResponseSchemaFactory = mongoose_1.SchemaFactory.createForClass(RapidResponseSchema);
//# sourceMappingURL=rapid-response.schema.js.map