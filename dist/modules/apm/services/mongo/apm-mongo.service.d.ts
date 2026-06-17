import { Model } from 'mongoose';
import { CampaignInfoDocument, AgendaItemDocument, AchievementDocument, NewsArticleDocument, EventDocument, EventRegistrationDocument, VolunteerDocument, SupporterDocument, TestimonialDocument, MediaAssetDocument, ContactSubmissionDocument, NewsletterSubscriberDocument, CitizenFeedbackDocument, IssueReportDocument, DonationDocument } from '../../schemas';
import { ListQueryDto, RegisterVolunteerDto, JoinMovementDto, CreateContactDto, NewsletterSubscribeDto, EventRegistrationDto, CitizenFeedbackDto, IssueReportDto, DonationDto } from '../../dto/apm.dto';
export declare class ApmMongoService {
    private readonly campaignInfoModel;
    private readonly agendaModel;
    private readonly achievementModel;
    private readonly newsModel;
    private readonly eventModel;
    private readonly eventRegModel;
    private readonly volunteerModel;
    private readonly supporterModel;
    private readonly testimonialModel;
    private readonly mediaModel;
    private readonly contactModel;
    private readonly newsletterModel;
    private readonly feedbackModel;
    private readonly issueModel;
    private readonly donationModel;
    constructor(campaignInfoModel: Model<CampaignInfoDocument>, agendaModel: Model<AgendaItemDocument>, achievementModel: Model<AchievementDocument>, newsModel: Model<NewsArticleDocument>, eventModel: Model<EventDocument>, eventRegModel: Model<EventRegistrationDocument>, volunteerModel: Model<VolunteerDocument>, supporterModel: Model<SupporterDocument>, testimonialModel: Model<TestimonialDocument>, mediaModel: Model<MediaAssetDocument>, contactModel: Model<ContactSubmissionDocument>, newsletterModel: Model<NewsletterSubscriberDocument>, feedbackModel: Model<CitizenFeedbackDocument>, issueModel: Model<IssueReportDocument>, donationModel: Model<DonationDocument>);
    getHomepage(): Promise<{
        infos: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        achievements: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        featuredNews: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        upcomingEvents: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").EventSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").EventSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        testimonials: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
    }>;
    listAgenda(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    listAchievements(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    listNews(query: ListQueryDto): Promise<{
        items: (import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: import("mongoose").Types.ObjectId;
        }>)[];
        total: number;
        page: number;
        limit: number;
    }>;
    getNewsBySlug(slug: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listEvents(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").EventSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").EventSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getEvent(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").EventSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").EventSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    registerForEvent(eventId: string, dto: EventRegistrationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    registerVolunteer(dto: RegisterVolunteerDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    joinMovement(dto: JoinMovementDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitContact(dto: CreateContactDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    subscribeNewsletter(dto: NewsletterSubscribeDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    submitFeedback(dto: CitizenFeedbackDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    reportIssue(dto: IssueReportDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listMedia(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    listTestimonials(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    donate(dto: DonationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../../schemas").DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../../schemas").DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & import("../../schemas").DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listVolunteers(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    listSupporters(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    listContacts(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    listEventRegistrations(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    listFeedback(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    listIssues(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
        page: number;
        limit: number;
    }>;
    listDonations(query: ListQueryDto): Promise<{
        items: any[];
        total: number;
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
