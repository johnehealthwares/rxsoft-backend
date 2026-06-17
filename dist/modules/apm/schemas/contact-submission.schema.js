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
exports.ContactSubmissionSchemaFactory = exports.ContactSubmissionSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let ContactSubmissionSchema = class ContactSubmissionSchema {
    id;
    name;
    email;
    phone;
    subject;
    message;
    read;
};
exports.ContactSubmissionSchema = ContactSubmissionSchema;
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ContactSubmissionSchema.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ContactSubmissionSchema.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: null }),
    __metadata("design:type", Object)
], ContactSubmissionSchema.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ContactSubmissionSchema.prototype, "subject", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], ContactSubmissionSchema.prototype, "message", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], ContactSubmissionSchema.prototype, "read", void 0);
exports.ContactSubmissionSchema = ContactSubmissionSchema = __decorate([
    (0, mongoose_1.Schema)({ collection: 'apm_contact_submissions', timestamps: true })
], ContactSubmissionSchema);
exports.ContactSubmissionSchemaFactory = mongoose_1.SchemaFactory.createForClass(ContactSubmissionSchema);
//# sourceMappingURL=contact-submission.schema.js.map