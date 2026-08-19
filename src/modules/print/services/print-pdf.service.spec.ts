import { PrintPdfService } from './print-pdf.service';

jest.mock('puppeteer-core', () => {
  const mockPage = {
    setContent: jest.fn().mockResolvedValue(undefined),
    pdf: jest.fn().mockResolvedValue(Buffer.from('pdf-bytes')),
  };
  const mockBrowser = {
    newPage: jest.fn().mockResolvedValue(mockPage),
    close: jest.fn().mockResolvedValue(undefined),
  };
  return {
    __esModule: true,
    default: {
      launch: jest.fn().mockResolvedValue(mockBrowser),
    },
    launch: jest.fn().mockResolvedValue(mockBrowser),
  };
});

import * as puppeteerCore from 'puppeteer-core';

describe('PrintPdfService', () => {
  let service: PrintPdfService;

  beforeEach(() => {
    service = new PrintPdfService();
    jest.clearAllMocks();
  });

  it('renders html to a pdf buffer with default filename', async () => {
    const { buffer, filename } = await service.generatePdf('<h1>Hello</h1>');
    expect(buffer.toString()).toBe('pdf-bytes');
    expect(filename).toBe('document.pdf');
    expect((puppeteerCore as any).launch).toHaveBeenCalledTimes(1);
  });

  it('passes landscape option through to the page', async () => {
    await service.generatePdf('<h1>Hello</h1>', { filename: 'order.pdf', landscape: true });
    const browser = await (puppeteerCore as any).launch();
    const page = await browser.newPage();
    expect(page.pdf).toHaveBeenCalledWith(
      expect.objectContaining({ format: 'A4', landscape: true, printBackground: true }),
    );
  });
});
