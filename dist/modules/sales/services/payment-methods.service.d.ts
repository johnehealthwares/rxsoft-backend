import { Repository } from 'typeorm';
import type { PaymentMethodType } from '../../../shared/domain';
import { PaymentMethodOrmEntity } from '../entities/payment-method.orm-entity';
import { CreatePaymentMethodDto, ListPaymentMethodsDto, UpdatePaymentMethodDto } from '../dto/payment-methods.dto';
export declare class PaymentMethodsService {
    private readonly paymentMethodRepository;
    constructor(paymentMethodRepository: Repository<PaymentMethodOrmEntity>);
    list(query: ListPaymentMethodsDto, organizationId: string): Promise<{
        data: PaymentMethodType[];
        total: number;
    }>;
    get(id: string, organizationId: string): Promise<PaymentMethodType>;
    create(payload: CreatePaymentMethodDto, organizationId: string): Promise<PaymentMethodType>;
    update(id: string, payload: UpdatePaymentMethodDto, organizationId: string): Promise<PaymentMethodType>;
    remove(id: string, organizationId: string): Promise<void>;
}
