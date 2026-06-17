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
exports.VolunteerAssignmentSchemaFactory = exports.VolunteerAssignmentSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let VolunteerAssignmentSchema = class VolunteerAssignmentSchema {
    id;
    volunteerId;
    lgaId;
    wardId;
    role;
    status;
    assignedAt;
    notes;
};
exports.VolunteerAssignmentSchema = VolunteerAssignmentSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], VolunteerAssignmentSchema.prototype, "volunteerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], VolunteerAssignmentSchema.prototype, "lgaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], VolunteerAssignmentSchema.prototype, "wardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], VolunteerAssignmentSchema.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'active' }),
    __metadata("design:type", String)
], VolunteerAssignmentSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], VolunteerAssignmentSchema.prototype, "assignedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], VolunteerAssignmentSchema.prototype, "notes", void 0);
exports.VolunteerAssignmentSchema = VolunteerAssignmentSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_volunteer_assignments', timestamps: true })
], VolunteerAssignmentSchema);
exports.VolunteerAssignmentSchemaFactory = mongoose_1.SchemaFactory.createForClass(VolunteerAssignmentSchema);
//# sourceMappingURL=volunteer-assignment.schema.js.map