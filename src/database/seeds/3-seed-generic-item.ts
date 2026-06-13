import { DataSource, Repository } from 'typeorm';
import { DrugComponentOrmEntity, GenericProductOrmEntity, PharmaceuticsOrmEntity } from '../../modules/catalog/entities';
import { genericDrugData } from './generic-drugs';

const organizationId = 'df3b4afd-9955-4617-9a82-264cc73dd8b2';

type SeedCache = {
  componentByName: Map<string, DrugComponentOrmEntity>;
  pharmaceuticsByCode: Map<string, PharmaceuticsOrmEntity>;
  genericByCode: Map<string, GenericProductOrmEntity>;
};

function asNonEmptyString(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed: string = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function buildPharmacologyComponentMap(): Map<string, string[]> {
  const componentNamesByCode = new Map<string, Set<string>>();

  for (const drug of genericDrugData.drugs) {
    const names: string[] = Array.isArray(drug.drugComponentNames) ? drug.drugComponentNames : [];
    const codes: string[] = Array.isArray(drug.pharmaceuticsCode) ? drug.pharmaceuticsCode : [];

    for (const rawCode of codes) {
      const code = asNonEmptyString(rawCode);
      if (!code) continue;

      let bucket = componentNamesByCode.get(code);
      if (!bucket) {
        bucket = new Set<string>();
        componentNamesByCode.set(code, bucket);
      }

      for (const rawName of names) {
        const name = asNonEmptyString(rawName);
        if (name) bucket.add(name);
      }
    }
  }

  const output = new Map<string, string[]>();
  for (const [code, names] of componentNamesByCode.entries()) {
    output.set(code, [...names]);
  }
  return output;
}

async function loadCaches(
  componentRepository: Repository<DrugComponentOrmEntity>,
  pharmacologyRepository: Repository<PharmaceuticsOrmEntity>,
  genericRepository: Repository<GenericProductOrmEntity>,
): Promise<SeedCache> {
  const [components, pharmacologies, generics] = await Promise.all([
    componentRepository.find({ where: { organizationId } }),
    pharmacologyRepository.find({ where: { organizationId }, relations: { drugComponents: true } }),
    genericRepository.find({ where: { organizationId }, relations: { pharmaceutics: true } }),
  ]);

  return {
    componentByName: new Map(components.map((entity) => [entity.name, entity])),
    pharmaceuticsByCode: new Map(pharmacologies.map((entity) => [entity.code, entity])),
    genericByCode: new Map(generics.map((entity) => [entity.code, entity])),
  };
}

export async function seedGenericNames(dataSource: DataSource): Promise<Record<string, string>> {
  const componentRepository = dataSource.getRepository(DrugComponentOrmEntity);
  const pharmacologyRepository = dataSource.getRepository(PharmaceuticsOrmEntity);
  const genericRepository = dataSource.getRepository(GenericProductOrmEntity);

  const cache = await loadCaches(componentRepository, pharmacologyRepository, genericRepository);

  let drugComponents = 0;
  for (const componentName of Object.keys(genericDrugData.drugComponentIndex)) {
    const drugComponentName = asNonEmptyString(componentName);
    if (!drugComponentName || cache.componentByName.has(drugComponentName)) continue;

    const created = componentRepository.create({
      organizationId,
      name: drugComponentName,
    });
    const saved = await componentRepository.save(created);
    cache.componentByName.set(saved.name, saved);
    drugComponents += 1;
  }

  let createdPharmaceutics = 0;
  const componentsByPharmacologyCode = buildPharmacologyComponentMap();

  for (const [rawCode, info] of Object.entries(genericDrugData.pharmaceuticsIndex)) {
    const code = asNonEmptyString(rawCode);
    if (!code || cache.pharmaceuticsByCode.has(code)) continue;
    const componentNames = componentsByPharmacologyCode.get(code) ?? [];
    const componentEntities = componentNames
      .map((name) => cache.componentByName.get(name))
      .filter((entry): entry is DrugComponentOrmEntity => Boolean(entry));

    const created = pharmacologyRepository.create({
      organizationId,
      code,
      clinicalName: info.clinicalName,
      drugClass: info.drugClass,
      pharmaceutics: info.pharmacology,
      indications: info.indications,
      contraindications: info.contraindications,
      mechanism: info.mechanism,
      drugComponents: componentEntities,
    });

    const saved = await pharmacologyRepository.save(created);
    cache.pharmaceuticsByCode.set(saved.code, saved);
    createdPharmaceutics += 1;
  }

  let createdGenerics = 0;
  for (const drug of genericDrugData.drugs) {
    const code = asNonEmptyString(drug.code);
    if (!code || cache.genericByCode.has(code)) continue;

    const pharmacologyCode = drug.pharmaceuticsCode.find((item) => asNonEmptyString(item));
    if (!pharmacologyCode) continue;

    const pharmaceutics = cache.pharmaceuticsByCode.get(pharmacologyCode);
    if (!pharmaceutics) continue;

    const created = genericRepository.create({
      organizationId,
      code,
      name: drug.name,
      generalUse: drug.generalUse,
      adultDosage: drug.adultDosage,
      pediatricDosage: drug.pediatricDosage,
      isPrescriptionRequired: false,
      isControlledSubstance: false,
      pharmaceutics,
    });

    const saved = await genericRepository.save(created);
    cache.genericByCode.set(saved.code, saved);
    createdGenerics += 1;
  }

  console.log(
    `Seeded generic names: created ${drugComponents} components, ${createdPharmaceutics} pharmacology rows, ${createdGenerics} generic drugs.`,
  );

  const map: Record<string, string> = {};
  cache.genericByCode.forEach((g) => {
    map[g.code] = g.id;
  });
  return map;
}
