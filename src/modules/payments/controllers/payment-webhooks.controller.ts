import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';
import { PaymentWebhookService } from '../services/payment-webhook.service';

/**
 * Public webhook endpoints for the four payment providers. These controllers
 * intentionally omit @UseGuards/JwtAuthGuard — signature verification is done
 * inside the provider adapters (the codebase's mechanism for public routes).
 */
@ApiTags('payments-webhooks')
@Controller('payments/webhook')
export class PaymentWebhooksController {
  constructor(private readonly webhookService: PaymentWebhookService) {}

  @Post(':provider')
  @HttpCode(HttpStatus.OK)
  async handle(
    @Param('provider') provider: string,
    @Body() body: unknown,
    @Req() req: Request,
  ): Promise<Record<string, unknown>> {
    const headers = (req.headers ?? {}) as Record<
      string,
      string | string[] | undefined
    >;
    const rb = (req as any).rawBody;
    const rawBody =
      typeof rb === 'string'
        ? rb
        : Buffer.isBuffer(rb)
          ? rb.toString('utf8')
          : undefined;
    return this.webhookService.handle(
      provider.toLowerCase(),
      body,
      headers,
      rawBody,
    );
  }
}
