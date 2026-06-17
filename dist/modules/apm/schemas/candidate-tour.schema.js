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
exports.CandidateTourSchemaFactory = exports.CandidateTourSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CandidateTourSchema = class CandidateTourSchema {
    id;
    title;
    lgaId;
    wardId;
    visitType;
    tourDate;
    description;
    expectedAttendees;
    actualAttendees;
    stakeholdersMet;
    commitments;
    complaints;
    volunteerSignups;
    mediaCoverage;
    notes;
    status;
};
exports.CandidateTourSchema = CandidateTourSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CandidateTourSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CandidateTourSchema.prototype, "lgaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "wardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'rally' }),
    __metadata("design:type", String)
], CandidateTourSchema.prototype, "visitType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "tourDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CandidateTourSchema.prototype, "expectedAttendees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CandidateTourSchema.prototype, "actualAttendees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "stakeholdersMet", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "commitments", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "complaints", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], CandidateTourSchema.prototype, "volunteerSignups", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "mediaCoverage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CandidateTourSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'planned' }),
    __metadata("design:type", String)
], CandidateTourSchema.prototype, "status", void 0);
exports.CandidateTourSchema = CandidateTourSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_candidate_tours', timestamps: true })
], CandidateTourSchema);
exports.CandidateTourSchemaFactory = mongoose_1.SchemaFactory.createForClass(CandidateTourSchema);
//# sourceMappingURL=candidate-tour.schema.js.map