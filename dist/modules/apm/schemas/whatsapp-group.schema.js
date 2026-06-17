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
exports.WhatsAppGroupSchemaFactory = exports.WhatsAppGroupSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let WhatsAppGroupSchema = class WhatsAppGroupSchema {
    id;
    level;
    name;
    parentId;
    description;
    groupLink;
    adminName;
    adminPhone;
    memberCount;
    isActive;
};
exports.WhatsAppGroupSchema = WhatsAppGroupSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], WhatsAppGroupSchema.prototype, "level", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], WhatsAppGroupSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], WhatsAppGroupSchema.prototype, "parentId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], WhatsAppGroupSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], WhatsAppGroupSchema.prototype, "groupLink", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], WhatsAppGroupSchema.prototype, "adminName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], WhatsAppGroupSchema.prototype, "adminPhone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], WhatsAppGroupSchema.prototype, "memberCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], WhatsAppGroupSchema.prototype, "isActive", void 0);
exports.WhatsAppGroupSchema = WhatsAppGroupSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_whatsapp_groups', timestamps: true })
], WhatsAppGroupSchema);
exports.WhatsAppGroupSchemaFactory = mongoose_1.SchemaFactory.createForClass(WhatsAppGroupSchema);
//# sourceMappingURL=whatsapp-group.schema.js.map