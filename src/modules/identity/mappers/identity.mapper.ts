import { Permission } from '../domains/permission.entity';
import { Role } from '../domains/role.entity';
import { User } from '../domains/user.entity';
import { PermissionOrmEntity } from '../entities/permission.orm-entity';
import { RoleOrmEntity } from '../entities/role.orm-entity';
import { UserOrmEntity } from '../entities/user.orm-entity';

export class IdentityMapper {
  static toDomainPermission(orm: PermissionOrmEntity): Permission {
    return new Permission(orm.id, orm.resource, orm.action, orm.code);
  }

  static toDomainRole(orm: RoleOrmEntity): Role {
    const permissionCodes = (orm.permissions ?? []).map((permission) => permission.code);
    return new Role(orm.id, orm.code, orm.name, permissionCodes);
  }

  static toDomainUser(orm: UserOrmEntity): User {
    const roleCodes = (orm.roles ?? []).map((role) => role.code);
    return new User(orm.id, orm.organizationId, orm.username, orm.passwordHash, orm.isActive, roleCodes);
  }
}
