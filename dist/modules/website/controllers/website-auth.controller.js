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
const auth_response_dto_1 = require("../../identity/dto/auth-response.dto");
const login_dto_1 = require("../../identity/dto/login.dto");
const create_user_use_case_1 = require("../../identity/services/create-user.use-case");
const login_use_case_1 = require("../../identity/services/login.use-case");
const website_dto_1 = require("../dto/website.dto");
const persistence_scope_1 = require("../../../shared/constants/persistence-scope");
let WebsiteAuthController = class WebsiteAuthController {
    createUserUseCase;
    loginUseCase;
    constructor(createUserUseCase, loginUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.loginUseCase = loginUseCase;
    }
    async register(dto) {
        await this.createUserUseCase.execute({
            username: dto.username,
            password: dto.password,
            phone: dto.phone,
            roleCodes: ['website_user'],
        }, persistence_scope_1.DEFAULT_ORGANIZATION_ID);
        return this.loginUseCase.execute({ username: dto.username, password: dto.password });
    }
    async login(dto) {
        return this.loginUseCase.execute(dto);
    }
};
exports.WebsiteAuthController = WebsiteAuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new website user' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: auth_response_dto_1.AuthResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [website_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], WebsiteAuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login for website users' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: auth_response_dto_1.AuthResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], WebsiteAuthController.prototype, "login", null);
exports.WebsiteAuthController = WebsiteAuthController = __decorate([
    (0, swagger_1.ApiTags)('website-auth'),
    (0, common_1.Controller)('website/auth'),
    __metadata("design:paramtypes", [create_user_use_case_1.CreateUserUseCase,
        login_use_case_1.LoginUseCase])
], WebsiteAuthController);
//# sourceMappingURL=website-auth.controller.js.map