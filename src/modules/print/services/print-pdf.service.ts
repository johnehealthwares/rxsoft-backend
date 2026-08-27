import { Injectable, Logger } from '@nestjs/common';
import { promises as fs } from 'fs';

export interface PrintPdfOptions {
  filename?: string;
  landscape?: boolean;
}

@Injectable()
export class PrintPdfService {
  private readonly logger = new Logger(PrintPdfService.name);

  async generatePdf(
    html: string,
    options: PrintPdfOptions = {},
  ): Promise<{ buffer: Buffer; filename: string }> {
    const chromePath =
      process.env.CHROME_PATH ??
      (await this.findChrome()) ??
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

    let puppeteer: any;
    try {
      puppeteer = require('puppeteer-core');
    } catch {
      throw new Error('puppeteer-core is not installed');
    }

    const browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    try {
      const page = await browser.newPage();
      // Big export tables can take longer than Chrome's default 30s timeouts;
      // rendering is local-only so there is no network to wait on.
      await page.setDefaultTimeout(0);
      await page.setDefaultNavigationTimeout(0);
      await page.setContent(html, { waitUntil: 'load' });
      const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        landscape: options.landscape === true,
        margin: { top: '12mm', bottom: '14mm', left: '12mm', right: '12mm' },
      });
      const filename = options.filename ?? 'document.pdf';
      return { buffer, filename };
    } finally {
      await browser.close();
    }
  }

  private async findChrome(): Promise<string | null> {
    const candidates = [
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium',
    ];
    const { access } = fs;
    for (const c of candidates) {
      try {
        await access(c);
        return c;
      } catch {
        /* keep trying */
      }
    }
    return null;
  }
}
