import { RoleOrmEntity } from './role.orm-entity';
export declare class PermissionOrmEntity {
    id: string;
    code: string;
    resource: string;
    action: string;
    description: string | null;
    roles: RoleOrmEntity[];
    createdAt: Date;
    updatedAt: Date;
}
