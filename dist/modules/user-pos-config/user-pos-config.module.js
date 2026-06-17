"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPosConfigModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const organisation_config_module_1 = require("../organisation-config/organisation-config.module");
const user_pos_config_controller_1 = require("./controllers/user-pos-config.controller");
const user_pos_config_orm_entity_1 = require("./entities/user-pos-config.orm-entity");
const user_pos_config_service_1 = require("./services/user-pos-config.service");
let UserPosConfigModule = class UserPosConfigModule {
};
exports.UserPosConfigModule = UserPosConfigModule;
exports.UserPosConfigModule = UserPosConfigModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({}),
            typeorm_1.TypeOrmModule.forFeature([user_pos_config_orm_entity_1.UserPosConfigOrmEntity]),
            organisation_config_module_1.OrganisationConfigModule,
        ],
        controllers: [user_pos_config_controller_1.UserPosConfigController],
        providers: [user_pos_config_service_1.UserPosConfigService],
        exports: [user_pos_config_service_1.UserPosConfigService],
    })
], UserPosConfigModule);
//# sourceMappingURL=user-pos-config.module.js.map