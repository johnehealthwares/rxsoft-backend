import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  CampaignInfoOrmEntity,
  AgendaItemOrmEntity,
  AchievementOrmEntity,
  NewsArticleOrmEntity,
  EventOrmEntity,
  EventRegistrationOrmEntity,
  VolunteerOrmEntity,
  SupporterOrmEntity,
  TestimonialOrmEntity,
  MediaAssetOrmEntity,
  ContactSubmissionOrmEntity,
  NewsletterSubscriberOrmEntity,
  CitizenFeedbackOrmEntity,
  IssueReportOrmEntity,
  DonationOrmEntity,
} from '../entities';
import {
  ListQueryDto,
  RegisterVolunteerDto,
  JoinMovementDto,
  CreateContactDto,
  NewsletterSubscribeDto,
  EventRegistrationDto,
  CitizenFeedbackDto,
  IssueReportDto,
  DonationDto,
} from '../dto/apm.dto';

@Injectable()
export class ApmService {
  constructor(
    @InjectRepository(CampaignInfoOrmEntity)
    private readonly campaignInfoRepo: Repository<CampaignInfoOrmEntity>,
    @InjectRepository(AgendaItemOrmEntity)
    private readonly agendaRepo: Repository<AgendaItemOrmEntity>,
    @InjectRepository(AchievementOrmEntity)
    private readonly achievementRepo: Repository<AchievementOrmEntity>,
    @InjectRepository(NewsArticleOrmEntity)
    private readonly newsRepo: Repository<NewsArticleOrmEntity>,
    @InjectRepository(EventOrmEntity)
    private readonly eventRepo: Repository<EventOrmEntity>,
    @InjectRepository(EventRegistrationOrmEntity)
    private readonly eventRegRepo: Repository<EventRegistrationOrmEntity>,
    @InjectRepository(VolunteerOrmEntity)
    private readonly volunteerRepo: Repository<VolunteerOrmEntity>,
    @InjectRepository(SupporterOrmEntity)
    private readonly supporterRepo: Repository<SupporterOrmEntity>,
    @InjectRepository(TestimonialOrmEntity)
    private readonly testimonialRepo: Repository<TestimonialOrmEntity>,
    @InjectRepository(MediaAssetOrmEntity)
    private readonly mediaRepo: Repository<MediaAssetOrmEntity>,
    @InjectRepository(ContactSubmissionOrmEntity)
    private readonly contactRepo: Repository<ContactSubmissionOrmEntity>,
    @InjectRepository(NewsletterSubscriberOrmEntity)
    private readonly newsletterRepo: Repository<NewsletterSubscriberOrmEntity>,
    @InjectRepository(CitizenFeedbackOrmEntity)
    private readonly feedbackRepo: Repository<CitizenFeedbackOrmEntity>,
    @InjectRepository(IssueReportOrmEntity)
    private readonly issueRepo: Repository<IssueReportOrmEntity>,
    @InjectRepository(DonationOrmEntity)
    private readonly donationRepo: Repository<DonationOrmEntity>,
  ) {}

  // ── Homepage ───────────────────────────────────────────────────

