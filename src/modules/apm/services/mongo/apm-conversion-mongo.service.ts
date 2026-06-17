import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  LgaDocument, WardDocument, PollingUnitDocument,
  StakeholderDocument, ConversionScoreDocument, ConversionActivityDocument, WhatsAppGroupDocument,
} from '../../schemas';
import {
  CreateStakeholderDto, UpdateStakeholderDto, CreateConversionActivityDto,
  UpdateConversionScoreDto, UpdatePollingUnitDto, CreateWhatsAppGroupDto,
} from '../../dto/conversion.dto';
import { ListQueryDto } from '../../dto/apm.dto';

@Injectable()
export class ApmConversionMongoService {
  constructor(
    @InjectModel('Lga') private readonly lgaModel: Model<LgaDocument>,
    @InjectModel('Ward') private readonly wardModel: Model<WardDocument>,
    @InjectModel('PollingUnit') private readonly puModel: Model<PollingUnitDocument>,
    @InjectModel('Stakeholder') private readonly stakeholderModel: Model<StakeholderDocument>,
    @InjectModel('ConversionScore') private readonly scoreModel: Model<ConversionScoreDocument>,
    @InjectModel('ConversionActivity') private readonly activityModel: Model<ConversionActivityDocument>,
    @InjectModel('WhatsAppGroup') private readonly waGroupModel: Model<WhatsAppGroupDocument>,
  ) {}

