import { Body, Controller, Post, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { PrintPdfDto } from '../dto/print-pdf.dto';
import { PrintPdfService } from '../services/print-pdf.service';

@ApiTags('print')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('print')
export class PrintController {
  constructor(private readonly printPdfService: PrintPdfService) {}

  @Post('pdf')
  @ApiOperation({ summary: 'Render HTML to a PDF file' })
  async printPdf(@Body() dto: PrintPdfDto): Promise<StreamableFile> {
    const { buffer, filename } = await this.printPdfService.generatePdf(dto.html, {
      filename: dto.filename,
      landscape: dto.landscape,
    });
    const safeName = (filename || 'document.pdf').replace(/[^\w.-]/g, '_');
    return new StreamableFile(buffer, {
      type: 'application/pdf',
      disposition: `attachment; filename="${safeName}"`,
    });
  }
}
