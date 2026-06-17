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
exports.TypeormUserRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const user_orm_entity_1 = require("../entities/user.orm-entity");
const role_orm_entity_1 = require("../entities/role.orm-entity");
const identity_mapper_1 = require("../mappers/identity.mapper");
let TypeormUserRepository = class TypeormUserRepository {
    userRepository;
    roleRepository;
    constructor(userRepository, roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }
    async findByUsername(username, organizationId) {
        const item = await this.userRepository.findOne({
            where: organizationId ? { username, organizationId, isActive: true } : { username, isActive: true },
            relations: { roles: true },
        });
        return item ? identity_mapper_1.IdentityMapper.toDomainUser(item) : null;
    }
    async findById(id, organizationId) {
        const item = await this.userRepository.findOne({
            where: organizationId ? { id, organizationId, isActive: true } : { id, isActive: true },
            relations: { roles: true },
        });
        return item ? identity_mapper_1.IdentityMapper.toDomainUser(item) : null;
    }
    async create(user) {
        const roles = user.roleCodes.length
            ? await this.roleRepository.find({
                where: user.roleCodes.map((code) => ({ code, organizationId: user.organizationId })),
            })
            : [];
        const entity = this.userRepository.create({
            id: user.id,
            organizationId: user.organizationId,
            username: user.username,
            passwordHash: user.passwordHash,
            isActive: user.isActive,
            phone: user.phone,
            roles,
        });
        const saved = await this.userRepository.save(entity);
        const reloaded = await this.userRepository.findOneOrFail({
            where: { id: saved.id },
            relations: { roles: true },
        });
        return identity_mapper_1.IdentityMapper.toDomainUser(reloaded);
    }
    async update(user, organizationId) {
        const existing = await this.userRepository.findOneOrFail({
            where: organizationId ? { id: user.id, organizationId } : { id: user.id },
            relations: { roles: true },
        });
        const roles = user.roleCodes.length
            ? await this.roleRepository.find({
                where: user.roleCodes.map((code) => ({ code, organizationId: user.organizationId })),
            })
            : [];
        existing.passwordHash = user.passwordHash;
        existing.isActive = user.isActive;
        existing.phone = user.phone;
        existing.roles = roles;
        const saved = await this.userRepository.save(existing);
        const reloaded = await this.userRepository.findOneOrFail({
            where: { id: saved.id },
            relations: { roles: true },
        });
        return identity_mapper_1.IdentityMapper.toDomainUser(reloaded);
    }
    async delete(id, organizationId) {
        const existing = await this.userRepository.findOne({
            where: { id, organizationId },
        });
        if (existing) {
            await this.userRepository.remove(existing);
        }
    }
    async list(offset, limit, organizationId) {
        const [items, total] = await this.userRepository.findAndCount({
            relations: { roles: true },
            where: { organizationId, isActive: true },
            skip: offset,
            take: limit,
            order: { createdAt: 'DESC' },
        });
        return {
            items: items.map(identity_mapper_1.IdentityMapper.toDomainUser.bind(identity_mapper_1.IdentityMapper)),
            total,
        };
    }
};
exports.TypeormUserRepository = TypeormUserRepository;
exports.TypeormUserRepository = TypeormUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(role_orm_entity_1.RoleOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TypeormUserRepository);
//# sourceMappingURL=typeorm-user.repository.js.map