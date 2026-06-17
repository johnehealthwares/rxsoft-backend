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
exports.IssueReportSchemaFactory = exports.IssueReportSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let IssueReportSchema = class IssueReportSchema {
    id;
    name;
    phone;
    email;
    lga;
    ward;
    category;
    description;
    status;
};
exports.IssueReportSchema = IssueReportSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], IssueReportSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IssueReportSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IssueReportSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IssueReportSchema.prototype, "lga", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IssueReportSchema.prototype, "ward", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IssueReportSchema.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], IssueReportSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IssueReportSchema.prototype, "status", void 0);
exports.IssueReportSchema = IssueReportSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_issue_reports', timestamps: true })
], IssueReportSchema);
exports.IssueReportSchemaFactory = mongoose_1.SchemaFactory.createForClass(IssueReportSchema);
//# sourceMappingURL=issue-report.schema.js.map