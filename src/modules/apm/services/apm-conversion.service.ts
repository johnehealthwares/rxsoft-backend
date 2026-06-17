import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  LgaOrmEntity,
  WardOrmEntity,
  PollingUnitOrmEntity,
  StakeholderOrmEntity,
  ConversionScoreOrmEntity,
  ConversionActivityOrmEntity,
  WhatsAppGroupOrmEntity,
} from '../entities';
import {
  CreateStakeholderDto,
  UpdateStakeholderDto,
  CreateConversionActivityDto,
  UpdateConversionScoreDto,
  UpdatePollingUnitDto,
  CreateWhatsAppGroupDto,
} from '../dto/conversion.dto';
import { ListQueryDto } from '../dto/apm.dto';

@Injectable()
export class ApmConversionService {
  constructor(
    @InjectRepository(LgaOrmEntity)
    private readonly lgaRepo: Repository<LgaOrmEntity>,
    @InjectRepository(WardOrmEntity)
    private readonly wardRepo: Repository<WardOrmEntity>,
    @InjectRepository(PollingUnitOrmEntity)
    private readonly puRepo: Repository<PollingUnitOrmEntity>,
    @InjectRepository(StakeholderOrmEntity)
    private readonly stakeholderRepo: Repository<StakeholderOrmEntity>,
    @InjectRepository(ConversionScoreOrmEntity)
    private readonly scoreRepo: Repository<ConversionScoreOrmEntity>,
    @InjectRepository(ConversionActivityOrmEntity)
    private readonly activityRepo: Repository<ConversionActivityOrmEntity>,
    @InjectRepository(WhatsAppGroupOrmEntity)
    private readonly waGroupRepo: Repository<WhatsAppGroupOrmEntity>,
  ) {}

  // ── LGAs ───────────────────────────────────────────────────────

