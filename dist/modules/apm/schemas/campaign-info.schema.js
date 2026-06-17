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
exports.CampaignInfoSchemaFactory = exports.CampaignInfoSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CampaignInfoSchema = class CampaignInfoSchema {
    id;
    key;
    value;
    label;
    displayOrder;
    isActive;
};
exports.CampaignInfoSchema = CampaignInfoSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CampaignInfoSchema.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CampaignInfoSchema.prototype, "value", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CampaignInfoSchema.prototype, "label", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CampaignInfoSchema.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], CampaignInfoSchema.prototype, "isActive", void 0);
exports.CampaignInfoSchema = CampaignInfoSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_campaign_info', timestamps: true })
], CampaignInfoSchema);
exports.CampaignInfoSchemaFactory = mongoose_1.SchemaFactory.createForClass(CampaignInfoSchema);
//# sourceMappingURL=campaign-info.schema.js.map