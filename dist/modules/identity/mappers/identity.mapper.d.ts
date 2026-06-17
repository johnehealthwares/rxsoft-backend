import { Permission } from '../domains/permission.entity';
import { Role } from '../domains/role.entity';
import { User } from '../domains/user.entity';
import { PermissionOrmEntity } from '../entities/permission.orm-entity';
import { RoleOrmEntity } from '../entities/role.orm-entity';
import { UserOrmEntity } from '../entities/user.orm-entity';
export declare class IdentityMapper {
    static toDomainPermission(orm: PermissionOrmEntity): Permission;
    static toDomainRole(orm: RoleOrmEntity): Role;
    static toDomainUser(orm: UserOrmEntity): User;
}
