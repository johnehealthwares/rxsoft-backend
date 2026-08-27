import { StreamableFile } from '@nestjs/common';
import { ItemsController } from './items.controller';

const item = {
  id: 'it-1',
  code: 'PCM',
  name: 'Paracetamol',
  displayName: 'Paracetamol',
  visibility: 'default',
  category: { id: 'c1', code: 'ANALGESICS', name: 'Analgesics' },
  genericProductCode: null,
  categoryId: 'c1',
  baseUomId: 'u1',
  purchaseUomId: null,
  saleUomId: null,
  baseUom: null,
  purchaseUom: null,
  saleUom: null,
  barcode: null,
  alias: null,
  trackLot: true,
  trackExpiry: true,
  shelfLifeDays: null,
  isActive: true,
  imageUrl: null,
  smallImageUrl: null,
  mediumImageUrl: null,
  largeImageUrl: null,
};

const listQuery = (overrides: Record<string, unknown> = {}) => ({
  page: 1,
  limit: 20,
  search: undefined,
  sortBy: 'name',
  sortOrder: 'asc',
  get offset() {
    return (this.page - 1) * this.limit;
  },
  ...overrides,
});

describe('ItemsController exports', () => {
  const listItemsUseCase = { execute: jest.fn() };
  const printPdfService = { generatePdf: jest.fn() };

  const controller = new ItemsController(
    listItemsUseCase as any,
    {} as any, // listItemDependenciesUseCase
    {} as any, // getItemUseCase
    {} as any, // createItemUseCase
    {} as any, // updateItemUseCase
    {} as any, // patchItemUseCase
    { getByCode: jest.fn(() => null) } as any, // genericDrugCache
    {} as any, // organisationItemsService
    {} as any, // itemRepo
    {} as any, // uomRepo
    {} as any, // itemRepository
    printPdfService as any,
  );

  const org = { organizationId: 'org1' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    listItemsUseCase.execute.mockResolvedValue({ items: [item], total: 1 });
  });

  it('exports all item rows as CSV (response-shaped, no pagination cap)', async () => {
    const csv = await controller.exportCsv(listQuery(), org);

    expect(listItemsUseCase.execute).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 1000000 }),
      'org1',
    );
    expect(csv).toContain('id,code,name,displayName');
    expect(csv).toContain('"it-1","PCM","Paracetamol"');
  });

  it('exports all item rows as a PDF stream', async () => {
    printPdfService.generatePdf.mockResolvedValue({
      buffer: Buffer.from('%PDF-1.7'),
      filename: 'items.pdf',
    });

    const file = await controller.exportPdf(listQuery(), org);

    expect(printPdfService.generatePdf).toHaveBeenCalledWith(
      expect.stringContaining('<h1>Items Export</h1>'),
      { filename: 'items.pdf' },
    );
    expect(file).toBeInstanceOf(StreamableFile);
  });
});