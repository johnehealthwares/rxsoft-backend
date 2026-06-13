// attribute-sync.service.ts

import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';

@Injectable()
export class AttributeSyncService {
  constructor(
    private readonly attributeRepo: any,
    private readonly valueRepo: any,
  ) {}

  async sync(
    entityType: string,
    entities: any[],
    rows: Record<string, any>[],
    config: any,
  ) {
    const eavColumns = config.eav ?? [];

    if (!eavColumns.length) {
      return;
    }

    const entityByUuid = new Map(entities.map((e) => [e.uuid, e]));

    const attributes = await this.attributeRepo.find();

    const attributeByCode = new Map(attributes.map((a) => [a.code, a]));

    const entityUuids = entities.map((e) => e.uuid);

    // preload existing attribute values for these entities
    const existingValues = await this.valueRepo.find({
      where: { entityType, entityUuid: In(entityUuids) },
    });

    const valueCache = new Map(
      existingValues.map((v: any) => [
        `${v.entityUuid}:${v.attributeId}`,
        v,
      ]),
    );

    const valuesToSave: any[] = [];

    for (const row of rows) {
      const entity = entityByUuid.get(row.uuid);

      if (!entity) continue;

      for (const code of eavColumns) {
        const value = row[code];

        if (value === undefined || value === null) {
          continue;
        }

        const attribute: any = attributeByCode.get(code);

        if (!attribute) {
          throw new Error(`Attribute ${code} not found`);
        }

        const key = `${entity.uuid}:${attribute.id}`;

        const existing: any = valueCache.get(key);

        if (existing) {
          existing.value = String(value);
          valuesToSave.push(existing);
        } else {
          const newVal = {
            entityType,
            entityUuid: entity.uuid,
            attributeId: attribute.id,
            value: String(value),
          };

          valuesToSave.push(newVal);
        }
      }
    }

    if (valuesToSave.length) {
      await this.valueRepo.save(valuesToSave);
    }
  }
}