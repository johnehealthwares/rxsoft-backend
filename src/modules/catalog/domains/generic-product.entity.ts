import { Pharmaceutics } from './pharmaceutics.entity';

export class GenericProduct {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly generalUse: string,
    public readonly adultDosage: string,
    public readonly pediatricDosage: string,
    public readonly isPrescriptionRequired: boolean,
    public readonly isControlledSubstance: boolean,
    public readonly pharmaceutics: Pharmaceutics,
  ) {}
}
