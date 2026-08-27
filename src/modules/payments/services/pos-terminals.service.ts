import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PosTerminalOrmEntity } from '../entities/pos-terminal.orm-entity';
import {
  CreatePosTerminalDto,
  ListPosTerminalsDto,
  UpdatePosTerminalDto,
} from '../dto/pos-terminals.dto';

@Injectable()
export class PosTerminalsService {
  constructor(
    @InjectRepository(PosTerminalOrmEntity)
    private readonly repo: Repository<PosTerminalOrmEntity>,
  ) {}

  async list(organizationId: string, query: ListPosTerminalsDto) {
    const qb = this.repo
      .createQueryBuilder('terminal')
      .where('terminal.organization_id = :organizationId', { organizationId });
    if (query.search) {
      qb.andWhere(
        '(terminal.code ILIKE :search OR terminal.label ILIKE :search OR terminal.serial ILIKE :search)',
        {
          search: `%${query.search}%`,
        },
      );
    }
    const [data, total] = await qb
      .orderBy('terminal.created_at', 'DESC')
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .getManyAndCount();
    return { data, total };
  }

  async get(id: string, organizationId: string) {
    const terminal = await this.repo.findOne({ where: { id, organizationId } });
    if (!terminal) throw new NotFoundException('POS terminal not found');
    return terminal;
  }

  async create(organizationId: string, payload: CreatePosTerminalDto) {
    const dup = await this.repo.findOne({
      where: { organizationId, code: payload.code },
    });
    if (dup) throw new BadRequestException('POS terminal code already exists');
    const entity = this.repo.create({
      organizationId,
      code: payload.code,
      label: payload.label ?? payload.code,
      providerType: payload.providerType,
      serial: payload.serial ?? null,
      terminalId: payload.terminalId ?? null,
      storeId: payload.storeId ?? null,
      isActive: payload.isActive ?? true,
    });
    return this.repo.save(entity);
  }

  async update(
    id: string,
    organizationId: string,
    payload: UpdatePosTerminalDto,
  ) {
    const terminal = await this.get(id, organizationId);
    if (payload.code && payload.code !== terminal.code) {
      const dup = await this.repo.findOne({
        where: { organizationId, code: payload.code },
      });
      if (dup)
        throw new BadRequestException('POS terminal code already exists');
      terminal.code = payload.code;
    }
    if (payload.label !== undefined) terminal.label = payload.label;
    if (payload.providerType !== undefined)
      terminal.providerType = payload.providerType;
    if (payload.serial !== undefined) terminal.serial = payload.serial;
    if (payload.terminalId !== undefined)
      terminal.terminalId = payload.terminalId;
    if (payload.storeId !== undefined) terminal.storeId = payload.storeId;
    if (payload.isActive !== undefined) terminal.isActive = payload.isActive;
    return this.repo.save(terminal);
  }

  async remove(id: string, organizationId: string): Promise<void> {
    const result = await this.repo.delete({ id, organizationId });
    if (!result.affected) throw new NotFoundException('POS terminal not found');
  }
}
