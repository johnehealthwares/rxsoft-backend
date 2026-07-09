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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsiteAuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_proxy_service_1 = require("../../../modules/users-proxy/users-proxy.service");
const website_dto_1 = require("../dto/website.dto");
const party_orm_entity_1 = require("../../../modules/customers/entities/party.orm-entity");
let WebsiteAuthController = class WebsiteAuthController {
    usersProxy;
    partyRepo;
    constructor(usersProxy, partyRepo) {
        this.usersProxy = usersProxy;
        this.partyRepo = partyRepo;
    }
    async register(dto) {
        const authResult = await this.usersProxy.register({
            username: dto.username,
            password: dto.password,
            phone: dto.phone,
            email: dto.email,
        });
        const currentUser = await this.usersProxy.me(authResult.accessToken);
        const existingParty = await this.partyRepo.findOne({ where: { userId: currentUser.sub } });
        if (!existingParty) {
            await this.partyRepo.save(this.partyRepo.create({
                organizationId: currentUser.organizationId ?? 'df3b4afd-9955-4617-9a82-264cc73dd8b2',
                partyType: 'customer',
                name: dto.username,
                phone: dto.phone ?? null,
                email: dto.email ?? null,
                userId: currentUser.sub,
            }));
        }
        return authResult;
    }
    async login(body) {
        return this.usersProxy.login(body.username, body.password);
    }
};
exports.WebsiteAuthController = WebsiteAuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new website user' }),
    (0, swagger_1.ApiResponse)({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], WebsiteAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login for website users' }),
    (0, swagger_1.ApiResponse)({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WebsiteAuthController.prototype, "login", null);
exports.WebsiteAuthController = WebsiteAuthController = __decorate([
    (0, swagger_1.ApiTags)('website-auth'),
    (0, common_1.Controller)('website/auth'),
    __param(1, (0, typeorm_1.InjectRepository)(party_orm_entity_1.PartyOrmEntity)),
    __metadata("design:paramtypes", [users_proxy_service_1.UsersProxyService,
        typeorm_2.Repository])
], WebsiteAuthController);
//# sourceMappingURL=website-auth.controller.js.map