  async getHomepage() {
    const [infos, achievements, featuredNews, upcomingEvents, testimonials] = await Promise.all([
      this.campaignInfoRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } }),
      this.achievementRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } }),
      this.newsRepo.find({ where: { isPublished: true, isFeatured: true }, order: { publishedAt: 'DESC' }, take: 4 }),
      this.eventRepo.find({ where: { isPublished: true }, order: { eventDate: 'ASC' }, take: 3 }),
      this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' }, take: 6 }),
    ]);

    return { infos, achievements, featuredNews, upcomingEvents, testimonials };
  }

  // ── Agenda ─────────────────────────────────────────────────────

  async listAgenda() {
    return this.agendaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  // ── Achievements ───────────────────────────────────────────────

  async listAchievements() {
    return this.achievementRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  // ── News ───────────────────────────────────────────────────────

  async listNews(query: ListQueryDto) {
    const where: Record<string, unknown> = { isPublished: true };
    if (query.search) where.title = ILike(`%${query.search}%`);
    if (query.category) where.category = query.category;

    const [items, total] = await this.newsRepo.findAndCount({
      where,
      order: { publishedAt: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });

    return { items, total, page: query.page, limit: query.limit };
  }

  async getNewsBySlug(slug: string) {
    const article = await this.newsRepo.findOne({ where: { slug, isPublished: true } });
    if (!article) throw new NotFoundException('Article not found');
    return article;
  }

  // ── Events ─────────────────────────────────────────────────────

  async listEvents() {
    return this.eventRepo.find({ where: { isPublished: true }, order: { eventDate: 'ASC' } });
  }

  async getEvent(id: string) {
    const event = await this.eventRepo.findOne({ where: { id, isPublished: true } });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async registerForEvent(eventId: string, dto: EventRegistrationDto) {
    const event = await this.eventRepo.findOne({ where: { id: eventId, isPublished: true } });
    if (!event) throw new NotFoundException('Event not found');
    return this.eventRegRepo.save({ eventId, ...dto });
  }

  // ── Volunteer ──────────────────────────────────────────────────

  async registerVolunteer(dto: RegisterVolunteerDto) {
    return this.volunteerRepo.save(dto);
  }

  // ── Join Movement ──────────────────────────────────────────────

  async joinMovement(dto: JoinMovementDto) {
    return this.supporterRepo.save(dto);
  }

  // ── Contact ────────────────────────────────────────────────────

  async submitContact(dto: CreateContactDto) {
    return this.contactRepo.save(dto);
  }

  // ── Newsletter ─────────────────────────────────────────────────

  async subscribeNewsletter(dto: NewsletterSubscribeDto) {
    const existing = await this.newsletterRepo.findOne({ where: { email: dto.email } });
    if (existing) {
      if (!existing.subscribed) {
        existing.subscribed = true;
        await this.newsletterRepo.save(existing);
      }
      return existing;
    }
    return this.newsletterRepo.save(dto);
  }

  // ── Citizens Speak ─────────────────────────────────────────────

  async submitFeedback(dto: CitizenFeedbackDto) {
    return this.feedbackRepo.save(dto);
  }

  // ── Report Issue ───────────────────────────────────────────────

  async reportIssue(dto: IssueReportDto) {
    return this.issueRepo.save({ ...dto, status: 'open' });
  }

  // ── Media ──────────────────────────────────────────────────────

  async listMedia() {
    return this.mediaRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  // ── Testimonials ───────────────────────────────────────────────

  async listTestimonials() {
    return this.testimonialRepo.find({ where: { isActive: true }, order: { displayOrder: 'ASC' } });
  }

  // ── Donate ─────────────────────────────────────────────────────

  async donate(dto: DonationDto) {
    return this.donationRepo.save(dto);
  }

  // ── Admin ──────────────────────────────────────────────────────

  async listVolunteers(query: ListQueryDto) {
    return this.paginate(this.volunteerRepo, query);
  }

  async listSupporters(query: ListQueryDto) {
    return this.paginate(this.supporterRepo, query);
  }

  async listContacts(query: ListQueryDto) {
    return this.paginate(this.contactRepo, query, 'createdAt');
  }

  async listEventRegistrations(query: ListQueryDto) {
    return this.paginate(this.eventRegRepo, query);
  }

  async listFeedback(query: ListQueryDto) {
    return this.paginate(this.feedbackRepo, query);
  }

  async listIssues(query: ListQueryDto) {
    return this.paginate(this.issueRepo, query);
  }

  async listDonations(query: ListQueryDto) {
    return this.paginate(this.donationRepo, query);
  }

  async getStats() {
    const [volunteers, supporters, events, feedback] = await Promise.all([
      this.volunteerRepo.count(),
      this.supporterRepo.count(),
      this.eventRepo.count({ where: { isPublished: true } }),
      this.feedbackRepo.count(),
    ]);

    return { volunteers, supporters, events, feedback };
  }

  private async paginate(repo: any, query: ListQueryDto, orderField = 'createdAt') {
    const [items, total] = await repo.findAndCount({
      order: { [orderField]: 'DESC' },
      skip: (query.page - 1) * query.limit,
      take: query.limit,
    });
    return { items, total, page: query.page, limit: query.limit };
  }
}