  async listLgas() {
    return this.lgaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getLga(id: string) {
    const lga = await this.lgaModel.findById(id).exec();
    if (!lga) throw new NotFoundException('LGA not found');
    return lga;
  }

  async listWards(lgaId: string) {
    return this.wardModel.find({ lgaId, isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getWard(id: string) {
    const ward = await this.wardModel.findById(id).exec();
    if (!ward) throw new NotFoundException('Ward not found');
    return ward;
  }

  async listPollingUnits(wardId: string) {
    return this.puModel.find({ wardId, isActive: true }).sort({ name: 1 }).exec();
  }

  async getPollingUnit(id: string) {
    const pu = await this.puModel.findById(id).exec();
    if (!pu) throw new NotFoundException('Polling unit not found');
    return pu;
  }

  async updatePollingUnit(id: string, dto: UpdatePollingUnitDto) {
    const pu = await this.puModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!pu) throw new NotFoundException('Polling unit not found');
    return pu;
  }

  async searchPollingUnits(query: string) {
    return this.puModel.find({
      $or: [
        { code: { $regex: query, $options: 'i' } },
        { name: { $regex: query, $options: 'i' } },
      ],
    }).limit(20).exec();
  }

  async getDashboard() {
    const [lgas, wards, pus, stakeholders, scores] = await Promise.all([
      this.lgaModel.find({ isActive: true }).exec(),
      this.wardModel.find({ isActive: true }).exec(),
      this.puModel.find({ isActive: true }).exec(),
      this.stakeholderModel.find({}).exec(),
      this.scoreModel.find({}).exec(),
    ]);

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

    return {
      summary: {
        totalLgas: lgas.length, totalWards: wards.length,
        totalPollingUnits: activePus, totalStakeholders: stakeholders.length,
      },
      conversion: {
        apmFriendlyPollingUnits: apmFriendlyPus, contestedPollingUnits: contestedPus,
        untouchedPollingUnits: untouchedPus, greenLgas, redLgas, greenWards, redWards,
      },
      lgas, scores,
    };
  }

  async getLgaConversionDashboard() {
    const [lgas, scores, wards, pus] = await Promise.all([
      this.lgaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
      this.scoreModel.find({ entityType: 'lga' }).exec(),
      this.wardModel.find({ isActive: true }).exec(),
      this.puModel.find({ isActive: true }).exec(),
    ]);

    return lgas.map((lga) => {
      const score = scores.find((s) => s.entityId === lga._id.toString());
      const lgaWards = wards.filter((w) => w.lgaId === lga._id.toString());
      const lgaPus = pus.filter((p) => p.lgaId === lga._id.toString());
      const wonPus = lgaPus.filter((p) => p.conversionStatus === 'won').length;
      return {
        id: lga._id.toString(), name: lga.name, code: lga.code,
        score: score?.score ?? 0, status: score?.status ?? 'grey',
        wardCount: lgaWards.length, pollingUnitCount: lgaPus.length,
        wonPollingUnits: wonPus, lastAssessed: score?.lastAssessedAt ?? null,
      };
    });
  }

  async getWardConversionDashboard(lgaId: string) {
    const [wards, scores, pus] = await Promise.all([
      this.wardModel.find({ lgaId, isActive: true }).sort({ displayOrder: 1 }).exec(),
      this.scoreModel.find({ entityType: 'ward' }).exec(),
      this.puModel.find({ isActive: true }).exec(),
    ]);

    return wards.map((ward) => {
      const score = scores.find((s) => s.entityId === ward._id.toString());
      const wardPus = pus.filter((p) => p.wardId === ward._id.toString());
      const wonPus = wardPus.filter((p) => p.conversionStatus === 'won').length;
      return {
        id: ward._id.toString(), name: ward.name, code: ward.code,
        score: score?.score ?? 0, status: score?.status ?? 'grey',
        pollingUnitCount: wardPus.length, wonPollingUnits: wonPus,
        lastAssessed: score?.lastAssessedAt ?? null,
      };
    });
  }

  async getPollingUnitDashboard(wardId: string) {
    return this.puModel.find({ wardId, isActive: true }).sort({ name: 1 }).exec();
  }

  async updateScore(entityType: string, entityId: string, dto: UpdateConversionScoreDto) {
    let score = await this.scoreModel.findOne({ entityType, entityId }).exec();
    if (score) {
      Object.assign(score, dto, { lastAssessedAt: new Date() });
      return score.save();
    }
    return new this.scoreModel({ entityType, entityId, ...dto, lastAssessedAt: new Date() }).save();
  }

  async listStakeholders(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.name = { $regex: query.search, $options: 'i' };
    if (query.category) filter.role = query.category;
    const [items, total] = await Promise.all([
      this.stakeholderModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.stakeholderModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async listStakeholdersByLga(lgaId: string, query: ListQueryDto) {
    const filter: Record<string, unknown> = { lgaId };
    if (query.search) filter.name = { $regex: query.search, $options: 'i' };
    const [items, total] = await Promise.all([
      this.stakeholderModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.stakeholderModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async getStakeholder(id: string) {
    const stakeholder = await this.stakeholderModel.findById(id).exec();
    if (!stakeholder) throw new NotFoundException('Stakeholder not found');
    const activities = await this.activityModel.find({ stakeholderId: id }).sort({ conductedAt: -1 }).exec();
    return { ...stakeholder.toObject(), activities };
  }

  async createStakeholder(dto: CreateStakeholderDto) {
    return new this.stakeholderModel(dto).save();
  }

  async updateStakeholder(id: string, dto: UpdateStakeholderDto) {
    const stakeholder = await this.stakeholderModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!stakeholder) throw new NotFoundException('Stakeholder not found');
    return stakeholder;
  }

  async createActivity(stakeholderId: string, dto: CreateConversionActivityDto) {
    const stakeholder = await this.stakeholderModel.findById(stakeholderId).exec();
    if (!stakeholder) throw new NotFoundException('Stakeholder not found');
    return new this.activityModel({
      stakeholderId, ...dto,
      conductedAt: dto.conductedAt ? new Date(dto.conductedAt) : new Date(),
      followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
    }).save();
  }

  async listActivities(stakeholderId: string) {
    return this.activityModel.find({ stakeholderId }).sort({ conductedAt: -1 }).exec();
  }

  async listWhatsAppGroups(level?: string) {
    const filter: Record<string, unknown> = { isActive: true };
    if (level) filter.level = level;
    return this.waGroupModel.find(filter).sort({ level: 1, name: 1 }).exec();
  }

  async createWhatsAppGroup(dto: CreateWhatsAppGroupDto) {
    return new this.waGroupModel(dto).save();
  }
}
