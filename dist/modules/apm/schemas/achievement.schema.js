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
exports.AchievementSchemaFactory = exports.AchievementSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AchievementSchema = class AchievementSchema {
    id;
    title;
    summary;
    description;
    category;
    statLabel;
    statValue;
    imageUrl;
    displayOrder;
    isActive;
    deletedAt;
};
exports.AchievementSchema = AchievementSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AchievementSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "statLabel", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "statValue", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], AchievementSchema.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], AchievementSchema.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], AchievementSchema.prototype, "deletedAt", void 0);
exports.AchievementSchema = AchievementSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_achievements', timestamps: true })
], AchievementSchema);
exports.AchievementSchemaFactory = mongoose_1.SchemaFactory.createForClass(AchievementSchema);
//# sourceMappingURL=achievement.schema.js.map