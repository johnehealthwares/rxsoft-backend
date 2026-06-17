import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CampaignInfoDocument,
  AgendaItemDocument,
  AchievementDocument,
  NewsArticleDocument,
  EventDocument,
  EventRegistrationDocument,
  VolunteerDocument,
  SupporterDocument,
  TestimonialDocument,
  MediaAssetDocument,
  ContactSubmissionDocument,
  NewsletterSubscriberDocument,
  CitizenFeedbackDocument,
  IssueReportDocument,
  DonationDocument,
} from '../../schemas';
import {
  ListQueryDto, RegisterVolunteerDto, JoinMovementDto, CreateContactDto,
  NewsletterSubscribeDto, EventRegistrationDto, CitizenFeedbackDto, IssueReportDto, DonationDto,
} from '../../dto/apm.dto';

@Injectable()
export class ApmMongoService {
  constructor(
    @InjectModel('CampaignInfo') private readonly campaignInfoModel: Model<CampaignInfoDocument>,
    @InjectModel('AgendaItem') private readonly agendaModel: Model<AgendaItemDocument>,
    @InjectModel('Achievement') private readonly achievementModel: Model<AchievementDocument>,
    @InjectModel('NewsArticle') private readonly newsModel: Model<NewsArticleDocument>,
    @InjectModel('Event') private readonly eventModel: Model<EventDocument>,
    @InjectModel('EventRegistration') private readonly eventRegModel: Model<EventRegistrationDocument>,
    @InjectModel('Volunteer') private readonly volunteerModel: Model<VolunteerDocument>,
    @InjectModel('Supporter') private readonly supporterModel: Model<SupporterDocument>,
    @InjectModel('Testimonial') private readonly testimonialModel: Model<TestimonialDocument>,
    @InjectModel('MediaAsset') private readonly mediaModel: Model<MediaAssetDocument>,
    @InjectModel('ContactSubmission') private readonly contactModel: Model<ContactSubmissionDocument>,
    @InjectModel('NewsletterSubscriber') private readonly newsletterModel: Model<NewsletterSubscriberDocument>,
    @InjectModel('CitizenFeedback') private readonly feedbackModel: Model<CitizenFeedbackDocument>,
    @InjectModel('IssueReport') private readonly issueModel: Model<IssueReportDocument>,
    @InjectModel('Donation') private readonly donationModel: Model<DonationDocument>,
  ) {}

  async getHomepage() {
    const [infos, achievements, featuredNews, upcomingEvents, testimonials] = await Promise.all([
      this.campaignInfoModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
      this.achievementModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
      this.newsModel.find({ isPublished: true, isFeatured: true }).sort({ publishedAt: -1 }).limit(4).exec(),
      this.eventModel.find({ isPublished: true }).sort({ eventDate: 1 }).limit(3).exec(),
      this.testimonialModel.find({ isActive: true }).sort({ displayOrder: 1 }).limit(6).exec(),
    ]);
    return { infos, achievements, featuredNews, upcomingEvents, testimonials };
  }

  async listAgenda() {
    return this.agendaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async listAchievements() {
    return this.achievementModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async listNews(query: ListQueryDto) {
    const filter: Record<string, unknown> = { isPublished: true };
    if (query.search) filter.title = { $regex: query.search, $options: 'i' };
    if (query.category) filter.category = query.category;
    const [items, total] = await Promise.all([
      this.newsModel.find(filter).sort({ publishedAt: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      this.newsModel.countDocuments(filter).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }

  async getNewsBySlug(slug: string) {
    const article = await this.newsModel.findOne({ slug, isPublished: true }).exec();
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  async listEvents() {
    return this.eventModel.find({ isPublished: true }).sort({ eventDate: 1 }).exec();
  }

  async getEvent(id: string) {
    const event = await this.eventModel.findById(id).exec();
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async registerForEvent(eventId: string, dto: EventRegistrationDto) {
    const event = await this.eventModel.findById(eventId).exec();
    if (!event) throw new NotFoundException('Event not found');
    return new this.eventRegModel({ eventId, ...dto }).save();
  }

  async registerVolunteer(dto: RegisterVolunteerDto) {
    return new this.volunteerModel(dto).save();
  }

  async joinMovement(dto: JoinMovementDto) {
    return new this.supporterModel(dto).save();
  }

  async submitContact(dto: CreateContactDto) {
    return new this.contactModel(dto).save();
  }

  async subscribeNewsletter(dto: NewsletterSubscribeDto) {
    const existing = await this.newsletterModel.findOne({ email: dto.email }).exec();
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        await existing.save();
      }
      return existing;
    }
    return new this.newsletterModel(dto).save();
  }

  async submitFeedback(dto: CitizenFeedbackDto) {
    return new this.feedbackModel(dto).save();
  }

  async reportIssue(dto: IssueReportDto) {
    return new this.issueModel({ ...dto, status: 'open' }).save();
  }

  async listMedia() {
    return this.mediaModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async listTestimonials() {
    return this.testimonialModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async donate(dto: DonationDto) {
    return new this.donationModel(dto).save();
  }

  async listVolunteers(query: ListQueryDto) {
    return this.paginate(this.volunteerModel, query);
  }

  async listSupporters(query: ListQueryDto) {
    return this.paginate(this.supporterModel, query);
  }

  async listContacts(query: ListQueryDto) {
    return this.paginate(this.contactModel, query);
  }

  async listEventRegistrations(query: ListQueryDto) {
    return this.paginate(this.eventRegModel, query);
  }

  async listFeedback(query: ListQueryDto) {
    return this.paginate(this.feedbackModel, query);
  }

  async listIssues(query: ListQueryDto) {
    return this.paginate(this.issueModel, query);
  }

  async listDonations(query: ListQueryDto) {
    return this.paginate(this.donationModel, query);
  }

  async getStats() {
    const [volunteers, supporters, events, feedback] = await Promise.all([
      this.volunteerModel.countDocuments().exec(),
      this.supporterModel.countDocuments().exec(),
      this.eventModel.countDocuments({ isPublished: true }).exec(),
      this.feedbackModel.countDocuments().exec(),
    ]);
    return { volunteers, supporters, events, feedback };
  }

  private async paginate(model: Model<any>, query: ListQueryDto, orderField = 'createdAt') {
    const [items, total] = await Promise.all([
      model.find({}).sort({ [orderField]: -1 }).skip((query.page - 1) * query.limit).limit(query.limit).exec(),
      model.countDocuments({}).exec(),
    ]);
    return { items, total, page: query.page, limit: query.limit };
  }
}
