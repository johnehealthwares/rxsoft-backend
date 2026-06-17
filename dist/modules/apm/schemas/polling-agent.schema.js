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
exports.PollingAgentSchemaFactory = exports.PollingAgentSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let PollingAgentSchema = class PollingAgentSchema {
    id;
    pollingUnitId;
    name;
    phone;
    role;
    trainingStatus;
    assignedAt;
    notes;
    isActive;
};
exports.PollingAgentSchema = PollingAgentSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PollingAgentSchema.prototype, "pollingUnitId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PollingAgentSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], PollingAgentSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'agent' }),
    __metadata("design:type", String)
], PollingAgentSchema.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: 'untrained' }),
    __metadata("design:type", String)
], PollingAgentSchema.prototype, "trainingStatus", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], PollingAgentSchema.prototype, "assignedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], PollingAgentSchema.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], PollingAgentSchema.prototype, "isActive", void 0);
exports.PollingAgentSchema = PollingAgentSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_polling_agents', timestamps: true })
], PollingAgentSchema);
exports.PollingAgentSchemaFactory = mongoose_1.SchemaFactory.createForClass(PollingAgentSchema);
//# sourceMappingURL=polling-agent.schema.js.map