import { BadRequestException, Inject, Injectable, NotFoundException, Optional } from '@nestjs/common';
import { AppCacheService } from '../../../common/cache/cache.service';
import { ReceiveGoodsDto } from '../dto/goods-receipt.dto';
import { PURCHASES_REPOSITORY } from './purchases.di-tokens';
import type { PurchasesRepository } from '../repositories/purchases.repository';

@Injectable()
export class ReceiveGoodsUseCase {
  constructor(
    @Inject(PURCHASES_REPOSITORY)
    private readonly purchasesRepository: PurchasesRepository,
    @Optional()
    private readonly cacheService?: AppCacheService,
  ) {}

  async execute(
    payload: ReceiveGoodsDto,
    organizationId: string,
    userId: string,
  ): Promise<void> {
    const po = await this.purchasesRepository.getById(payload.purchaseOrderId, organizationId);
    if (!po) {
      throw new NotFoundException('Purchase order not found');
    }
    if (po.status !== 'approved' && po.status !== 'partially_received') {
      throw new BadRequestException(
        'Purchase order must be in approved or partially_received status to receive goods',
      );
    }

    for (const incomingLine of payload.lines) {
      const poLine = po.lines.find((l) => l.itemId === incomingLine.itemId);
      if (!poLine) {
        throw new BadRequestException(`Item ${incomingLine.itemId} not found on purchase order`);
      }
      const newReceivedQty = Number(poLine.receivedQty) + Number(incomingLine.receivedQty);
      if (newReceivedQty > Number(poLine.orderedQty)) {
        throw new BadRequestException(
          `Received quantity for item ${incomingLine.itemId} exceeds ordered quantity`,
        );
      }
    }

    await this.purchasesRepository.receiveGoods({
      organizationId,
      receiptNumber: `GR-${Date.now()}`,
      purchaseOrderId: payload.purchaseOrderId,
      receivedDate: new Date(payload.receivedDate),
      createdByUserId: userId,
      note: payload.note ?? null,
      lines: payload.lines.map((line) => ({
        itemId: line.itemId,
        orderedQty: po.lines.find((l) => l.itemId === line.itemId)!.orderedQty,
        receivedQty: line.receivedQty,
        uomId: line.uomId,
        unitCost: line.unitCost,
      })),
    });

    await this.cacheService?.invalidateByPrefix(`purchases:list:${organizationId}:`);
  }
}
