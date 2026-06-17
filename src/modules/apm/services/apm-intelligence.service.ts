import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  CandidateTourOrmEntity,
  ContentAssetOrmEntity,
  ListeningMentionOrmEntity,
  RapidResponseOrmEntity,
} from '../entities';
import {
  CreateCandidateTourDto,
  UpdateCandidateTourDto,
  CreateContentAssetDto,
  CreateListeningMentionDto,
  CreateRapidResponseDto,
} from '../dto/intelligence.dto';
import { ListQueryDto } from '../dto/apm.dto';

@Injectable()
export class ApmIntelligenceService {
  constructor(
    @InjectRepository(CandidateTourOrmEntity)
    private readonly tourRepo: Repository<CandidateTourOrmEntity>,
    @InjectRepository(ContentAssetOrmEntity)
    private readonly contentRepo: Repository<ContentAssetOrmEntity>,
    @InjectRepository(ListeningMentionOrmEntity)
    private readonly mentionRepo: Repository<ListeningMentionOrmEntity>,
    @InjectRepository(RapidResponseOrmEntity)
    private readonly responseRepo: Repository<RapidResponseOrmEntity>,
  ) {}

  // ── Candidate Tours ────────────────────────────────────────

  async listTours(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);
    const [items, total] = await this.tourRepo.findAndCount({
      where, order: { tourDate: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async getTour(id: string) {
    const tour = await this.tourRepo.findOne({ where: { id } });
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async createTour(dto: CreateCandidateTourDto) {
    return this.tourRepo.save({
      ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined,
    });
  }

  async updateTour(id: string, dto: UpdateCandidateTourDto) {
    const tour = await this.tourRepo.findOne({ where: { id } });
    if (!tour) throw new NotFoundException('Tour not found');
    Object.assign(tour, { ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined });
    return this.tourRepo.save(tour);
  }

  async getTourStats() {
    const [total, completed, planned, cancelled] = await Promise.all([
      this.tourRepo.count(),
      this.tourRepo.count({ where: { status: 'completed' } }),
      this.tourRepo.count({ where: { status: 'planned' } }),
      this.tourRepo.count({ where: { status: 'cancelled' } }),
    ]);
    const tours = await this.tourRepo.find();
    const totalAttendees = tours.reduce((sum, t) => sum + t.actualAttendees, 0);
    const totalSignups = tours.reduce((sum, t) => sum + t.volunteerSignups, 0);
    return { total, completed, planned, cancelled, totalAttendees, totalSignups };
  }

  // ── Content Assets ─────────────────────────────────────────

  async listContent(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);
    if (query.category) where.type = query.category;
    const [items, total] = await this.contentRepo.findAndCount({
      where: Object.keys(where).length ? where : {},
      order: { createdAt: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async createContent(dto: CreateContentAssetDto) {
    return this.contentRepo.save(dto);
  }

  // ── Listening Mentions ─────────────────────────────────────

  async listMentions(query: ListQueryDto) {
    const where: Record<string, unknown> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);
    if (query.category) where.platform = query.category;
    const [items, total] = await this.mentionRepo.findAndCount({
      where: Object.keys(where).length ? where : {},
      order: { mentionedAt: 'DESC' },
      skip: (query.page - 1) * query.limit, take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }

  async getMention(id: string) {
    const mention = await this.mentionRepo.findOne({ where: { id } });
    if (!mention) throw new NotFoundException('Mention not found');
    return mention;
  }

  async createMention(dto: CreateListeningMentionDto) {
    return this.mentionRepo.save({
      ...dto,
      mentionedAt: dto.mentionedAt ? new Date(dto.mentionedAt) : new Date(),
      isUrgent: dto.isUrgent ?? false,
    });
  }

  async updateMentionStatus(id: string, status: string) {
    const mention = await this.mentionRepo.findOne({ where: { id } });
    if (!mention) throw new NotFoundException('Mention not found');
    mention.status = status;
    return this.mentionRepo.save(mention);
  }

  async getListeningStats() {
    const [total, urgent, facebook, whatsapp, twitter, tiktok, instagram] = await Promise.all([
      this.mentionRepo.count(),
      this.mentionRepo.count({ where: { isUrgent: true } }),
      this.mentionRepo.count({ where: { platform: 'facebook' } }),
      this.mentionRepo.count({ where: { platform: 'whatsapp' } }),
      this.mentionRepo.count({ where: { platform: 'twitter' } }),
      this.mentionRepo.count({ where: { platform: 'tiktok' } }),
      this.mentionRepo.count({ where: { platform: 'instagram' } }),
    ]);
    return { total, urgent, facebook, whatsapp, twitter, tiktok, instagram };
  }

  // ── Rapid Responses ────────────────────────────────────────

  async listResponses(mentionId: string) {
    return this.responseRepo.find({
      where: { mentionId },
      order: { publishedAt: 'DESC' },
    });
  }

  async createResponse(dto: CreateRapidResponseDto) {
    return this.responseRepo.save({ ...dto, publishedAt: new Date() });
  }
}
