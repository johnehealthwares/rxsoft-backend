import { DataSource, IsNull, Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import lodash from 'lodash';
import { ProductCategoryOrmEntity } from '../../modules/categories/entities/product-category.orm-entity';
import { GenericProductOrmEntity } from '../../modules/catalog/entities/generic-product.orm-entity';
import { ProductOrmEntity } from '../../modules/catalog/entities/product.orm-entity';
import { PartyOrmEntity } from '../../modules/customers/entities/party.orm-entity';
import { UomOrmEntity } from '../../modules/sales/entities/uom.orm-entity';
import { DEFAULT_ORGANIZATION_ID } from '../../shared/constants/persistence-scope';
import { getSeedData, OdooCategory, OdooPartner, OdooProductTemplate, OdooProductVariant, ParsedBackup } from './medicine-products';

type SeedContext = {
  dataSource: DataSource;
  parsed: ParsedBackup;
  organizationId: string;
  uomRepo: Repository<UomOrmEntity>;
  categoryRepo: Repository<ProductCategoryOrmEntity>;
  genericRepo: Repository<GenericProductOrmEntity>;
  productRepo: Repository<ProductOrmEntity>;
  customerRepo: Repository<PartyOrmEntity>;
  uomCategoryMap: Map<string, string>;
  uomMap: Map<string, string>;
  categoryMap: Map<string, string>;
  genericMap: Record<string, string>;
};

type PharmacologyProfile = {
  drugClass: string;
  mechanism: string;
  indications: string;
  contraindications: string;
  commonSideEffects: string;
  dosageGuidance: string;
};

const seedConfigService = new ConfigService();
const MAX_PRODUCTS_ENV: string | undefined = seedConfigService.get<string>('INITIAL_SEED_MAX_PRODUCTS');
const MAX_CUSTOMERS_ENV: string | undefined = seedConfigService.get<string>('INITIAL_SEED_MAX_CUSTOMERS');

function applyLimit<T>(items: T[], rawLimit: string | undefined): T[] {
  if (!rawLimit) return items;
  const parsed: number = Number(rawLimit);
  if (!Number.isFinite(parsed) || parsed <= 0) return items;
  return items.slice(0, parsed);
}

function normalizeText(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function slug(value: string): string {
  const normalized: string = value
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return normalized || 'X';
}

function truncate(value: string, max: number): string {
  return value.length <= max ? value : value.slice(0, max);
}

function buildCategoryCode(category: OdooCategory): string {
  return truncate(`CAT_${category.id}_${slug(category.name)}`, 32);
}

function buildUomCode(name: string): string {
  return truncate(`UOM_${slug(name)}`, 32);
}

function buildUomCategoryCode(sourceCategoryId: string): string {
  return truncate(`UOM_CAT_${slug(sourceCategoryId)}`, 32);
}

function buildUomCategoryName(sourceCategoryId: string, uoms: ParsedBackup['uoms']): string {
  const reference: ParsedBackup['uoms'][number] | undefined = uoms.find(
    (item) => item.categoryId === sourceCategoryId && item.uomType === 'reference',
  );
  const fallback: ParsedBackup['uoms'][number] | undefined = uoms.find((item) => item.categoryId === sourceCategoryId);
  const baseName: string = reference?.name ?? fallback?.name ?? `Category ${sourceCategoryId}`;
  return normalizeText(`UOM ${baseName}`);
}

function buildGenericCode(genericName: string): string {
  return truncate(`GEN_${slug(genericName)}`, 32);
}

function buildPharmCode(genericName: string): string {
  return truncate(`PHARM_${slug(genericName)}`, 32);
}

function buildProductCode(template: OdooProductTemplate, variant: OdooProductVariant | null): string {
  return truncate(`PRD_${template.id}_${slug(template.name)}`, 32);
}

function extractOldSystemId(code: string | null | undefined, prefix: 'CAT' | 'PRD'): string | null {
  if (!code) return null;
  const match: RegExpMatchArray | null = code.match(new RegExp(`^${prefix}_([^_]+)_`));
  return match?.[1] ?? null;
}

function fallbackGenericFromCategory(categoryName: string): string {
  const lower: string = categoryName.toLowerCase();
  if (lower.includes('analges')) return 'Analgesic';
  if (lower.includes('antibiot')) return 'Antibiotic';
  if (lower.includes('antimal')) return 'Antimalarial';
  if (lower.includes('hypert')) return 'Antihypertensive';
  if (lower.includes('diabet')) return 'Antidiabetic';
  return normalizeText(categoryName).replace(/s$/i, '') || 'Therapeutic Agent';
}

const knownGenerics: string[] = [
  'Artemether/Lumefantrine',
  'Amoxicillin',
  'Paracetamol',
  'Ibuprofen',
  'Metformin',
  'Amlodipine',
  'Levofloxacin',
  'Digoxin',
  'Vitamin C',
];

const dosageTokens: Set<string> = new Set([
  'tablet',
  'tablets',
  'capsule',
  'capsules',
  'syrup',
  'suspension',
  'injection',
  'infusion',
  'cream',
  'ointment',
  'drops',
  'drop',
  'powder',
  'solution',
  'gel',
  'lotion',
  'x1',
  'x10',
  'x20',
  'x100',
]);

function inferGenericName(productName: string, categoryName: string): string {
  const normalized: string = normalizeText(productName);
  const lower: string = normalized.toLowerCase();

  for (const generic of knownGenerics) {
    if (lower.includes(generic.toLowerCase())) {
      return generic;
    }
  }

  const cleaned: string = normalized
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\d+(?:\.\d+)?\s*(mg|mcg|g|ml|iu|%)\b/gi, ' ')
    .replace(/[^a-zA-Z/ ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const tokens: string[] = cleaned.split(' ').filter(Boolean);
  const parts: string[] = [];

  for (const token of tokens) {
    const candidate: string = token.toLowerCase();
    if (dosageTokens.has(candidate)) break;
    if (candidate.length < 2) continue;
    parts.push(token);
    if (parts.length >= 2) break;
  }

  if (parts.length > 0) {
    return parts.join(' ');
  }

  return fallbackGenericFromCategory(categoryName);
}

// Maps generic names to NDF-style clinical summaries used for pharmacology and dosage fields.
function getPharmacologyProfile(genericName: string, categoryName: string): PharmacologyProfile {
  const lower: string = genericName.toLowerCase();

  if (lower.includes('paracetamol')) {
    return {
      drugClass: 'Analgesic / Antipyretic',
      mechanism: 'Inhibits prostaglandin synthesis in the central nervous system.',
      indications: 'Fever and mild to moderate pain.',
      contraindications: 'Severe hepatic impairment and hypersensitivity.',
      commonSideEffects: 'Nausea, rash; hepatotoxicity in overdose.',
      dosageGuidance: 'Adults: 500-1000 mg every 6-8 hours (max 4 g/day).',
    };
  }

  if (lower.includes('ibuprofen')) {
    return {
      drugClass: 'Nonsteroidal Anti-inflammatory Drug (NSAID)',
      mechanism: 'Reversibly inhibits cyclooxygenase (COX) enzymes reducing prostaglandin synthesis.',
      indications: 'Pain, fever, and inflammatory conditions.',
      contraindications: 'Active peptic ulcer disease, severe renal impairment, NSAID hypersensitivity.',
      commonSideEffects: 'Dyspepsia, nausea, dizziness.',
      dosageGuidance: 'Adults: 200-400 mg every 6-8 hours with food.',
    };
  }

  if (lower.includes('amoxicillin')) {
    return {
      drugClass: 'Beta-lactam Antibiotic (Penicillin)',
      mechanism: 'Inhibits bacterial cell wall synthesis by binding penicillin-binding proteins.',
      indications: 'Susceptible respiratory, skin, urinary, and ENT bacterial infections.',
      contraindications: 'Penicillin hypersensitivity.',
      commonSideEffects: 'Diarrhea, rash, nausea.',
      dosageGuidance: 'Adults: 500 mg every 8 hours or 875 mg every 12 hours.',
    };
  }

  if (lower.includes('metformin')) {
    return {
      drugClass: 'Biguanide Antidiabetic',
      mechanism: 'Reduces hepatic glucose production and improves peripheral insulin sensitivity.',
      indications: 'Type 2 diabetes mellitus.',
      contraindications: 'Severe renal impairment, metabolic acidosis.',
      commonSideEffects: 'Gastrointestinal upset, diarrhea, metallic taste.',
      dosageGuidance: 'Adults: 500 mg once/twice daily, titrated with meals.',
    };
  }

  if (lower.includes('amlodipine')) {
    return {
      drugClass: 'Calcium Channel Blocker',
      mechanism: 'Inhibits transmembrane calcium influx in vascular smooth muscle causing vasodilation.',
      indications: 'Hypertension and chronic stable angina.',
      contraindications: 'Known hypersensitivity; caution in severe hypotension.',
      commonSideEffects: 'Peripheral edema, flushing, headache.',
      dosageGuidance: 'Adults: 5-10 mg once daily.',
    };
  }

  if (lower.includes('artemether/lumefantrine')) {
    return {
      drugClass: 'Antimalarial Combination Therapy',
      mechanism: 'Artemether rapidly reduces parasite biomass; lumefantrine clears residual parasites.',
      indications: 'Uncomplicated Plasmodium falciparum malaria.',
      contraindications: 'Hypersensitivity and concomitant strong QT-prolonging agents.',
      commonSideEffects: 'Headache, dizziness, anorexia, abdominal discomfort.',
      dosageGuidance: 'Administer as a 6-dose regimen with fatty meal/milk for absorption.',
    };
  }

  return {
    drugClass: fallbackGenericFromCategory(categoryName),
    mechanism: `Mechanism consistent with ${fallbackGenericFromCategory(categoryName).toLowerCase()} therapeutic activity.`,
    indications: `Clinical use in conditions aligned with ${categoryName}.`,
    contraindications: 'Contraindicated in known hypersensitivity; review patient-specific risks.',
    commonSideEffects: 'Depends on agent profile; common effects may include GI upset or mild CNS symptoms.',
    dosageGuidance: 'Dose per formulation strength, age, and comorbidity; follow local formulary guidance.',
  };
}

function buildPharmacologyNarrative(profile: PharmacologyProfile): string {
  return [
    `Mechanism: ${profile.mechanism}`,
    `Common side effects: ${profile.commonSideEffects}`,
    `Standard dosage guidance: ${profile.dosageGuidance}`,
  ].join(' ');
}

function selectProducts(parsed: ParsedBackup, selectedCategoryIds: Set<string>): OdooProductTemplate[] {
  const filtered: OdooProductTemplate[] = parsed.templates
    .filter((item: OdooProductTemplate) => item.active)
    .filter((item: OdooProductTemplate) => item.productType === 'product' || item.productType === 'consu' || item.productType === null)
    .filter((item: OdooProductTemplate) => (item.categoryId ? selectedCategoryIds.has(item.categoryId) : false));

  return applyLimit(filtered, MAX_PRODUCTS_ENV);
}

function collectCategoryIds(parsed: ParsedBackup, selectedTemplates: OdooProductTemplate[]): Set<string> {
  const byId: Map<string, OdooCategory> = new Map<string, OdooCategory>(parsed.categories.map((item: OdooCategory) => [item.id, item]));
  const ids: Set<string> = new Set<string>();

  for (const template of selectedTemplates) {
    let current: string | null = template.categoryId;
    while (current) {
      if (ids.has(current)) break;
      ids.add(current);
      current = byId.get(current)?.parentId ?? null;
    }
  }

  return ids;
}

async function seedUoms(ctx: SeedContext): Promise<void> {
  console.log('Seeding Units of Measure...');

  const activeUoms = ctx.parsed.uoms.filter((item) => item.active);
  for (const source of activeUoms) {
    const existing: UomOrmEntity | null = await ctx.uomRepo.findOne({
      where: {
        organizationId: ctx.organizationId,
        name: source.name,
      },
    });

    if (existing) {
      ctx.uomMap.set(source.id, existing.id);
      continue;
    }

    const mappedCategoryId: string | undefined = source.categoryId
      ? ctx.uomCategoryMap.get(source.categoryId)
      : undefined;

    if (!mappedCategoryId) {
      continue;
    }

    const created = ctx.uomRepo.create({
      organizationId: ctx.organizationId,
      code: buildUomCode(source.name),
      name: source.name,
      categoryId: mappedCategoryId,
      uomType: source.uomType,
      factor: source.factor,
      rounding: source.rounding,
      isActive: true,
    });
    const saved = await ctx.uomRepo.save(created);
    ctx.uomMap.set(source.id, saved.id);
  }
}

async function seedUomCategories(ctx: SeedContext): Promise<void> {
  console.log('Seeding UOM Categories...');

  const activeUoms = ctx.parsed.uoms.filter((item) => item.active);
  const sourceCategoryIds: string[] = [...new Set(activeUoms.map((item) => item.categoryId).filter((item): item is string => Boolean(item)))];

  const existingRows: Array<{ id: string; code: string; name: string }> = await ctx.dataSource.query(
    `
      SELECT id, code, name
      FROM uom_categories
      WHERE organization_id = $1
    `,
    [ctx.organizationId],
  );

  const existingByCode = new Map(existingRows.map((row) => [row.code, row]));
  const existingByName = new Map(existingRows.map((row) => [row.name, row]));

  for (const sourceCategoryId of sourceCategoryIds) {
    const code: string = buildUomCategoryCode(sourceCategoryId);
    const name: string = buildUomCategoryName(sourceCategoryId, activeUoms);

    const existingByCategoryCode = existingByCode.get(code);
    if (existingByCategoryCode) {
      ctx.uomCategoryMap.set(sourceCategoryId, existingByCategoryCode.id);
      continue;
    }

    const existingByCategoryName = existingByName.get(name);
    if (existingByCategoryName) {
      ctx.uomCategoryMap.set(sourceCategoryId, existingByCategoryName.id);
      continue;
    }

    const insertedRows: Array<{ id: string }> = await ctx.dataSource.query(
      `
        INSERT INTO uom_categories (organization_id, code, name)
        VALUES ($1, $2, $3)
        RETURNING id
      `,
      [ctx.organizationId, code, name],
    );
    const insertedId: string = insertedRows[0].id;
    ctx.uomCategoryMap.set(sourceCategoryId, insertedId);
  }
}

async function seedCategories(ctx: SeedContext): Promise<Record<string, string>> {
  console.log('Seeding Categories... ' + ctx.categoryMap);

  const existingCategories: Array<Pick<ProductCategoryOrmEntity, 'id' | 'code'>> = await ctx.categoryRepo.find({
    select: { id: true, code: true },
    where: { organizationId: ctx.organizationId, deletedAt: IsNull() },
  });

  const categoriesIndex: Record<string, string> = lodash
    .chain(existingCategories)
    .map((category) => {
      const oldSystemId = extractOldSystemId(category.code ?? null, 'CAT');
      return oldSystemId ? { oldSystemId, id: category.id } : null;
    })
    .compact()
    .keyBy('oldSystemId')
    .mapValues('id')
    .value();

  const seedCategories = ctx.parsed.categories.sort((a, b) => {
    if (!a.parentId) return -1;
    if (!b.parentId) return 1;
    return 0;
  });//.filter((item: OdooCategory) => categoriesIndex[buildCategoryCode(item)])
  const created = await Promise.all(seedCategories.filter(source => !categoriesIndex[source.id]).map(async (source) => { //{parentId: oldId}
    console.log({source})
    const newParentId = source.parentId ? categoriesIndex[source.parentId] : null;

    const created = ctx.categoryRepo.create({
      organizationId: ctx.organizationId,
      code: buildCategoryCode(source),
      name: source.name,
      parent: newParentId ? { id: newParentId } as ProductCategoryOrmEntity : null,
    });
    const saved = await ctx.categoryRepo.save(created);
    ctx.categoryMap.set(source.id, saved.id);
    categoriesIndex[source.id] = saved.id;
  }));

  return categoriesIndex;
}

async function seedProducts(
  ctx: SeedContext,
  categoriesIndex: Record<string, string>,
): Promise<void> {
  console.log('Seeding Products...');

  const firstVariantByTemplate: Map<string, OdooProductVariant> = new Map<string, OdooProductVariant>();
  const existingProducts: Array<Pick<ProductOrmEntity, 'id' | 'code'>> = await ctx.productRepo.find({
    select: { id: true, code: true },
    where: { organizationId: ctx.organizationId, deletedAt: IsNull() },
  });

  const productsIndex: Record<string, string> = lodash
    .chain(existingProducts)
    .map((product) => {
      const oldSystemId = extractOldSystemId(product.code ?? null, 'PRD');
      return oldSystemId ? { oldSystemId, id: product.id } : null;
    })
    .compact()
    .keyBy('oldSystemId')
    .mapValues('id')
    .value();

  const templatesToCreate: OdooProductTemplate[] = getSeedData().templates.filter((template) => !productsIndex[template.id]);
  for (const template of templatesToCreate) {
    const categoryId: string | undefined = template.categoryId ? categoriesIndex[template.categoryId] : undefined;
    const baseUomId: string | undefined = template.uomId ? ctx.uomMap.get(template.uomId) : undefined;

    if (!categoryId || !baseUomId) {
      continue;
    }

    const genericId: string | undefined = ctx.genericMap[template.genericDrugCode];
    if (!genericId) {
      continue;
    }
    const variant: OdooProductVariant | null = firstVariantByTemplate.get(template.id) ?? null;
    const productCode: string = buildProductCode(template, variant);
    const product = ctx.productRepo.create({
      organizationId: ctx.organizationId,
      code: productCode,
      name: template.name,
      category: { id: categoryId } as ProductCategoryOrmEntity,
      genericProduct: { id: genericId } as GenericProductOrmEntity,
      baseUomId,
      purchaseUomId: template.purchaseUomId ? (ctx.uomMap.get(template.purchaseUomId) ?? null) : null,
      saleUomId: template.uomId ? (ctx.uomMap.get(template.uomId) ?? null) : null,
      barcode: variant?.barcode ?? null,
      trackLot: template.tracking === 'lot',
      trackExpiry: true,
      shelfLifeDays: 730,
      isActive: true,
    });
    const saved: ProductOrmEntity = await ctx.productRepo.save(product);
    productsIndex[template.id] = saved.id;
  }
}

function buildCustomerAddress(partner: OdooPartner): string | undefined {
  const parts: string[] = [partner.street, partner.city].filter((item: string | null): item is string => Boolean(item));
  if (!parts.length) return undefined;
  return parts.join(', ');
}

async function seedCustomers(ctx: SeedContext): Promise<void> {
  console.log('Seeding Customers...');

  const selected: OdooPartner[] = ctx.parsed.partners
    .filter((item: OdooPartner) => item.active && item.customer)
    ;

  const limited: OdooPartner[] = applyLimit(selected, MAX_CUSTOMERS_ENV);

  for (const partner of limited) {
    const existing: PartyOrmEntity | null = await ctx.customerRepo.findOne({
      where: {
        organizationId: ctx.organizationId,
        partyType: 'customer',
        name: partner.name,
        deletedAt: IsNull(),
      },
    });

    if (existing) {
      continue;
    }

    const customer = ctx.customerRepo.create({
      organizationId: ctx.organizationId,
      partyType: 'customer',
      code: null,
      name: partner.name,
      phone: partner.phone ?? partner.mobile ?? null,
      email: partner.email ?? null,
      addressLine1: buildCustomerAddress(partner) ?? null,
      isActive: true,
    });
    await ctx.customerRepo.save(customer);
  }
}

export async function seedProductsTemplates(
  dataSource: DataSource,
  genericMap: Record<string, string>,
): Promise<void> {
  const parsed: ParsedBackup = getSeedData();
  console.log(
    `Loaded fixtures -> uoms:${parsed.uoms.length}, categories:${parsed.categories.length}, products:${parsed.templates.length}, customers:${parsed.partners.length}`,
  );

  const selectedInitialTemplates: OdooProductTemplate[] = applyLimit(parsed.templates
    .filter((item: OdooProductTemplate) => item.active)
    .filter((item: OdooProductTemplate) => item.productType === 'product' || item.productType === 'consu' || item.productType === null)
    , MAX_PRODUCTS_ENV);


  const ctx: SeedContext = {
    dataSource,
    parsed,
    organizationId: DEFAULT_ORGANIZATION_ID,
    uomRepo: dataSource.getRepository(UomOrmEntity),
    categoryRepo: dataSource.getRepository(ProductCategoryOrmEntity),
    genericRepo: dataSource.getRepository(GenericProductOrmEntity),
    productRepo: dataSource.getRepository(ProductOrmEntity),
    customerRepo: dataSource.getRepository(PartyOrmEntity),
    uomCategoryMap: new Map<string, string>(),
    uomMap: new Map<string, string>(),
    categoryMap: new Map<string, string>(),
    genericMap,
  };

  await seedUomCategories(ctx);
  await seedUoms(ctx);
  const categoriesIndex: Record<string, string> = await seedCategories(ctx);
  await seedProducts(ctx, categoriesIndex);
  await seedCustomers(ctx);

  console.log('Seed Products completed successfully.');
}
