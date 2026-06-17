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
exports.EventSchemaFactory = exports.EventSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let EventSchema = class EventSchema {
    id;
    title;
    description;
    location;
    eventDate;
    eventTime;
    category;
    imageUrl;
    maxAttendees;
    isPublished;
    deletedAt;
};
exports.EventSchema = EventSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], EventSchema.prototype, "title", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "eventDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "eventTime", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "imageUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "maxAttendees", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], EventSchema.prototype, "isPublished", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, default: null }),
    __metadata("design:type", Object)
], EventSchema.prototype, "deletedAt", void 0);
exports.EventSchema = EventSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_events', timestamps: true })
], EventSchema);
exports.EventSchemaFactory = mongoose_1.SchemaFactory.createForClass(EventSchema);
//# sourceMappingURL=event.schema.js.map