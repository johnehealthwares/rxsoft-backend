import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  CanvassingSessionOrmEntity,
  CanvassingVisitOrmEntity,
  VolunteerAssignmentOrmEntity,
  VolunteerOrmEntity,
  CitizenFeedbackOrmEntity,
} from '../entities';
import {
  CreateCanvassingSessionDto,
  UpdateCanvassingSessionDto,
  CreateCanvassingVisitDto,
  CreateVolunteerAssignmentDto,
  UpdateVolunteerAssignmentDto,
} from '../dto/canvassing.dto';
import { ListQueryDto } from '../dto/apm.dto';

@Injectable()
export class ApmCanvassingService {
  constructor(
    @InjectRepository(CanvassingSessionOrmEntity)
    private readonly sessionRepo: Repository<CanvassingSessionOrmEntity>,
    @InjectRepository(CanvassingVisitOrmEntity)
    private readonly visitRepo: Repository<CanvassingVisitOrmEntity>,
    @InjectRepository(VolunteerAssignmentOrmEntity)
    private readonly assignmentRepo: Repository<VolunteerAssignmentOrmEntity>,
    @InjectRepository(VolunteerOrmEntity)
    private readonly volunteerRepo: Repository<VolunteerOrmEntity>,
    @InjectRepository(CitizenFeedbackOrmEntity)
    private readonly feedbackRepo: Repository<CitizenFeedbackOrmEntity>,
  ) {}

  // ── Canvassing Sessions ─────────────────────────────────────

  async listSessions(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);

    const [items, total] = await this.sessionRepo.findAndCount({
      where,
      order: { scheduledDate: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { items, total, page: query.page, limit: query.limit };
  }

  async getSession(id: string) {
    const session = await this.sessionRepo.findOne({
      where: { id },
      relations: ['visits'],
    });
    if (!session) throw new NotFoundException('Session not found');
    return session;
  }

  async createSession(dto: CreateCanvassingSessionDto) {
    return this.sessionRepo.save({
      ...dto,
      scheduledDate: dto.scheduledDate ? new Date(dto.scheduledDate) : undefined,
    });
  }

  async updateSession(id: string, dto: UpdateCanvassingSessionDto) {
    const session = await this.sessionRepo.findOne({ where: { id } });
    if (!session) throw new NotFoundException('Session not found');
    Object.assign(session, {
      ...dto,
      completedDate: dto.completedDate ? new Date(dto.completedDate) : undefined,
    });
    return this.sessionRepo.save(session);
  }

  async getSessionStats() {
    const [total, planned, inProgress, completed] = await Promise.all([
      this.sessionRepo.count(),
      this.sessionRepo.count({ where: { status: 'planned' } }),
      this.sessionRepo.count({ where: { status: 'in-progress' } }),
      this.sessionRepo.count({ where: { status: 'completed' } }),
    ]);
    const visits = await this.visitRepo.count();
    return { total, planned, inProgress, completed, totalVisits: visits };
  }

  // ── Canvassing Visits ───────────────────────────────────────

  async addVisit(sessionId: string, dto: CreateCanvassingVisitDto) {
    const session = await this.sessionRepo.findOne({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Session not found');

    return this.visitRepo.save({
      sessionId,
      ...dto,
      contactedAt: dto.contactedAt ? new Date(dto.contactedAt) : new Date(),
    });
  }

  async listVisits(sessionId: string) {
    return this.visitRepo.find({
      where: { sessionId },
      order: { contactedAt: 'DESC' },
    });
  }

  async getVisitStats(sessionId: string) {
    const visits = await this.visitRepo.find({ where: { sessionId } });
    const total = visits.length;
    const strong = visits.filter((v) => v.supportLevel === 'strong').length;
    const leaning = visits.filter((v) => v.supportLevel === 'leaning').length;
    const undecided = visits.filter((v) => v.supportLevel === 'undecided' || !v.supportLevel).length;
    const opposed = visits.filter((v) => v.supportLevel === 'opposed' || v.supportLevel === 'hostile').length;

    return { total, strong, leaning, undecided, opposed, supportRate: total ? Math.round((strong + leaning) / total * 100) : 0 };
  }

  // ── All Visits Stats ────────────────────────────────────────

  async getAllVisitStats() {
    const visits = await this.visitRepo.find();
    const total = visits.length;
    const strong = visits.filter((v) => v.supportLevel === 'strong').length;
    const leaning = visits.filter((v) => v.supportLevel === 'leaning').length;
    const undecided = visits.filter((v) => v.supportLevel === 'undecided' || !v.supportLevel).length;
    const opposed = visits.filter((v) => v.supportLevel === 'opposed' || v.supportLevel === 'hostile').length;

    return { total, strong, leaning, undecided, opposed, supportRate: total ? Math.round((strong + leaning) / total * 100) : 0 };
  }

  // ── Volunteer Assignments ───────────────────────────────────

  async listAssignments(query: ListQueryDto) {
    const [items, total] = await this.assignmentRepo.findAndCount({
      order: { assignedAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { items, total, page: query.page, limit: query.limit };
  }

  async listAssignmentsByWard(wardId: string) {
    return this.assignmentRepo.find({
      where: { wardId, status: 'active' },
      order: { assignedAt: 'DESC' },
    });
  }

  async createAssignment(dto: CreateVolunteerAssignmentDto) {
    return this.assignmentRepo.save({
      ...dto,
      assignedAt: new Date(),
    });
  }

  async updateAssignment(id: string, dto: UpdateVolunteerAssignmentDto) {
    const assignment = await this.assignmentRepo.findOne({ where: { id } });
    if (!assignment) throw new NotFoundException('Assignment not found');
    Object.assign(assignment, dto);
    return this.assignmentRepo.save(assignment);
  }

  async getVolunteerStats() {
    const [total, assigned, active] = await Promise.all([
      this.volunteerRepo.count(),
      this.assignmentRepo.count(),
      this.assignmentRepo.count({ where: { status: 'active' } }),
    ]);
    return { totalVolunteers: total, totalAssignments: assigned, activeAssignments: active };
  }

  // ── Sentiment Analysis ──────────────────────────────────────

  async getSentimentDashboard() {
    const feedback = await this.feedbackRepo.find();
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
      total,
      positive,
      negative,
      neutral,
      sentimentScore: total ? Math.round((positive - negative) / total * 100) : 0,
      topicBreakdown,
      byLga,
    };
  }
}
