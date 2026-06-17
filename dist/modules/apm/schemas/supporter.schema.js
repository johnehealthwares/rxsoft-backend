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
exports.SupporterSchemaFactory = exports.SupporterSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let SupporterSchema = class SupporterSchema {
    id;
    name;
    phone;
    email;
    lga;
    ward;
    interests;
    skills;
    source;
};
exports.SupporterSchema = SupporterSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], SupporterSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], SupporterSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], SupporterSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], SupporterSchema.prototype, "lga", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], SupporterSchema.prototype, "ward", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], SupporterSchema.prototype, "interests", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], SupporterSchema.prototype, "skills", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], SupporterSchema.prototype, "source", void 0);
exports.SupporterSchema = SupporterSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_supporters', timestamps: true })
], SupporterSchema);
exports.SupporterSchemaFactory = mongoose_1.SchemaFactory.createForClass(SupporterSchema);
//# sourceMappingURL=supporter.schema.js.map