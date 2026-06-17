import { Repository } from 'typeorm';
import { CampaignInfoOrmEntity, AgendaItemOrmEntity, AchievementOrmEntity, NewsArticleOrmEntity, EventOrmEntity, EventRegistrationOrmEntity, VolunteerOrmEntity, SupporterOrmEntity, TestimonialOrmEntity, MediaAssetOrmEntity, ContactSubmissionOrmEntity, NewsletterSubscriberOrmEntity, CitizenFeedbackOrmEntity, IssueReportOrmEntity, DonationOrmEntity } from '../entities';
import { ListQueryDto, RegisterVolunteerDto, JoinMovementDto, CreateContactDto, NewsletterSubscribeDto, EventRegistrationDto, CitizenFeedbackDto, IssueReportDto, DonationDto } from '../dto/apm.dto';
export declare class ApmService {
    private readonly campaignInfoRepo;
    private readonly agendaRepo;
    private readonly achievementRepo;
    private readonly newsRepo;
    private readonly eventRepo;
    private readonly eventRegRepo;
    private readonly volunteerRepo;
    private readonly supporterRepo;
    private readonly testimonialRepo;
    private readonly mediaRepo;
    private readonly contactRepo;
    private readonly newsletterRepo;
    private readonly feedbackRepo;
    private readonly issueRepo;
    private readonly donationRepo;
    constructor(campaignInfoRepo: Repository<CampaignInfoOrmEntity>, agendaRepo: Repository<AgendaItemOrmEntity>, achievementRepo: Repository<AchievementOrmEntity>, newsRepo: Repository<NewsArticleOrmEntity>, eventRepo: Repository<EventOrmEntity>, eventRegRepo: Repository<EventRegistrationOrmEntity>, volunteerRepo: Repository<VolunteerOrmEntity>, supporterRepo: Repository<SupporterOrmEntity>, testimonialRepo: Repository<TestimonialOrmEntity>, mediaRepo: Repository<MediaAssetOrmEntity>, contactRepo: Repository<ContactSubmissionOrmEntity>, newsletterRepo: Repository<NewsletterSubscriberOrmEntity>, feedbackRepo: Repository<CitizenFeedbackOrmEntity>, issueRepo: Repository<IssueReportOrmEntity>, donationRepo: Repository<DonationOrmEntity>);
    getHomepage(): Promise<{
        infos: CampaignInfoOrmEntity[];
        achievements: AchievementOrmEntity[];
        featuredNews: NewsArticleOrmEntity[];
        upcomingEvents: EventOrmEntity[];
        testimonials: TestimonialOrmEntity[];
    }>;
    listAgenda(): Promise<AgendaItemOrmEntity[]>;
    listAchievements(): Promise<AchievementOrmEntity[]>;
    listNews(query: ListQueryDto): Promise<{
        items: NewsArticleOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getNewsBySlug(slug: string): Promise<NewsArticleOrmEntity>;
    listEvents(): Promise<EventOrmEntity[]>;
    getEvent(id: string): Promise<EventOrmEntity>;
    registerForEvent(eventId: string, dto: EventRegistrationDto): Promise<{
        name: string;
        phone: string;
        email?: string;
        lga?: string;
        ward?: string;
        eventId: string;
    } & EventRegistrationOrmEntity>;
    registerVolunteer(dto: RegisterVolunteerDto): Promise<RegisterVolunteerDto & VolunteerOrmEntity>;
    joinMovement(dto: JoinMovementDto): Promise<JoinMovementDto & SupporterOrmEntity>;
    submitContact(dto: CreateContactDto): Promise<CreateContactDto & ContactSubmissionOrmEntity>;
    subscribeNewsletter(dto: NewsletterSubscribeDto): Promise<NewsletterSubscriberOrmEntity>;
    submitFeedback(dto: CitizenFeedbackDto): Promise<CitizenFeedbackDto & CitizenFeedbackOrmEntity>;
    reportIssue(dto: IssueReportDto): Promise<{
        status: string;
        name: string;
        phone?: string;
        email?: string;
        lga?: string;
        ward?: string;
        category?: string;
        description: string;
    } & IssueReportOrmEntity>;
    listMedia(): Promise<MediaAssetOrmEntity[]>;
    listTestimonials(): Promise<TestimonialOrmEntity[]>;
    donate(dto: DonationDto): Promise<DonationDto & DonationOrmEntity>;
    listVolunteers(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listSupporters(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listContacts(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listEventRegistrations(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listFeedback(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listIssues(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    listDonations(query: ListQueryDto): Promise<{
        items: any;
        total: any;
        page: number;
        limit: number;
    }>;
    getStats(): Promise<{
        volunteers: number;
        supporters: number;
        events: number;
        feedback: number;
    }>;
    private paginate;
}
