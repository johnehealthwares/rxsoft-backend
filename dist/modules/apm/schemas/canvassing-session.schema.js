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
exports.CanvassingSessionSchemaFactory = exports.CanvassingSessionSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let CanvassingSessionSchema = class CanvassingSessionSchema {
    id;
    title;
    lgaId;
    wardId;
    teamLead;
    teamSize;
    status;
    scheduledDate;
    completedDate;
    notes;
};
exports.CanvassingSessionSchema = CanvassingSessionSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CanvassingSessionSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], CanvassingSessionSchema.prototype, "lgaId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CanvassingSessionSchema.prototype, "wardId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CanvassingSessionSchema.prototype, "teamLead", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: 1 }),
    __metadata("design:type", Number)
], CanvassingSessionSchema.prototype, "teamSize", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'planned' }),
    __metadata("design:type", String)
], CanvassingSessionSchema.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], CanvassingSessionSchema.prototype, "scheduledDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], CanvassingSessionSchema.prototype, "completedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], CanvassingSessionSchema.prototype, "notes", void 0);
exports.CanvassingSessionSchema = CanvassingSessionSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_canvassing_sessions', timestamps: true })
], CanvassingSessionSchema);
exports.CanvassingSessionSchemaFactory = mongoose_1.SchemaFactory.createForClass(CanvassingSessionSchema);
//# sourceMappingURL=canvassing-session.schema.js.map