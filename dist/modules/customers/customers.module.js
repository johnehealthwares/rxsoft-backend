"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const customers_controller_1 = require("./controllers/customers.controller");
const suppliers_controller_1 = require("./controllers/suppliers.controller");
const customers_service_1 = require("./services/customers.service");
const suppliers_service_1 = require("./services/suppliers.service");
const entities_1 = require("./entities");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), typeorm_1.TypeOrmModule.forFeature([entities_1.PartyOrmEntity])],
        controllers: [customers_controller_1.CustomersController, suppliers_controller_1.SuppliersController],
        providers: [customers_service_1.CustomersService, suppliers_service_1.SuppliersService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
        exports: [customers_service_1.CustomersService, suppliers_service_1.SuppliersService],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map