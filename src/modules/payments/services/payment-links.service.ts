import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes } from 'crypto';
import { Repository } from 'typeorm';
import { OrderItemOrmEntity, OrderOrmEntity } from '../../website/entities';
import { PartyOrmEntity } from '../../customers/entities/party.orm-entity';
import { PaymentLinkOrmEntity } from '../entities';
import { CreatePaymentLinkDto } from '../dto/payment-links.dto';
import { PaymentProvidersService } from './payment-providers.service';

export const DAMOREX_PAY_PATH = '/damorex/pay';

function generateToken(): string {
  return randomBytes(24).toString('hex');
}

@Injectable()
export class PaymentLinksService {
  constructor(
    @InjectRepository(PaymentLinkOrmEntity)
    private readonly linkRepo: Repository<PaymentLinkOrmEntity>,
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
    @InjectRepository(OrderItemOrmEntity)
    private readonly orderItemRepo: Repository<OrderItemOrmEntity>,
    @InjectRepository(PartyOrmEntity)
    private readonly partyRepo: Repository<PartyOrmEntity>,
    private readonly providersService: PaymentProvidersService,
  ) {}

  async createLink(
    organizationId: string,
    payload: CreatePaymentLinkDto,
    createdByUserId?: string,
  ): Promise<{ token: string; url: string; link: PaymentLinkOrmEntity }> {
    let amount: number | null = payload.amount ?? null;
    let targetId: string | null = null;
    let userId: string | null = payload.userId ?? null;

    if (payload.type === 'order_payment') {
      if (!payload.orderId)
        throw new BadRequestException(
          'orderId is required for order payment links',
        );
      const order = await this.orderRepo.findOne({
        where: { id: payload.orderId, organizationId },
      });
      if (!order) throw new NotFoundException('Order not found');
      targetId = order.id;
      amount = amount ?? order.totalAmount;
      if (!userId && order.customerId) {
        const party = await this.partyRepo.findOne({
          where: { id: order.customerId },
        });
        userId = party?.userId ?? null;
      }
    } else if (payload.type === 'wallet_deposit') {
      if (!amount)
        throw new BadRequestException(
          'amount is required for wallet deposit links',
        );
      if (payload.customerId) {
        const party = await this.partyRepo.findOne({
          where: { id: payload.customerId },
        });
        if (!party?.userId)
          throw new BadRequestException('Customer has no linked user account');
        userId = party.userId;
        targetId = party.id;
      } else if (userId) {
        const party = await this.partyRepo.findOne({ where: { userId } });
        targetId = party?.id ?? null;
      } else {
        throw new BadRequestException(
          'userId or customerId is required for wallet deposit links',
        );
      }
    }

    const expiresInDays = payload.expiresInDays ?? 3;
    const link = this.linkRepo.create({
      organizationId,
      token: generateToken(),
      type: payload.type,
      targetId,
      userId,
      amount,
      note: payload.note ?? null,
      status: 'active',
      expiresAt: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
      createdByUserId: createdByUserId ?? null,
    });
    const saved = await this.linkRepo.save(link);
    return {
      token: saved.token,
      url: `${DAMOREX_PAY_PATH}/${saved.token}`,
      link: saved,
    };
  }

  private async assertActive(
    link: PaymentLinkOrmEntity,
  ): Promise<PaymentLinkOrmEntity> {
    if (link.status !== 'active')
      throw new BadRequestException('Payment link is no longer active');
    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      await this.linkRepo.update({ id: link.id }, { status: 'expired' });
      throw new BadRequestException('Payment link has expired');
    }
    return link;
  }

  async getByToken(token: string): Promise<PaymentLinkOrmEntity> {
    const link = await this.linkRepo.findOne({ where: { token } });
    if (!link) throw new NotFoundException('Payment link not found');
    return this.assertActive(link);
  }

  /** Public payload for the /damorex/pay/:token page. */
  async publicView(token: string) {
    const link = await this.getByToken(token);
    const providers = (
      await this.providersService.listActiveForOrg(link.organizationId, 'web')
    )
      .filter((p) => this.providersService.isConfigured(p))
      .map((p) => ({
        id: p.id,
        code: p.code,
        name: p.name,
        providerType: p.providerType,
        production: p.production,
      }));

    if (link.type === 'order_payment') {
      const order = await this.orderRepo.findOne({
        where: { id: link.targetId ?? undefined },
        relations: ['items'],
      });
      if (!order) throw new NotFoundException('Order not found');
      return {
        type: link.type,
        token: link.token,
        organizationId: link.organizationId,
        amount: link.amount ?? order.totalAmount,
        currency: 'NGN',
        providers,
        order: {
          id: order.id,
          orderNumber: order.orderNumber,
          totalAmount: order.totalAmount,
          subtotalAmount: order.subtotalAmount,
          items: order.items.map((i) => ({
            id: i.id,
            itemId: i.itemId,
            freetextName: i.freetextName,
            quantity: i.quantity,
            unitPrice: i.unitPrice,
          })),
        },
        userId: link.userId,
      };
    }

    return {
      type: link.type,
      token: link.token,
      organizationId: link.organizationId,
      amount: link.amount,
      currency: 'NGN',
      providers,
      userId: link.userId,
      note: link.note,
    };
  }

  async markUsed(token: string): Promise<void> {
    await this.linkRepo.update({ token }, { status: 'used' });
  }

  async markIfPaid(
    link: PaymentLinkOrmEntity,
    latest: { status?: string } | null,
  ): Promise<void> {
    if (latest?.status === 'success' && link.status === 'active') {
      await this.linkRepo.update({ id: link.id }, { status: 'used' });
    }
  }

  async list(organizationId: string, page = 1, limit = 50) {
    const [data, total] = await this.linkRepo.findAndCount({
      where: { organizationId },
      order: { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }

  async revoke(token: string, organizationId: string): Promise<void> {
    const result = await this.linkRepo.update(
      { token, organizationId },
      { status: 'revoked' },
    );
    if (!result.affected) throw new NotFoundException('Payment link not found');
  }
}
