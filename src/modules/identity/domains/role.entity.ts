export class Role {
  constructor(
    public readonly id: string,
    public readonly organizationId: string,
    public readonly code: string,
    public readonly name: string,
    public readonly description: string | null = null,
    public readonly permissionCodes: string[] = [],
  ) {}
}
