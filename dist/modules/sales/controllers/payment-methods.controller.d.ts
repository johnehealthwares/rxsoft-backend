import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import type { PaymentMethodType } from '../../../shared/domain';
import { CreatePaymentMethodDto, ListPaymentMethodsDto, UpdatePaymentMethodDto } from '../dto/payment-methods.dto';
import { PaymentMethodsService } from '../services/payment-methods.service';
type PaymentMethodListResponse = {
    data: PaymentMethodType[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
};
export declare class PaymentMethodsController {
    private readonly paymentMethodsService;
    constructor(paymentMethodsService: PaymentMethodsService);
    list(query: ListPaymentMethodsDto, currentUser: RequestUser): Promise<PaymentMethodListResponse>;
    get(paymentMethodId: string, currentUser: RequestUser): Promise<PaymentMethodType>;
    create(payload: CreatePaymentMethodDto, currentUser: RequestUser): Promise<PaymentMethodType>;
    replace(paymentMethodId: string, payload: UpdatePaymentMethodDto, currentUser: RequestUser): Promise<PaymentMethodType>;
    patch(paymentMethodId: string, payload: UpdatePaymentMethodDto, currentUser: RequestUser): Promise<PaymentMethodType>;
    remove(paymentMethodId: string, currentUser: RequestUser): Promise<void>;
}
export {};
