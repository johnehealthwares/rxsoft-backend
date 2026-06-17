"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const categories_controller_1 = require("./controllers/categories.controller");
const categories_service_1 = require("./services/categories.service");
const entities_1 = require("../catalog/entities");
let CategoriesModule = class CategoriesModule {
};
exports.CategoriesModule = CategoriesModule;
exports.CategoriesModule = CategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), typeorm_1.TypeOrmModule.forFeature([entities_1.ItemCategoryOrmEntity])],
        controllers: [categories_controller_1.CategoriesController],
        providers: [categories_service_1.CategoriesService, jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard],
        exports: [categories_service_1.CategoriesService],
    })
], CategoriesModule);
//# sourceMappingURL=categories.module.js.map