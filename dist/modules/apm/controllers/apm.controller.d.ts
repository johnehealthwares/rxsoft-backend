import { ApmService } from '../services/apm.service';
import { ListQueryDto, RegisterVolunteerDto, JoinMovementDto, CreateContactDto, NewsletterSubscribeDto, EventRegistrationDto, CitizenFeedbackDto, IssueReportDto, DonationDto } from '../dto/apm.dto';
export declare class ApmController {
    private readonly apmService;
    constructor(apmService: ApmService);
    getHomepage(): Promise<{
        infos: import("../entities").CampaignInfoOrmEntity[];
        achievements: import("../entities").AchievementOrmEntity[];
        featuredNews: import("../entities").NewsArticleOrmEntity[];
        upcomingEvents: import("../entities").EventOrmEntity[];
        testimonials: import("../entities").TestimonialOrmEntity[];
    }>;
    listAgenda(): Promise<import("../entities").AgendaItemOrmEntity[]>;
    listAchievements(): Promise<import("../entities").AchievementOrmEntity[]>;
    listNews(query: ListQueryDto): Promise<{
        items: import("../entities").NewsArticleOrmEntity[];
        total: number;
        page: number;
        limit: number;
    }>;
    getNewsBySlug(slug: string): Promise<import("../entities").NewsArticleOrmEntity>;
    listEvents(): Promise<import("../entities").EventOrmEntity[]>;
    getEvent(id: string): Promise<import("../entities").EventOrmEntity>;
    registerForEvent(id: string, dto: EventRegistrationDto): Promise<{
        name: string;
        phone: string;
        email?: string;
        lga?: string;
        ward?: string;
        eventId: string;
    } & import("../entities").EventRegistrationOrmEntity>;
    registerVolunteer(dto: RegisterVolunteerDto): Promise<RegisterVolunteerDto & import("../entities").VolunteerOrmEntity>;
    joinMovement(dto: JoinMovementDto): Promise<JoinMovementDto & import("../entities").SupporterOrmEntity>;
    submitContact(dto: CreateContactDto): Promise<CreateContactDto & import("../entities").ContactSubmissionOrmEntity>;
    subscribeNewsletter(dto: NewsletterSubscribeDto): Promise<import("../entities").NewsletterSubscriberOrmEntity>;
    submitFeedback(dto: CitizenFeedbackDto): Promise<CitizenFeedbackDto & import("../entities").CitizenFeedbackOrmEntity>;
    reportIssue(dto: IssueReportDto): Promise<{
        status: string;
        name: string;
        phone?: string;
        email?: string;
        lga?: string;
        ward?: string;
        category?: string;
        description: string;
    } & import("../entities").IssueReportOrmEntity>;
    listMedia(): Promise<import("../entities").MediaAssetOrmEntity[]>;
    listTestimonials(): Promise<import("../entities").TestimonialOrmEntity[]>;
    donate(dto: DonationDto): Promise<DonationDto & import("../entities").DonationOrmEntity>;
}
