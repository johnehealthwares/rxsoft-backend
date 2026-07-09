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
var DatabaseSeeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSeeedService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
let DatabaseSeeedService = DatabaseSeeedService_1 = class DatabaseSeeedService {
    configService;
    dataSource;
    logger = new common_1.Logger(DatabaseSeeedService_1.name);
    constructor(configService, dataSource) {
        this.configService = configService;
        this.dataSource = dataSource;
    }
    async runSeedsOnStartup() {
        const shouldSeed = this.configService.get('SEED_ON_START', 'false') === 'true';
        if (!shouldSeed)
            return;
        this.logger.log('No seeds configured for rxsoft-backend (identity data seeded by rxsoft-identity)');
    }
};
exports.DatabaseSeeedService = DatabaseSeeedService;
exports.DatabaseSeeedService = DatabaseSeeedService = DatabaseSeeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        typeorm_1.DataSource])
], DatabaseSeeedService);
//# sourceMappingURL=seeding.service.js.map