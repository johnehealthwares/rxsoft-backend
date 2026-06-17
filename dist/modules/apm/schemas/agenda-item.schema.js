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
exports.AgendaItemSchemaFactory = exports.AgendaItemSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let AgendaItemSchema = class AgendaItemSchema {
    id;
    title;
    summary;
    description;
    icon;
    imageUrl;
    category;
    displayOrder;
    isActive;
};
exports.AgendaItemSchema = AgendaItemSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], AgendaItemSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AgendaItemSchema.prototype, "summary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AgendaItemSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AgendaItemSchema.prototype, "icon", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AgendaItemSchema.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], AgendaItemSchema.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], AgendaItemSchema.prototype, "displayOrder", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], AgendaItemSchema.prototype, "isActive", void 0);
exports.AgendaItemSchema = AgendaItemSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_agenda_items', timestamps: true })
], AgendaItemSchema);
exports.AgendaItemSchemaFactory = mongoose_1.SchemaFactory.createForClass(AgendaItemSchema);
//# sourceMappingURL=agenda-item.schema.js.map