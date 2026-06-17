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
exports.DonationSchemaFactory = exports.DonationSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let DonationSchema = class DonationSchema {
    id;
    name;
    email;
    phone;
    amount;
    reference;
    notes;
};
exports.DonationSchema = DonationSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], DonationSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], DonationSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], DonationSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], DonationSchema.prototype, "amount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], DonationSchema.prototype, "reference", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], DonationSchema.prototype, "notes", void 0);
exports.DonationSchema = DonationSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_donations', timestamps: true })
], DonationSchema);
exports.DonationSchemaFactory = mongoose_1.SchemaFactory.createForClass(DonationSchema);
//# sourceMappingURL=donation.schema.js.map