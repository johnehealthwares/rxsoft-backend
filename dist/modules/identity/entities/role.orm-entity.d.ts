import { PermissionOrmEntity } from './permission.orm-entity';
import { UserOrmEntity } from './user.orm-entity';
export declare class RoleOrmEntity {
    id: string;
    organizationId: string;
    code: string;
    name: string;
    description: string | null;
    permissions: PermissionOrmEntity[];
    users: UserOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
