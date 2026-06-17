import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CanvassingSessionDocument, CanvassingVisitDocument,
  VolunteerAssignmentDocument, VolunteerDocument, CitizenFeedbackDocument,
} from '../../schemas';
import {
  CreateCanvassingSessionDto, UpdateCanvassingSessionDto, CreateCanvassingVisitDto,
  CreateVolunteerAssignmentDto, UpdateVolunteerAssignmentDto,
} from '../../dto/canvassing.dto';
import { ListQueryDto } from '../../dto/apm.dto';

@Injectable()
export class ApmCanvassingMongoService {
  constructor(
    @InjectModel('CanvassingSession') private readonly sessionModel: Model<CanvassingSessionDocument>,
    @InjectModel('CanvassingVisit') private readonly visitModel: Model<CanvassingVisitDocument>,
    @InjectModel('VolunteerAssignment') private readonly assignmentModel: Model<VolunteerAssignmentDocument>,
    @InjectModel('Volunteer') private readonly volunteerModel: Model<VolunteerDocument>,
    @InjectModel('CitizenFeedback') private readonly feedbackModel: Model<CitizenFeedbackDocument>,
  ) {}

  async listSessions(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };
    const [items, total] = await Promise.all([
      this.sessionModel.find(filter).sort({ scheduledDate: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.sessionModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async getSession(id: string) {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) throw new NotFoundException('Session not found');
    const visits = await this.visitModel.find({ sessionId: id }).sort({ contactedAt: -1 }).exec();
    return { ...session.toObject(), visits };
  }

  async createSession(dto: CreateCanvassingSessionDto) {
    return new this.sessionModel({
      ...dto, scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
    }).save();
  }

  async updateSession(id: string, dto: UpdateCanvassingSessionDto) {
    const session = await this.sessionModel.findById(id).exec();
    if (!session) throw new NotFoundException('Session not found');
    Object.assign(session, {
      ...dto, completedDate: dto.completedDate ? new Date(dto.completedDate) : undefined,
    });
    return session.save();
  }

  async getSessionStats() {
    const [total, planned, inProgress, completed] = await Promise.all([
      this.sessionModel.countDocuments().exec(),
      this.sessionModel.countDocuments({ status: 'planned' }).exec(),
      this.sessionModel.countDocuments({ status: 'in-progress' }).exec(),
      this.sessionModel.countDocuments({ status: 'completed' }).exec(),
    ]);
    const totalVisits = await this.visitModel.countDocuments().exec();
    return { total, planned, inProgress, completed, totalVisits };
  }

  async addVisit(sessionId: string, dto: CreateCanvassingVisitDto) {
    const session = await this.sessionModel.findById(sessionId).exec();
    if (!session) throw new NotFoundException('Session not found');
    return new this.visitModel({
      sessionId, ...dto, contactedAt: dto.contactedAt ? new Date(dto.contactedAt) : new Date(),
    }).save();
  }

  async listVisits(sessionId: string) {
    return this.visitModel.find({ sessionId }).sort({ contactedAt: -1 }).exec();
  }

  private calcVisitStats(visits: CanvassingVisitDocument[]) {
    const total = visits.length;
    const strong = visits.filter((v) => v.supportLevel === 'strong').length;
    const leaning = visits.filter((v) => v.supportLevel === 'leaning').length;
    const undecided = visits.filter((v) => v.supportLevel === 'undecided' || !v.supportLevel).length;
    const opposed = visits.filter((v) => v.supportLevel === 'opposed' || v.supportLevel === 'hostile').length;
    return { total, strong, leaning, undecided, opposed, supportRate: total ? Math.round((strong + leaning) / total * 100) : 0 };
  }

  async getVisitStats(sessionId: string) {
    const visits = await this.visitModel.find({ sessionId }).exec();
    return this.calcVisitStats(visits);
  }

  async getAllVisitStats() {
    const visits = await this.visitModel.find({}).exec();
    return this.calcVisitStats(visits);
  }

  async listAssignments(query: ListQueryDto) {
    const [items, total] = await Promise.all([
      this.assignmentModel.find({}).sort({ assignedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.assignmentModel.countDocuments({}).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async listAssignmentsByWard(wardId: string) {
    return this.assignmentModel.find({ wardId, status: 'active' }).sort({ assignedAt: -1 }).exec();
  }

  async createAssignment(dto: CreateVolunteerAssignmentDto) {
    return new this.assignmentModel({ ...dto, assignedAt: new Date() }).save();
  }

  async updateAssignment(id: string, dto: UpdateVolunteerAssignmentDto) {
    const assignment = await this.assignmentModel.findByIdAndUpdate(id, { $set: dto }, { new: true }).exec();
    if (!assignment) throw new NotFoundException('Assignment not found');
    return assignment;
  }

  async getVolunteerStats() {
    const [total, assigned, active] = await Promise.all([
      this.volunteerModel.countDocuments().exec(),
      this.assignmentModel.countDocuments().exec(),
      this.assignmentModel.countDocuments({ status: 'active' }).exec(),
    ]);
    return { totalVolunteers: total, totalAssignments: assigned, activeAssignments: active };
  }

  async getSentimentDashboard() {
    const feedback = await this.feedbackModel.find({}).exec();
    const total = feedback.length;
    const positive = feedback.filter((f) => f.sentiment === 'positive').length;
    const negative = feedback.filter((f) => f.sentiment === 'negative').length;
    const neutral = feedback.filter((f) => f.sentiment === 'neutral' || !f.sentiment).length;

    const topics = new Map<string, number>();
    for (const f of feedback) {
      if (f.topic) topics.set(f.topic, (topics.get(f.topic) || 0) + 1);
    }
    const topicBreakdown = Array.from(topics.entries()).map(([topic, count]) => ({ topic, count }));

    const lgaSentiment = new Map<string, { positive: number; negative: number; neutral: number; total: number }>();
    for (const f of feedback) {
      if (!f.lga) continue;
      const existing = lgaSentiment.get(f.lga) || { positive: 0, negative: 0, neutral: 0, total: 0 };
      existing.total++;
      if (f.sentiment === 'positive') existing.positive++;
      else if (f.sentiment === 'negative') existing.negative++;
      else existing.neutral++;
      lgaSentiment.set(f.lga, existing);
    }
    const byLga = Array.from(lgaSentiment.entries()).map(([lga, data]) => ({ lga, ...data }));

    return {
      total, positive, negative, neutral,
      sentimentScore: total ? Math.round((positive - negative) / total * 100) : 0,
      topicBreakdown, byLga,
    };
  }
}
