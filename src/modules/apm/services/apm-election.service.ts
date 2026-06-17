import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  PollingAgentOrmEntity,
  ResultEntryOrmEntity,
  IncidentReportOrmEntity,
  GotvRecordOrmEntity,
} from '../entities';
import {
  CreatePollingAgentDto,
  UpdatePollingAgentDto,
  CreateResultEntryDto,
  CreateIncidentReportDto,
  UpdateIncidentReportDto,
  CreateGotvRecordDto,
  UpdateGotvRecordDto,
} from '../dto/election.dto';
import { ListQueryDto } from '../dto/apm.dto';

@Injectable()
export class ApmElectionService {
  constructor(
    @InjectRepository(PollingAgentOrmEntity)
    private readonly agentRepo: Repository<PollingAgentOrmEntity>,
    @InjectRepository(ResultEntryOrmEntity)
    private readonly resultRepo: Repository<ResultEntryOrmEntity>,
    @InjectRepository(IncidentReportOrmEntity)
    private readonly incidentRepo: Repository<IncidentReportOrmEntity>,
    @InjectRepository(GotvRecordOrmEntity)
    private readonly gotvRepo: Repository<GotvRecordOrmEntity>,
  ) {}

  // ── Polling Agents ─────────────────────────────────────────

  async listAgents(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.name = ILike(`%${query.search}%`);
    if (query.category) where.role = query.category;
    if (query.trainingStatus) where.trainingStatus = query.trainingStatus;
    if (query.status) {
      where.isActive = query.status === 'active';
    }
    const [items, total] = await this.agentRepo.findAndCount({
      where: Object.keys(where).length ? where : {},
      order: { assignedAt: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async getAgent(id: string) {
    const agent = await this.agentRepo.findOne({ where: { id } });
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  async createAgent(dto: CreatePollingAgentDto) {
    return this.agentRepo.save({ ...dto, assignedAt: new Date() });
  }

  async updateAgent(id: string, dto: UpdatePollingAgentDto) {
    const agent = await this.agentRepo.findOne({ where: { id } });
    if (!agent) throw new NotFoundException('Agent not found');
    Object.assign(agent, dto);
    return this.agentRepo.save(agent);
  }

  async getAgentStats() {
    const [total, trained, assigned, agent, backup, supervisor] = await Promise.all([
      this.agentRepo.count(),
      this.agentRepo.count({ where: { trainingStatus: 'trained' } }),
      this.agentRepo.count({ where: { isActive: true } }),
      this.agentRepo.count({ where: { role: 'agent' } }),
      this.agentRepo.count({ where: { role: 'backup-agent' } }),
      this.agentRepo.count({ where: { role: 'ward-supervisor' } }),
    ]);
    return { total, trained, assigned, agent, backup, supervisor };
  }

  // ── Result Entries ─────────────────────────────────────────

  async listResults(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.pollingUnitId = ILike(`%${query.search}%`);
    if (query.status) where.status = query.status;
    if (query.lgaId) where.lgaId = query.lgaId;
    const [items, total] = await this.resultRepo.findAndCount({
      where: Object.keys(where).length ? where : {},
      order: { createdAt: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async listResultsByLga(lgaId: string) {
    return this.resultRepo.find({ where: { lgaId }, order: { createdAt: 'DESC' } });
  }

  async getResult(id: string) {
    const result = await this.resultRepo.findOne({ where: { id } });
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async createResult(dto: CreateResultEntryDto) {
    const totalVotes = dto.apmVotes + dto.pdpVotes + dto.apcVotes + (dto.otherVotes ?? 0);
    return this.resultRepo.save({ ...dto, totalVotes });
  }

  async verifyResult(id: string) {
    const result = await this.resultRepo.findOne({ where: { id } });
    if (!result) throw new NotFoundException('Result not found');
    result.status = 'verified';
    return this.resultRepo.save(result);
  }

  async getResultDashboard() {
    const results = await this.resultRepo.find();
    const total = results.length;
    const submitted = results.filter((r) => r.status !== 'draft').length;
    const verified = results.filter((r) => r.status === 'verified').length;
    const totalApmVotes = results.reduce((sum, r) => sum + r.apmVotes, 0);
    const totalPdpVotes = results.reduce((sum, r) => sum + r.pdpVotes, 0);
    const totalApcVotes = results.reduce((sum, r) => sum + r.apcVotes, 0);
    return { total, submitted, verified, totalApmVotes, totalPdpVotes, totalApcVotes };
  }

  // ── Incident Reports ───────────────────────────────────────

  async listIncidents(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.category) where.type = query.category;
    if (query.severity) where.severity = query.severity;
    if (query.status) where.status = query.status;
    const [items, total] = await this.incidentRepo.findAndCount({
      where: Object.keys(where).length ? where : {},
      order: { reportedAt: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async createIncident(dto: CreateIncidentReportDto) {
    return this.incidentRepo.save({ ...dto, reportedAt: new Date() });
  }

  async updateIncident(id: string, dto: UpdateIncidentReportDto) {
    const incident = await this.incidentRepo.findOne({ where: { id } });
    if (!incident) throw new NotFoundException('Incident not found');
    Object.assign(incident, dto);
    return this.incidentRepo.save(incident);
  }

  async getIncidentStats() {
    const [total, open, critical, escalated] = await Promise.all([
      this.incidentRepo.count(),
      this.incidentRepo.count({ where: { status: 'open' } }),
      this.incidentRepo.count({ where: { severity: 'critical' } }),
      this.incidentRepo.count({ where: { legalEscalation: true } }),
    ]);
    return { total, open, critical, escalated };
  }

  // ── GOTV Records ────────────────────────────────────────────

  async listGotvRecords(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.supporterName = ILike(`%${query.search}%`);
    if (query.contacted) {
      where.contacted = query.contacted === 'true';
    }
    if (query.turnedOut) {
      where.turnedOut = query.turnedOut === 'true';
    }
    if (query.contactedVia) where.contactedVia = query.contactedVia;
    const [items, total] = await this.gotvRepo.findAndCount({
      where: Object.keys(where).length ? where : {},
      order: { contactedAt: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async listGotvByPu(pollingUnitId: string) {
    return this.gotvRepo.find({ where: { pollingUnitId }, order: { createdAt: 'DESC' } });
  }

  async createGotvRecord(dto: CreateGotvRecordDto) {
    return this.gotvRepo.save({ ...dto, contacted: true, contactedAt: new Date() });
  }

  async updateGotvRecord(id: string, dto: UpdateGotvRecordDto) {
    const record = await this.gotvRepo.findOne({ where: { id } });
    if (!record) throw new NotFoundException('GOTV record not found');
    Object.assign(record, dto);
    return this.gotvRepo.save(record);
  }

  async getGotvStats() {
    const [total, contacted, turnedOut] = await Promise.all([
      this.gotvRepo.count(),
      this.gotvRepo.count({ where: { contacted: true } }),
      this.gotvRepo.count({ where: { turnedOut: true } }),
    ]);
    return { total, contacted, turnedOut, turnoutRate: total ? Math.round(turnedOut / total * 100) : 0 };
  }
}
