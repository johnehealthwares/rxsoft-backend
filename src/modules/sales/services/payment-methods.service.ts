import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type { PaymentMethodType } from '../../../shared/domain';
import { toPaymentMethodType } from '../../../shared/domain/mappers';
import { PaymentMethodOrmEntity } from '../entities/payment-method.orm-entity';
import { CreatePaymentMethodDto, ListPaymentMethodsDto, UpdatePaymentMethodDto } from '../dto/payment-methods.dto';
import { validateSequentialCode } from '../../../shared/utils/code-validation';

@Injectable()
export class PaymentMethodsService {
  constructor(
    @InjectRepository(PaymentMethodOrmEntity)
    private readonly paymentMethodRepository: Repository<PaymentMethodOrmEntity>,
  ) {}

  async list(query: ListPaymentMethodsDto): Promise<{ data: PaymentMethodType[]; total: number }> {
    const qb = this.paymentMethodRepository
      .createQueryBuilder('payment_method')
      .orderBy('payment_method.updated_at', 'DESC')
      .skip(query.offset)
      .take(query.limit);

    if (query.search) {
      qb.andWhere('(payment_method.code ILIKE :search OR payment_method.name ILIKE :search)', {
        search: `%${query.search}%`,
      });
    }

    const [data, total] = await qb.getManyAndCount();
    return { data: data.map(toPaymentMethodType), total };
  }

  async get(id: string): Promise<PaymentMethodType> {
    const item = await this.paymentMethodRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Payment method not found');
    return toPaymentMethodType(item);
  }

  async create(payload: CreatePaymentMethodDto): Promise<PaymentMethodType> {
    const [last] = await this.paymentMethodRepository.find({
      order: { createdAt: 'DESC' },
      select: ['code'],
      take: 1,
    });
    const { valid, expectedCode } = validateSequentialCode({
      providedCode: payload.code,
      lastCode: last?.code,
      override: payload.overrideCodeValidation,
    });
    if (!valid) {
      throw new BadRequestException(`Invalid code '${payload.code}'. Expected '${expectedCode}'.`);
    }

    const duplicate = await this.paymentMethodRepository.findOne({ where: { code: payload.code } });
    if (duplicate) throw new BadRequestException('Payment method code already exists');

    const entity = this.paymentMethodRepository.create({
      code: payload.code,
      name: payload.name,
      methodType: payload.methodType,
      isActive: payload.isActive ?? true,
    });
    const saved = await this.paymentMethodRepository.save(entity);
    return toPaymentMethodType(saved);
  }

  async update(id: string, payload: UpdatePaymentMethodDto): Promise<PaymentMethodType> {
    const item = await this.paymentMethodRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Payment method not found');

    if (payload.code && payload.code !== item.code) {
      const duplicate = await this.paymentMethodRepository.findOne({ where: { code: payload.code } });
      if (duplicate) throw new BadRequestException('Payment method code already exists');
      item.code = payload.code;
    }
    if (payload.name !== undefined) item.name = payload.name;
    if (payload.methodType !== undefined) item.methodType = payload.methodType;
    if (payload.isActive !== undefined) item.isActive = payload.isActive;

    const saved = await this.paymentMethodRepository.save(item);
    return toPaymentMethodType(saved);
  }

  async remove(id: string): Promise<void> {
    const result = await this.paymentMethodRepository.delete({ id });
    if (!result.affected) throw new NotFoundException('Payment method not found');
  }
}