"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManufacturersModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const manufacturers_controller_1 = require("./controllers/manufacturers.controller");
const manufacturer_orm_entity_1 = require("./entities/manufacturer.orm-entity");
const manufacturers_service_1 = require("./services/manufacturers.service");
let ManufacturersModule = class ManufacturersModule {
};
exports.ManufacturersModule = ManufacturersModule;
exports.ManufacturersModule = ManufacturersModule = __decorate([
    (0, common_1.Module)({
        imports: [jwt_1.JwtModule.register({}), typeorm_1.TypeOrmModule.forFeature([manufacturer_orm_entity_1.ManufacturerOrmEntity])],
        controllers: [manufacturers_controller_1.ManufacturersController],
        providers: [manufacturers_service_1.ManufacturersService],
    })
], ManufacturersModule);
//# sourceMappingURL=manufacturers.module.js.map