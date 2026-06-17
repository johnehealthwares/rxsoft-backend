import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CandidateTourDocument, ContentAssetDocument,
  ListeningMentionDocument, RapidResponseDocument,
} from '../../schemas';
import {
  CreateCandidateTourDto, UpdateCandidateTourDto, CreateContentAssetDto,
  CreateListeningMentionDto, CreateRapidResponseDto,
} from '../../dto/intelligence.dto';
import { ListQueryDto } from '../../dto/apm.dto';

@Injectable()
export class ApmIntelligenceMongoService {
  constructor(
    @InjectModel('CandidateTour') private readonly tourModel: Model<CandidateTourDocument>,
    @InjectModel('ContentAsset') private readonly contentModel: Model<ContentAssetDocument>,
    @InjectModel('ListeningMention') private readonly mentionModel: Model<ListeningMentionDocument>,
    @InjectModel('RapidResponse') private readonly responseModel: Model<RapidResponseDocument>,
  ) {}

  async listTours(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };
    const [items, total] = await Promise.all([
      this.tourModel.find(filter).sort({ tourDate: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.tourModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async getTour(id: string) {
    const tour = await this.tourModel.findById(id).exec();
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async createTour(dto: CreateCandidateTourDto) {
    return new this.tourModel({ ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined }).save();
  }

  async updateTour(id: string, dto: UpdateCandidateTourDto) {
    const tour = await this.tourModel.findByIdAndUpdate(id, { $set: { ...dto, tourDate: dto.tourDate ? new Date(dto.tourDate) : undefined } }, { new: true }).exec();
    if (!tour) throw new NotFoundException('Tour not found');
    return tour;
  }

  async getTourStats() {
    const [total, completed, planned, cancelled] = await Promise.all([
      this.tourModel.countDocuments().exec(),
      this.tourModel.countDocuments({ status: 'completed' }).exec(),
      this.tourModel.countDocuments({ status: 'planned' }).exec(),
      this.tourModel.countDocuments({ status: 'cancelled' }).exec(),
    ]);
    const tours = await this.tourModel.find({}).exec();
    const totalAttendees = tours.reduce((sum, t) => sum + t.actualAttendees, 0);
    const totalSignups = tours.reduce((sum, t) => sum + t.volunteerSignups, 0);
    return { total, completed, planned, cancelled, totalAttendees, totalSignups };
  }

  async listContent(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };
    if (query.category) filter.type = query.category;
    const [items, total] = await Promise.all([
      this.contentModel.find(filter).sort({ createdAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.contentModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async createContent(dto: CreateContentAssetDto) {
    return new this.contentModel(dto).save();
  }

  async listMentions(query: ListQueryDto) {
    const filter: Record<string, unknown> = {};
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };
    if (query.category) filter.platform = query.category;
    const [items, total] = await Promise.all([
      this.mentionModel.find(filter).sort({ mentionedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.mentionModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async getMention(id: string) {
    const mention = await this.mentionModel.findById(id).exec();
    if (!mention) throw new NotFoundException('Mention not found');
    return mention;
  }

  async createMention(dto: CreateListeningMentionDto) {
    return new this.mentionModel({
      ...dto, mentionedAt: dto.mentionedAt ? new Date(dto.mentionedAt) : new Date(), isUrgent: dto.isUrgent ?? false,
    }).save();
  }

  async updateMentionStatus(id: string, status: string) {
    const mention = await this.mentionModel.findByIdAndUpdate(id, { $set: { status } }, { new: true }).exec();
    if (!mention) throw new NotFoundException('Mention not found');
    return mention;
  }

  async getListeningStats() {
    const [total, urgent, facebook, whatsapp, twitter, tiktok, instagram] = await Promise.all([
      this.mentionModel.countDocuments().exec(),
      this.mentionModel.countDocuments({ isUrgent: true }).exec(),
      this.mentionModel.countDocuments({ platform: 'facebook' }).exec(),
      this.mentionModel.countDocuments({ platform: 'whatsapp' }).exec(),
      this.mentionModel.countDocuments({ platform: 'twitter' }).exec(),
      this.mentionModel.countDocuments({ platform: 'tiktok' }).exec(),
      this.mentionModel.countDocuments({ platform: 'instagram' }).exec(),
    ]);
    return { total, urgent, facebook, whatsapp, twitter, tiktok, instagram };
  }

  async listResponses(mentionId: string) {
    return this.responseModel.find({ mentionId }).sort({ publishedAt: -1 }).exec();
  }

  async createResponse(dto: CreateRapidResponseDto) {
    return new this.responseModel({ ...dto, publishedAt: new Date() }).save();
  }
}
