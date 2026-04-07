import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { RequestUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { AuditAction } from '../../../common/decorators/audit-action.decorator';
import { ApplyReceivableAdjustmentDto } from '../dto/apply-receivable-adjustment.dto';
import { CollectReceivablePaymentDto } from '../dto/collect-receivable-payment.dto';
import { ListReceivableTransactionsDto } from '../dto/list-receivable-transactions.dto';
import { ListReceivablesDto } from '../dto/list-receivables.dto';
import { ReceivableResponseDto } from '../dto/receivable-response.dto';
import { ReceivableTransactionResponseDto } from '../dto/receivable-transaction-response.dto';
import { WriteOffReceivableDto } from '../dto/write-off-receivable.dto';
import { ApplyReceivableAdjustmentUseCase } from '../services/apply-receivable-adjustment.use-case';
import { CollectReceivablePaymentUseCase } from '../services/collect-receivable-payment.use-case';
import { ListReceivableTransactionsUseCase } from '../services/list-receivable-transactions.use-case';
import { ListReceivablesUseCase } from '../services/list-receivables.use-case';
import { WriteOffReceivableUseCase } from '../services/write-off-receivable.use-case';

type ReceivablesListResponse = {
  data: ReceivableResponseDto[];
  meta: { page: number; limit: number; total: number };
};

type ReceivableTransactionsListResponse = {
  data: ReceivableTransactionResponseDto[];
  meta: { page: number; limit: number; total: number };
};

type ReceivableMutationResponse = {
  receivable: ReceivableResponseDto;
  transactionId: string;
};

function toReceivableResponse(item: {
  id: string;
  customerId: string;
  saleId: string;
  receivableNumber: string;
  originalAmount: number;
  outstandingAmount: number;
  status: 'open' | 'partially_paid' | 'closed' | 'written_off';
  openedAt: Date;
  closedAt: Date | null;
}): ReceivableResponseDto {
  return {
    id: item.id,
    customerId: item.customerId,
    saleId: item.saleId,
    receivableNumber: item.receivableNumber,
    originalAmount: item.originalAmount,
    outstandingAmount: item.outstandingAmount,
    status: item.status,
    openedAt: item.openedAt.toISOString(),
    closedAt: item.closedAt ? item.closedAt.toISOString() : null,
  };
}

function toTransactionResponse(item: {
  id: string;
  receivableId: string;
  transactionType: 'charge' | 'payment' | 'adjustment' | 'write_off';
  amount: number;
  transactionDate: Date;
  paymentMethodId: string | null;
  referenceNumber: string | null;
  receivedByUserId: string | null;
  note: string | null;
}): ReceivableTransactionResponseDto {
  return {
    id: item.id,
    receivableId: item.receivableId,
    transactionType: item.transactionType,
    amount: item.amount,
    transactionDate: item.transactionDate.toISOString(),
    paymentMethodId: item.paymentMethodId,
    referenceNumber: item.referenceNumber,
    receivedByUserId: item.receivedByUserId,
    note: item.note,
  };
}

@ApiTags('receivables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('receivables')
export class ReceivablesController {
  constructor(
    private readonly listReceivablesUseCase: ListReceivablesUseCase,
    private readonly collectReceivablePaymentUseCase: CollectReceivablePaymentUseCase,
    private readonly applyReceivableAdjustmentUseCase: ApplyReceivableAdjustmentUseCase,
    private readonly writeOffReceivableUseCase: WriteOffReceivableUseCase,
    private readonly listReceivableTransactionsUseCase: ListReceivableTransactionsUseCase,
  ) {}

  @Get()
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'List receivables with pagination and filters' })
  async list(
    @Query() query: ListReceivablesDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ReceivablesListResponse> {
    const result = await this.listReceivablesUseCase.execute(query, currentUser.organizationId);

    return {
      data: result.items.map(toReceivableResponse),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Get(':receivableId/transactions')
  @Roles('admin', 'super_admin', 'cashier', 'auditor')
  @ApiOperation({ summary: 'List receivable transactions with pagination and optional type filter' })
  async listTransactions(
    @Param('receivableId') receivableId: string,
    @Query() query: ListReceivableTransactionsDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ReceivableTransactionsListResponse> {
    const result = await this.listReceivableTransactionsUseCase.execute(
      receivableId,
      query,
      currentUser.organizationId,
    );

    return {
      data: result.items.map(toTransactionResponse),
      meta: {
        page: query.page,
        limit: query.limit,
        total: result.total,
      },
    };
  }

  @Post(':receivableId/payments')
  @Roles('admin', 'super_admin', 'cashier')
  @AuditAction('receivables.payment.collect')
  @ApiOperation({ summary: 'Collect payment against an open receivable' })
  async collectPayment(
    @Param('receivableId') receivableId: string,
    @Body() payload: CollectReceivablePaymentDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ReceivableMutationResponse> {
    const result = await this.collectReceivablePaymentUseCase.execute(
      receivableId,
      payload,
      currentUser.organizationId,
      currentUser.sub,
    );

    return {
      receivable: toReceivableResponse(result.receivable),
      transactionId: result.transactionId,
    };
  }

  @Post(':receivableId/adjustments')
  @Roles('admin', 'super_admin', 'cashier')
  @AuditAction('receivables.adjustment.apply')
  @ApiOperation({ summary: 'Apply signed adjustment to a receivable and record ledger entry' })
  async applyAdjustment(
    @Param('receivableId') receivableId: string,
    @Body() payload: ApplyReceivableAdjustmentDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ReceivableMutationResponse> {
    const result = await this.applyReceivableAdjustmentUseCase.execute(
      receivableId,
      payload,
      currentUser.organizationId,
      currentUser.sub,
    );

    return {
      receivable: toReceivableResponse(result.receivable),
      transactionId: result.transactionId,
    };
  }

  @Post(':receivableId/write-off')
  @Roles('admin', 'super_admin')
  @AuditAction('receivables.writeoff.apply')
  @ApiOperation({ summary: 'Write off receivable outstanding amount and close it' })
  async writeOff(
    @Param('receivableId') receivableId: string,
    @Body() payload: WriteOffReceivableDto,
    @CurrentUser() currentUser: RequestUser,
  ): Promise<ReceivableMutationResponse> {
    const result = await this.writeOffReceivableUseCase.execute(
      receivableId,
      payload,
      currentUser.organizationId,
      currentUser.sub,
    );

    return {
      receivable: toReceivableResponse(result.receivable),
      transactionId: result.transactionId,
    };
  }
}
