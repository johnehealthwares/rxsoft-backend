export class Permission {
  constructor(
    public readonly id: string,
    public readonly resource: string,
    public readonly action: string,
    public readonly code: string,
  ) {}
}
