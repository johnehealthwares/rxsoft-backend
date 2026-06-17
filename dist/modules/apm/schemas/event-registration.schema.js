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
exports.EventRegistrationSchemaFactory = exports.EventRegistrationSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let EventRegistrationSchema = class EventRegistrationSchema {
    id;
    eventId;
    name;
    phone;
    email;
    lga;
    ward;
    attended;
};
exports.EventRegistrationSchema = EventRegistrationSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], EventRegistrationSchema.prototype, "eventId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], EventRegistrationSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], EventRegistrationSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventRegistrationSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventRegistrationSchema.prototype, "lga", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventRegistrationSchema.prototype, "ward", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], EventRegistrationSchema.prototype, "attended", void 0);
exports.EventRegistrationSchema = EventRegistrationSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_event_registrations', timestamps: true })
], EventRegistrationSchema);
exports.EventRegistrationSchemaFactory = mongoose_1.SchemaFactory.createForClass(EventRegistrationSchema);
//# sourceMappingURL=event-registration.schema.js.map