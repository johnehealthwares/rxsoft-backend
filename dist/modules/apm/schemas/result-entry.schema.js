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
exports.ResultEntrySchemaFactory = exports.ResultEntrySchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ResultEntrySchema = class ResultEntrySchema {
    id;
    pollingUnitId;
    lgaId;
    wardId;
    apmVotes;
    pdpVotes;
    apcVotes;
    otherVotes;
    totalVotes;
    registeredVoters;
    photoUrl;
    enteredBy;
    status;
    notes;
};
exports.ResultEntrySchema = ResultEntrySchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ResultEntrySchema.prototype, "pollingUnitId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ResultEntrySchema.prototype, "lgaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ResultEntrySchema.prototype, "wardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResultEntrySchema.prototype, "apmVotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResultEntrySchema.prototype, "pdpVotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResultEntrySchema.prototype, "apcVotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResultEntrySchema.prototype, "otherVotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResultEntrySchema.prototype, "totalVotes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 0 }),
    __metadata("design:type", Number)
], ResultEntrySchema.prototype, "registeredVoters", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ResultEntrySchema.prototype, "photoUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ResultEntrySchema.prototype, "enteredBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'draft' }),
    __metadata("design:type", String)
], ResultEntrySchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ResultEntrySchema.prototype, "notes", void 0);
exports.ResultEntrySchema = ResultEntrySchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_result_entries', timestamps: true })
], ResultEntrySchema);
exports.ResultEntrySchemaFactory = mongoose_1.SchemaFactory.createForClass(ResultEntrySchema);
//# sourceMappingURL=result-entry.schema.js.map