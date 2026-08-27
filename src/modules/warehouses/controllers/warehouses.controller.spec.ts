import { StreamableFile } from '@nestjs/common';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from '../services/warehouses.service';
import { PrintPdfService } from '../../print/services/print-pdf.service';

const listQuery = (overrides: Record<string, unknown> = {}) => ({
  page: 1,
  limit: 20,
  search: undefined,
  sortBy: 'updatedAt',
  sortOrder: 'desc',
  get offset() {
    return (this.page - 1) * this.limit;
  },
  ...overrides,
});

describe('WarehousesController exports', () => {
  const warehousesService = {
    list: jest.fn(),
  } as unknown as WarehousesService;
  const printPdfService = {
    generatePdf: jest.fn(),
  } as unknown as PrintPdfService;

  const controller = new WarehousesController(warehousesService, printPdfService);
  const org = { organizationId: 'org1' } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('exports all warehouse rows as CSV with the org scope and no pagination cap', async () => {
    warehousesService.list = jest
      .fn()
      .mockResolvedValue({
        data: [
          { id: 'w1', code: 'MAIN', name: 'Main Warehouse', isActive: true },
        ],
        total: 1,
      }) as any;

    const csv = await controller.exportCsv(listQuery(), org);

    expect(warehousesService.list).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 1000000 }),
      'org1',
    );
    expect(csv).toContain('id,code,name,isActive');
    expect(csv).toContain('"w1","MAIN","Main Warehouse","true"');
  });

  it('exports a PDF via the print service with all rows', async () => {
    warehousesService.list = jest
      .fn()
      .mockResolvedValue({
        data: [{ id: 'w1', code: 'MAIN', name: 'Main Warehouse' }],
        total: 1,
      }) as any;
    printPdfService.generatePdf = jest
      .fn()
      .mockResolvedValue({ buffer: Buffer.from('%PDF-1.7'), filename: 'warehouses.pdf' }) as any;

    const file = await controller.exportPdf(listQuery(), org);

    expect(warehousesService.list).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 1000000 }),
      'org1',
    );
    expect(printPdfService.generatePdf).toHaveBeenCalledWith(
      expect.stringContaining('<h1>Warehouses Export</h1>'),
      { filename: 'warehouses.pdf' },
    );
    expect(file).toBeInstanceOf(StreamableFile);
  });
});