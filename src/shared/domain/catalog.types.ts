export type PharmaceuticsType = {
  id: string;
  organizationId: string;
  code: string;
  commonBrandName: string | null;
  commonGenericName: string | null;
  clinicalName: string | null;
  drugClass: string | null;
  chemicalConstituents: string | null;
  pharmaceutics: string | null;
  indications: string | null;
  contraindications: string | null;
  mechanism: string | null;
  missedDose: string | null;
  drugInteractions: string | null;
  dosage: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type GenericProductType = {
  id: string;
  organizationId: string;
  code: string;
  name: string;
  therapeuticClass: string | null;
  dosageForm: string | null;
  strength: string | null;
  generalUse: string;
  adultDosage: string;
  pediatricDosage: string;
  isPrescriptionRequired: boolean;
  isControlledSubstance: boolean;
  pharmaceutics: PharmaceuticsType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ItemSummaryType = {
  id: string;
  code: string | null;
  name: string;
  barcode: string | null;
  baseUomId: string;
  purchaseUomId: string | null;
  saleUomId: string | null;
  trackLot: boolean;
  trackExpiry: boolean;
  shelfLifeDays: number | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ItemCategoryType = {
  id: string;
  parentId: string | null;
  parent: {
    id: string;
    code: string;
    name: string;
  } | null;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type DrugComponentType = {
  id: string;
  organizationId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type ManufacturerType = {
  id: string;
  organizationId: string;
  code: string | null;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
