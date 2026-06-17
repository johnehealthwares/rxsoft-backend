import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  PollingAgentDocument, ResultEntryDocument, IncidentReportDocument, GotvRecordDocument,
} from '../../schemas';
import {
  CreatePollingAgentDto, UpdatePollingAgentDto, CreateResultEntryDto,
  CreateIncidentReportDto, UpdateIncidentReportDto, CreateGotvRecordDto, UpdateGotvRecordDto,
} from '../../dto/election.dto';
import { ListQueryDto } from '../../dto/apm.dto';

@Injectable()
export class ApmElectionMongoService {
  constructor(
    @InjectModel('PollingAgent') private readonly agentModel: Model<PollingAgentDocument>,
    @InjectModel('ResultEntry') private readonly resultModel: Model<ResultEntryDocument>,
    @InjectModel('IncidentReport') private readonly incidentModel: Model<IncidentReportDocument>,
    @InjectModel('GotvRecord') private readonly gotvModel: Model<GotvRecordDocument>,
  ) {}

  async listAgents(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.name = { $regex: query.search, $options: 'i' };
    if (query.category) filter.role = query.category;
    if (query.trainingStatus) filter.trainingStatus = query.trainingStatus;
    if (query.status) filter.isActive = query.status === 'active';
    const [items, total] = await Promise.all([
      this.agentModel.find(filter).sort({ assignedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.agentModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async getAgent(id: string) {
    const agent = await this.agentModel.findById(id).exec();
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  async createAgent(dto: CreatePollingAgentDto) {
    return new this.agentModel({ ...dto, assignedAt: new Date() }).save();
  }

  async updateAgent(id: string, dto: UpdatePollingAgentDto) {
    const agent = await this.agentModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!agent) throw new NotFoundException('Agent not found');
    return agent;
  }

  async getAgentStats() {
    const [total, trained, assigned, agent, backup, supervisor] = await Promise.all([
      this.agentModel.countDocuments().exec(),
      this.agentModel.countDocuments({ trainingStatus: 'trained' }).exec(),
      this.agentModel.countDocuments({ isActive: true }).exec(),
      this.agentModel.countDocuments({ role: 'agent' }).exec(),
      this.agentModel.countDocuments({ role: 'backup-agent' }).exec(),
      this.agentModel.countDocuments({ role: 'ward-supervisor' }).exec(),
    ]);
    return { total, trained, assigned, agent, backup, supervisor };
  }

  async listResults(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.pollingUnitId = { $regex: query.search, $options: 'i' };
    if (query.status) filter.status = query.status;
    if (query.lgaId) filter.lgaId = query.lgaId;
    const [items, total] = await Promise.all([
      this.resultModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.resultModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async listResultsByLga(lgaId: string) {
    return this.resultModel.find({ lgaId }).sort({ createdAt: -1 }).exec();
  }

  async getResult(id: string) {
    const result = await this.resultModel.findById(id).exec();
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async createResult(dto: CreateResultEntryDto) {
    const totalVotes = dto.apmVotes + dto.pdpVotes + dto.apcVotes + (dto.otherVotes ?? 0);
    return new this.resultModel({ ...dto, totalVotes }).save();
  }

  async verifyResult(id: string) {
    const result = await this.resultModel.findByIdAndUpdate(id, { $set: { status: 'verified' } }, { new: true }).exec();
    if (!result) throw new NotFoundException('Result not found');
    return result;
  }

  async getResultDashboard() {
    const results = await this.resultModel.find({}).exec();
    const total = results.length;
    const submitted = results.filter((r) => r.status !== 'draft').length;
    const verified = results.filter((r) => r.status === 'verified').length;
    const totalApmVotes = results.reduce((sum, r) => sum + r.apmVotes, 0);
    const totalPdpVotes = results.reduce((sum, r) => sum + r.pdpVotes, 0);
    const totalApcVotes = results.reduce((sum, r) => sum + r.apcVotes, 0);
    return { total, submitted, verified, totalApmVotes, totalPdpVotes, totalApcVotes };
  }

  async listIncidents(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.category) filter.type = query.category;
    if (query.severity) filter.severity = query.severity;
    if (query.status) filter.status = query.status;
    const [items, total] = await Promise.all([
      this.incidentModel.find(filter).sort({ reportedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.incidentModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async createIncident(dto: CreateIncidentReportDto) {
    return new this.incidentModel({ ...dto, reportedAt: new Date() }).save();
  }

  async updateIncident(id: string, dto: UpdateIncidentReportDto) {
    const incident = await this.incidentModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!incident) throw new NotFoundException('Incident not found');
    return incident;
  }

  async getIncidentStats() {
    const [total, open, critical, escalated] = await Promise.all([
      this.incidentModel.countDocuments().exec(),
      this.incidentModel.countDocuments({ status: 'open' }).exec(),
      this.incidentModel.countDocuments({ severity: 'critical' }).exec(),
      this.incidentModel.countDocuments({ legalEscalation: true }).exec(),
    ]);
    return { total, open, critical, escalated };
  }

  async listGotvRecords(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.supporterName = { $regex: query.search, $options: 'i' };
    if (query.contacted) filter.contacted = query.contacted === 'true';
    if (query.turnedOut) filter.turnedOut = query.turnedOut === 'true';
    if (query.contactedVia) filter.contactedVia = query.contactedVia;
    const [items, total] = await Promise.all([
      this.gotvModel.find(filter).sort({ contactedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.gotvModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async listGotvByPu(pollingUnitId: string) {
    return this.gotvModel.find({ pollingUnitId }).sort({ createdAt: -1 }).exec();
  }

  async createGotvRecord(dto: CreateGotvRecordDto) {
    return new this.gotvModel({ ...dto, contacted: true, contactedAt: new Date() }).save();
  }

  async updateGotvRecord(id: string, dto: UpdateGotvRecordDto) {
    const record = await this.gotvModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!record) throw new NotFoundException('GOTV record not found');
    return record;
  }

  async getGotvStats() {
    const [total, contacted, turnedOut] = await Promise.all([
      this.gotvModel.countDocuments().exec(),
      this.gotvModel.countDocuments({ contacted: true }).exec(),
      this.gotvModel.countDocuments({ turnedOut: true }).exec(),
    ]);
    return { total, contacted, turnedOut, turnoutRate: total ? Math.round(turnedOut / total * 100) : 0 };
  }
}
