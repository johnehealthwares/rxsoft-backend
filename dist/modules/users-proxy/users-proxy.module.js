"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersProxyModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_pos_config_module_1 = require("../user-pos-config/user-pos-config.module");
const auth_proxy_controller_1 = require("./auth-proxy.controller");
const users_proxy_controller_1 = require("./users-proxy.controller");
const roles_proxy_controller_1 = require("./roles-proxy.controller");
const users_proxy_service_1 = require("./users-proxy.service");
let UsersProxyModule = class UsersProxyModule {
};
exports.UsersProxyModule = UsersProxyModule;
exports.UsersProxyModule = UsersProxyModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, jwt_1.JwtModule.register({}), user_pos_config_module_1.UserPosConfigModule],
        controllers: [users_proxy_controller_1.UsersProxyController, auth_proxy_controller_1.AuthProxyController, roles_proxy_controller_1.RolesProxyController],
        providers: [users_proxy_service_1.UsersProxyService],
        exports: [users_proxy_service_1.UsersProxyService],
    })
], UsersProxyModule);
//# sourceMappingURL=users-proxy.module.js.map