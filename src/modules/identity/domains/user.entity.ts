export class User {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly username: string,
    public passwordHash: string,
    public readonly isActive: boolean,
    public roleCodes: string[] = [],
    public readonly phone?: string,
  ) {}
}
