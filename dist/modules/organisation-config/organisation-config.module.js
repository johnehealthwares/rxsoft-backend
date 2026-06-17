"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganisationConfigModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const organisation_config_controller_1 = require("./controllers/organisation-config.controller");
const organisation_config_orm_entity_1 = require("./entities/organisation-config.orm-entity");
const organisation_config_service_1 = require("./services/organisation-config.service");
let OrganisationConfigModule = class OrganisationConfigModule {
};
exports.OrganisationConfigModule = OrganisationConfigModule;
exports.OrganisationConfigModule = OrganisationConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([organisation_config_orm_entity_1.OrganisationConfigOrmEntity]),
        ],
        controllers: [organisation_config_controller_1.OrganisationConfigController],
        providers: [organisation_config_service_1.OrganisationConfigService],
        exports: [organisation_config_service_1.OrganisationConfigService],
    })
], OrganisationConfigModule);
//# sourceMappingURL=organisation-config.module.js.map