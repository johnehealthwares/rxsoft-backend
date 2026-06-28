import { Role } from "./role.entity";

export class User {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly username: string,
    public passwordHash: string,
    public readonly isActive: boolean,
    public roleCodes: string[] = [],
    public roles: Role[] = [],
    public readonly phone?: string,
    public readonly email?: string,
  ) {}
}
