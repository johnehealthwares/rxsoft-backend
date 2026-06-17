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
exports.CitizenFeedbackSchemaFactory = exports.CitizenFeedbackSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CitizenFeedbackSchema = class CitizenFeedbackSchema {
    id;
    name;
    phone;
    email;
    lga;
    message;
    sentiment;
    topic;
};
exports.CitizenFeedbackSchema = CitizenFeedbackSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CitizenFeedbackSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CitizenFeedbackSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CitizenFeedbackSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CitizenFeedbackSchema.prototype, "lga", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CitizenFeedbackSchema.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CitizenFeedbackSchema.prototype, "sentiment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CitizenFeedbackSchema.prototype, "topic", void 0);
exports.CitizenFeedbackSchema = CitizenFeedbackSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_citizen_feedback', timestamps: true })
], CitizenFeedbackSchema);
exports.CitizenFeedbackSchemaFactory = mongoose_1.SchemaFactory.createForClass(CitizenFeedbackSchema);
//# sourceMappingURL=citizen-feedback.schema.js.map