  async listLgas() {
    return this.lgaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  async getLga(id: string) {
    const lga = await this.lgaRepo.findOne({ where: { id, isActive: true } });
    if (!lga) throw new NotFoundException('LGA not found');
    return lga;
  }

  // ── Wards ──────────────────────────────────────────────────────

  async listWards(lgaId: string) {
    return this.wardRepo.find({
      where: { lgaId, isActive: true },
      order: { displayOrder: 'ASC' },
    });
  }

  async getWard(id: string) {
    const ward = await this.wardRepo.findOne({ where: { id, isActive: true } });
    if (!ward) throw new NotFoundException('Ward not found');
    return ward;
  }

  // ── Polling Units ──────────────────────────────────────────────

  async listPollingUnits(wardId: string) {
    return this.puRepo.find({
      where: { wardId, isActive: true },
      order: { name: 'ASC' },
    });
  }

  async getPollingUnit(id: string) {
    const pu = await this.puRepo.findOne({ where: { id, isActive: true } });
    if (!pu) throw new NotFoundException('Polling unit not found');
    return pu;
  }

  async updatePollingUnit(id: string, dto: UpdatePollingUnitDto) {
    const pu = await this.puRepo.findOne({ where: { id } });
    if (!pu) throw new NotFoundException('Polling unit not found');
    Object.assign(pu, dto);
    return this.puRepo.save(pu);
  }

  async searchPollingUnits(query: string) {
    return this.puRepo.find({
      where: [
        { code: ILike(`%${query}%`) },
        { name: ILike(`%${query}%`) },
      ],
      take: 20,
    });
  }

  // ── Conversion Dashboard ───────────────────────────────────────

  async getDashboard() {
    const [lgas, wards, pus, stakeholders] = await Promise.all([
      this.lgaRepo.find({ where: { isActive: true } }),
      this.wardRepo.find({ where: { isActive: true } }),
      this.puRepo.find({ where: { isActive: true } }),
      this.stakeholderRepo.find(),
    ]);

    const scores = await this.scoreRepo.find();

    const lgaScores = scores.filter((s) => s.entityType === 'lga');
    const wardScores = scores.filter((s) => s.entityType === 'ward');
    const activePus = pus.length;
    const apmFriendlyPus = pus.filter((p) => p.conversionStatus === 'won').length;
    const contestedPus = pus.filter((p) => p.riskLevel === 'red' || p.riskLevel === 'yellow').length;
    const untouchedPus = pus.filter((p) => p.conversionStatus === 'untouched').length;
    const greenLgas = lgaScores.filter((s) => s.status === 'green').length;
    const redLgas = lgaScores.filter((s) => s.status === 'red').length;
    const greenWards = wardScores.filter((s) => s.status === 'green').length;
    const redWards = wardScores.filter((s) => s.status === 'red').length;
    const totalGreenWards = wardScores.filter((s) => s.status === 'green').length;
    const totalRedWards = wardScores.filter((s) => s.status === 'red').length;

    return {
      summary: {
        totalLgas: lgas.length,
        totalWards: wards.length,
        totalPollingUnits: activePus,
        totalStakeholders: stakeholders.length,
      },
      conversion: {
        apmFriendlyPollingUnits: apmFriendlyPus,
        contestedPollingUnits: contestedPus,
        untouchedPollingUnits: untouchedPus,
        greenLgas,
        redLgas,
        greenWards,
        redWards,
      },
      lgas,
      scores,
    };
  }

  async getLgaConversionDashboard() {
    const lgas = await this.lgaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
    const scores = await this.scoreRepo.find({ where: { entityType: 'lga' } });
    const wards = await this.wardRepo.find({ where: { isActive: true } });
    const pus = await this.puRepo.find({ where: { isActive: true } });

    return lgas.map((lga) => {
      const score = scores.find((s) => s.entityId === lga.id);
      const lgaWards = wards.filter((w) => w.lgaId === lga.id);
      const lgaPus = pus.filter((p) => p.lgaId === lga.id);
      const wonPus = lgaPus.filter((p) => p.conversionStatus === 'won').length;
      const constituency = lga.name.includes('Central') || lga.name.includes('West') || lga.name.includes('East') || lga.name.includes('North') || lga.name.includes('South')
        ? null
        : lga.name;

      return {
        id: lga.id,
        name: lga.name,
        code: lga.code,
        score: score?.score ?? 0,
        status: score?.status ?? 'grey',
        wardCount: lgaWards.length,
        pollingUnitCount: lgaPus.length,
        wonPollingUnits: wonPus,
        lastAssessed: score?.lastAssessedAt ?? null,
      };
    });
  }

  async getWardConversionDashboard(lgaId: string) {
    const wards = await this.wardRepo.find({ where: { lgaId, isActive: true }, order: { displayOrder: 'ASC' } });
    const scores = await this.scoreRepo.find({ where: { entityType: 'ward' } });
    const pus = await this.puRepo.find({ where: { isActive: true } });

    return wards.map((ward) => {
      const score = scores.find((s) => s.entityId === ward.id);
      const wardPus = pus.filter((p) => p.wardId === ward.id);
      const wonPus = wardPus.filter((p) => p.conversionStatus === 'won').length;

      return {
        id: ward.id,
        name: ward.name,
        code: ward.code,
        score: score?.score ?? 0,
        status: score?.status ?? 'grey',
        pollingUnitCount: wardPus.length,
        wonPollingUnits: wonPus,
        lastAssessed: score?.lastAssessedAt ?? null,
      };
    });
  }

  async getPollingUnitDashboard(wardId: string) {
    return this.puRepo.find({
      where: { wardId, isActive: true },
      order: { name: 'ASC' },
    });
  }

  // ── Conversion Scores ─────────────────────────────────────────

  async updateScore(entityType: string, entityId: string, dto: UpdateConversionScoreDto) {
    let score = await this.scoreRepo.findOne({ where: { entityType, entityId } });
    if (score) {
      Object.assign(score, dto, { lastAssessedAt: new Date() });
    } else {
      score = this.scoreRepo.create({
        entityType,
        entityId,
        ...dto,
        lastAssessedAt: new Date(),
      });
    }
    return this.scoreRepo.save(score);
  }

  // ── Stakeholders ──────────────────────────────────────────────

  async listStakeholders(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.name = ILike(`%${query.search}%`);
    if (query.category) where.role = query.category;

    const [items, total] = await this.stakeholderRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { items, total, page: query.page, limit: query.limit };
  }

  async listStakeholdersByLga(lgaId: string, query: ListQueryDto) {
    const where: Record<string, unknown> = { lgaId };
    if (query.search) where.name = ILike(`%${query.search}%`);

    const [items, total] = await this.stakeholderRepo.findAndCount({
      where,
      order: { createdAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { items, total, page: query.page, limit: query.limit };
  }

  async getStakeholder(id: string) {
    const stakeholder = await this.stakeholderRepo.findOne({
      where: { id },
      relations: ['activities'],
    });
    if (!stakeholder) throw new NotFoundException('Stakeholder not found');
    return stakeholder;
  }

  async createStakeholder(dto: CreateStakeholderDto) {
    return this.stakeholderRepo.save(dto);
  }

  async updateStakeholder(id: string, dto: UpdateStakeholderDto) {
    const stakeholder = await this.stakeholderRepo.findOne({ where: { id } });
    if (!stakeholder) throw new NotFoundException('Stakeholder not found');
    Object.assign(stakeholder, dto);
    return this.stakeholderRepo.save(stakeholder);
  }

  // ── Conversion Activities ──────────────────────────────────────

  async createActivity(stakeholderId: string, dto: CreateConversionActivityDto) {
    const stakeholder = await this.stakeholderRepo.findOne({ where: { id: stakeholderId } });
    if (!stakeholder) throw new NotFoundException('Stakeholder not found');

    return this.activityRepo.save({
      stakeholderId,
      ...dto,
      conductedAt: dto.conductedAt ? new Date(dto.conductedAt) : new Date(),
      followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
    });
  }

  async listActivities(stakeholderId: string) {
    return this.activityRepo.find({
      where: { stakeholderId },
      order: { conductedAt: 'DESC' },
    });
  }

  // ── WhatsApp Groups ────────────────────────────────────────────

  async listWhatsAppGroups(level?: string) {
    const where: Record<string, unknown> = { isActive: true };
    if (level) where.level = level;
    return this.waGroupRepo.find({
      where,
      order: { level: 'ASC', name: 'ASC' },
    });
  }

  async createWhatsAppGroup(dto: CreateWhatsAppGroupDto) {
    return this.waGroupRepo.save(dto);
  }
}
