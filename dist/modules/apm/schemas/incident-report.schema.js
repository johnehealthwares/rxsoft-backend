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
exports.IncidentReportSchemaFactory = exports.IncidentReportSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let IncidentReportSchema = class IncidentReportSchema {
    id;
    pollingUnitId;
    type;
    description;
    severity;
    reportedBy;
    reportedAt;
    status;
    legalEscalation;
    securityEscalation;
    notes;
};
exports.IncidentReportSchema = IncidentReportSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IncidentReportSchema.prototype, "pollingUnitId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], IncidentReportSchema.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], IncidentReportSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'medium' }),
    __metadata("design:type", String)
], IncidentReportSchema.prototype, "severity", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IncidentReportSchema.prototype, "reportedBy", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], IncidentReportSchema.prototype, "reportedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'open' }),
    __metadata("design:type", String)
], IncidentReportSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], IncidentReportSchema.prototype, "legalEscalation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], IncidentReportSchema.prototype, "securityEscalation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], IncidentReportSchema.prototype, "notes", void 0);
exports.IncidentReportSchema = IncidentReportSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_incident_reports', timestamps: true })
], IncidentReportSchema);
exports.IncidentReportSchemaFactory = mongoose_1.SchemaFactory.createForClass(IncidentReportSchema);
//# sourceMappingURL=incident-report.schema.js.map