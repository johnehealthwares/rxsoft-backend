// import-registry.service.ts

import { Injectable } from '@nestjs/common';
import { ImportTarget } from './types';

@Injectable()
export class ImportRegistryService {
  private readonly targets =
    new Map<string, ImportTarget>();

  registerTarget(
    entity: string,
    target: ImportTarget,
  ) {
    this.targets.set(entity, target);
  }

  getTarget(
    entity: string,
  ): ImportTarget {
    const target =
      this.targets.get(entity);

    if (!target) {
      throw new Error(
        `No import target registered for ${entity}`,
      );
    }

    return target;
  }

  hasTarget(entity: string): boolean {
    return this.targets.has(entity);
  }
}