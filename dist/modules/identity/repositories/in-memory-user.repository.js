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
exports.InMemoryUserRepository = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../domains/user.entity");
let InMemoryUserRepository = class InMemoryUserRepository {
    users = new Map();
    constructor() {
        const bootstrapUser = new user_entity_1.User('8aa36d1b-0f1f-4f30-93ff-e2e18fce4ac0', 'org1', 'admin', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', true, ['super_admin'], undefined);
        this.users.set(bootstrapUser.id, bootstrapUser);
    }
    async findByUsername(username, organizationId) {
        const user = [...this.users.values()].find((item) => item.username === username && (!organizationId || item.organizationId === organizationId) && item.isActive);
        return user ?? null;
    }
    async findById(id, organizationId) {
        const user = this.users.get(id) ?? null;
        if (!user || (organizationId && user.organizationId !== organizationId) || !user.isActive) {
            return null;
        }
        return user;
    }
    async create(user) {
        this.users.set(user.id, user);
        return user;
    }
    async update(user, organizationId) {
        if (organizationId && user.organizationId !== organizationId) {
            throw new Error('User organization mismatch');
        }
        this.users.set(user.id, user);
        return user;
    }
    async delete(id, organizationId) {
        const user = this.users.get(id);
        if (user && user.organizationId === organizationId) {
            this.users.delete(id);
        }
    }
    async list(offset, limit, organizationId) {
        const items = [...this.users.values()].filter((item) => item.organizationId === organizationId && item.isActive);
        return {
            items: items.slice(offset, offset + limit),
            total: items.length,
        };
    }
};
exports.InMemoryUserRepository = InMemoryUserRepository;
exports.InMemoryUserRepository = InMemoryUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InMemoryUserRepository);
//# sourceMappingURL=in-memory-user.repository.js.map