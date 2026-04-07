export class Pharmaceutics {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly clinicalName: string,
    public readonly drugClass: string,
    public readonly pharmaceutics: string,
    public readonly indications: string,
    public readonly contraindications: string,
    public readonly mechanism: string,
  ) {}
}
