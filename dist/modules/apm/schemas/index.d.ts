import { CampaignInfoSchema, CampaignInfoSchemaFactory } from './campaign-info.schema';
import { AgendaItemSchema, AgendaItemSchemaFactory } from './agenda-item.schema';
import { AchievementSchema, AchievementSchemaFactory } from './achievement.schema';
import { NewsArticleSchema, NewsArticleSchemaFactory } from './news-article.schema';
import { EventSchema, EventSchemaFactory } from './event.schema';
import { EventRegistrationSchema, EventRegistrationSchemaFactory } from './event-registration.schema';
import { VolunteerSchema, VolunteerSchemaFactory } from './volunteer.schema';
import { SupporterSchema, SupporterSchemaFactory } from './supporter.schema';
import { TestimonialSchema, TestimonialSchemaFactory } from './testimonial.schema';
import { MediaAssetSchema, MediaAssetSchemaFactory } from './media-asset.schema';
import { ContactSubmissionSchema, ContactSubmissionSchemaFactory } from './contact-submission.schema';
import { NewsletterSubscriberSchema, NewsletterSubscriberSchemaFactory } from './newsletter-subscriber.schema';
import { CitizenFeedbackSchema, CitizenFeedbackSchemaFactory } from './citizen-feedback.schema';
import { IssueReportSchema, IssueReportSchemaFactory } from './issue-report.schema';
import { DonationSchema, DonationSchemaFactory } from './donation.schema';
import { CanvassingSessionSchema, CanvassingSessionSchemaFactory } from './canvassing-session.schema';
import { CanvassingVisitSchema, CanvassingVisitSchemaFactory } from './canvassing-visit.schema';
import { VolunteerAssignmentSchema, VolunteerAssignmentSchemaFactory } from './volunteer-assignment.schema';
import { CandidateTourSchema, CandidateTourSchemaFactory } from './candidate-tour.schema';
import { ContentAssetSchema, ContentAssetSchemaFactory } from './content-asset.schema';
import { ListeningMentionSchema, ListeningMentionSchemaFactory } from './listening-mention.schema';
import { RapidResponseSchema, RapidResponseSchemaFactory } from './rapid-response.schema';
import { LgaSchema, LgaSchemaFactory } from './lga.schema';
import { WardSchema, WardSchemaFactory } from './ward.schema';
import { PollingUnitSchema, PollingUnitSchemaFactory } from './polling-unit.schema';
import { StakeholderSchema, StakeholderSchemaFactory } from './stakeholder.schema';
import { ConversionScoreSchema, ConversionScoreSchemaFactory } from './conversion-score.schema';
import { ConversionActivitySchema, ConversionActivitySchemaFactory } from './conversion-activity.schema';
import { WhatsAppGroupSchema, WhatsAppGroupSchemaFactory } from './whatsapp-group.schema';
import { PollingAgentSchema, PollingAgentSchemaFactory } from './polling-agent.schema';
import { ResultEntrySchema, ResultEntrySchemaFactory } from './result-entry.schema';
import { IncidentReportSchema, IncidentReportSchemaFactory } from './incident-report.schema';
import { GotvRecordSchema, GotvRecordSchemaFactory } from './gotv-record.schema';
export { CampaignInfoSchema, CampaignInfoSchemaFactory, AgendaItemSchema, AgendaItemSchemaFactory, AchievementSchema, AchievementSchemaFactory, NewsArticleSchema, NewsArticleSchemaFactory, EventSchema, EventSchemaFactory, EventRegistrationSchema, EventRegistrationSchemaFactory, VolunteerSchema, VolunteerSchemaFactory, SupporterSchema, SupporterSchemaFactory, TestimonialSchema, TestimonialSchemaFactory, MediaAssetSchema, MediaAssetSchemaFactory, ContactSubmissionSchema, ContactSubmissionSchemaFactory, NewsletterSubscriberSchema, NewsletterSubscriberSchemaFactory, CitizenFeedbackSchema, CitizenFeedbackSchemaFactory, IssueReportSchema, IssueReportSchemaFactory, DonationSchema, DonationSchemaFactory, CanvassingSessionSchema, CanvassingSessionSchemaFactory, CanvassingVisitSchema, CanvassingVisitSchemaFactory, VolunteerAssignmentSchema, VolunteerAssignmentSchemaFactory, CandidateTourSchema, CandidateTourSchemaFactory, ContentAssetSchema, ContentAssetSchemaFactory, ListeningMentionSchema, ListeningMentionSchemaFactory, RapidResponseSchema, RapidResponseSchemaFactory, LgaSchema, LgaSchemaFactory, WardSchema, WardSchemaFactory, PollingUnitSchema, PollingUnitSchemaFactory, StakeholderSchema, StakeholderSchemaFactory, ConversionScoreSchema, ConversionScoreSchemaFactory, ConversionActivitySchema, ConversionActivitySchemaFactory, WhatsAppGroupSchema, WhatsAppGroupSchemaFactory, PollingAgentSchema, PollingAgentSchemaFactory, ResultEntrySchema, ResultEntrySchemaFactory, IncidentReportSchema, IncidentReportSchemaFactory, GotvRecordSchema, GotvRecordSchemaFactory, };
export type { CampaignInfoDocument } from './campaign-info.schema';
export type { AgendaItemDocument } from './agenda-item.schema';
export type { AchievementDocument } from './achievement.schema';
export type { NewsArticleDocument } from './news-article.schema';
export type { EventDocument } from './event.schema';
export type { EventRegistrationDocument } from './event-registration.schema';
export type { VolunteerDocument } from './volunteer.schema';
export type { SupporterDocument } from './supporter.schema';
export type { TestimonialDocument } from './testimonial.schema';
export type { MediaAssetDocument } from './media-asset.schema';
export type { ContactSubmissionDocument } from './contact-submission.schema';
export type { NewsletterSubscriberDocument } from './newsletter-subscriber.schema';
export type { CitizenFeedbackDocument } from './citizen-feedback.schema';
export type { IssueReportDocument } from './issue-report.schema';
export type { DonationDocument } from './donation.schema';
export type { CanvassingSessionDocument } from './canvassing-session.schema';
export type { CanvassingVisitDocument } from './canvassing-visit.schema';
export type { VolunteerAssignmentDocument } from './volunteer-assignment.schema';
export type { CandidateTourDocument } from './candidate-tour.schema';
export type { ContentAssetDocument } from './content-asset.schema';
export type { ListeningMentionDocument } from './listening-mention.schema';
export type { RapidResponseDocument } from './rapid-response.schema';
export type { LgaDocument } from './lga.schema';
export type { WardDocument } from './ward.schema';
export type { PollingUnitDocument } from './polling-unit.schema';
export type { StakeholderDocument } from './stakeholder.schema';
export type { ConversionScoreDocument } from './conversion-score.schema';
export type { ConversionActivityDocument } from './conversion-activity.schema';
export type { WhatsAppGroupDocument } from './whatsapp-group.schema';
export type { PollingAgentDocument } from './polling-agent.schema';
export type { ResultEntryDocument } from './result-entry.schema';
export type { IncidentReportDocument } from './incident-report.schema';
export type { GotvRecordDocument } from './gotv-record.schema';
export declare const mongooseModelNames: string[];
export declare const mongooseFeatureModels: ({
    name: string;
    schema: import("mongoose").Schema<CampaignInfoSchema, import("mongoose").Model<CampaignInfoSchema, any, any, any, any, any, CampaignInfoSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        key?: import("mongoose").SchemaDefinitionProperty<string, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        value?: import("mongoose").SchemaDefinitionProperty<string, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        label?: import("mongoose").SchemaDefinitionProperty<string | null, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, CampaignInfoSchema, import("mongoose").Document<unknown, {}, CampaignInfoSchema, {}, import("mongoose").DefaultSchemaOptions> & CampaignInfoSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, CampaignInfoSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<AgendaItemSchema, import("mongoose").Model<AgendaItemSchema, any, any, any, any, any, AgendaItemSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        summary?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        icon?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AgendaItemSchema, import("mongoose").Document<unknown, {}, AgendaItemSchema, {}, import("mongoose").DefaultSchemaOptions> & AgendaItemSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, AgendaItemSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<AchievementSchema, import("mongoose").Model<AchievementSchema, any, any, any, any, any, AchievementSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        summary?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        statLabel?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        statValue?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, AchievementSchema, import("mongoose").Document<unknown, {}, AchievementSchema, {}, import("mongoose").DefaultSchemaOptions> & AchievementSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, AchievementSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<NewsArticleSchema, import("mongoose").Model<NewsArticleSchema, any, any, any, any, any, NewsArticleSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        slug?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        excerpt?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        content?: import("mongoose").SchemaDefinitionProperty<string, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        authorName?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        videoUrl?: import("mongoose").SchemaDefinitionProperty<string | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isFeatured?: import("mongoose").SchemaDefinitionProperty<boolean, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        publishedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, NewsArticleSchema, import("mongoose").Document<unknown, {}, NewsArticleSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsArticleSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, NewsArticleSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<EventSchema, import("mongoose").Model<EventSchema, any, any, any, any, any, EventSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        location?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        eventDate?: import("mongoose").SchemaDefinitionProperty<Date | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        eventTime?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        imageUrl?: import("mongoose").SchemaDefinitionProperty<string | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        maxAttendees?: import("mongoose").SchemaDefinitionProperty<number | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isPublished?: import("mongoose").SchemaDefinitionProperty<boolean, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, EventSchema, import("mongoose").Document<unknown, {}, EventSchema, {}, import("mongoose").DefaultSchemaOptions> & EventSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, EventSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<EventRegistrationSchema, import("mongoose").Model<EventRegistrationSchema, any, any, any, any, any, EventRegistrationSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        eventId?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lga?: import("mongoose").SchemaDefinitionProperty<string | null, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        ward?: import("mongoose").SchemaDefinitionProperty<string | null, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        attended?: import("mongoose").SchemaDefinitionProperty<boolean, EventRegistrationSchema, import("mongoose").Document<unknown, {}, EventRegistrationSchema, {}, import("mongoose").DefaultSchemaOptions> & EventRegistrationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, EventRegistrationSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<VolunteerSchema, import("mongoose").Model<VolunteerSchema, any, any, any, any, any, VolunteerSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lga?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        ward?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pollingUnit?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        skills?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        interests?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        availability?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        onboarded?: import("mongoose").SchemaDefinitionProperty<boolean, VolunteerSchema, import("mongoose").Document<unknown, {}, VolunteerSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, VolunteerSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<SupporterSchema, import("mongoose").Model<SupporterSchema, any, any, any, any, any, SupporterSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lga?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        ward?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        interests?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        skills?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        source?: import("mongoose").SchemaDefinitionProperty<string | null, SupporterSchema, import("mongoose").Document<unknown, {}, SupporterSchema, {}, import("mongoose").DefaultSchemaOptions> & SupporterSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, SupporterSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<TestimonialSchema, import("mongoose").Model<TestimonialSchema, any, any, any, any, any, TestimonialSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        text?: import("mongoose").SchemaDefinitionProperty<string, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        focus?: import("mongoose").SchemaDefinitionProperty<string | null, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        avatarUrl?: import("mongoose").SchemaDefinitionProperty<string | null, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isVerified?: import("mongoose").SchemaDefinitionProperty<boolean, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, TestimonialSchema, import("mongoose").Document<unknown, {}, TestimonialSchema, {}, import("mongoose").DefaultSchemaOptions> & TestimonialSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, TestimonialSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<MediaAssetSchema, import("mongoose").Model<MediaAssetSchema, any, any, any, any, any, MediaAssetSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        type?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assetUrl?: import("mongoose").SchemaDefinitionProperty<string, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        thumbnailUrl?: import("mongoose").SchemaDefinitionProperty<string | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        deletedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, MediaAssetSchema, import("mongoose").Document<unknown, {}, MediaAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & MediaAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, MediaAssetSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<ContactSubmissionSchema, import("mongoose").Model<ContactSubmissionSchema, any, any, any, any, any, ContactSubmissionSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        subject?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        message?: import("mongoose").SchemaDefinitionProperty<string, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        read?: import("mongoose").SchemaDefinitionProperty<boolean, ContactSubmissionSchema, import("mongoose").Document<unknown, {}, ContactSubmissionSchema, {}, import("mongoose").DefaultSchemaOptions> & ContactSubmissionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, ContactSubmissionSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<NewsletterSubscriberSchema, import("mongoose").Model<NewsletterSubscriberSchema, any, any, any, any, any, NewsletterSubscriberSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        subscribed?: import("mongoose").SchemaDefinitionProperty<boolean, NewsletterSubscriberSchema, import("mongoose").Document<unknown, {}, NewsletterSubscriberSchema, {}, import("mongoose").DefaultSchemaOptions> & NewsletterSubscriberSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, NewsletterSubscriberSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<CitizenFeedbackSchema, import("mongoose").Model<CitizenFeedbackSchema, any, any, any, any, any, CitizenFeedbackSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lga?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        message?: import("mongoose").SchemaDefinitionProperty<string, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        sentiment?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        topic?: import("mongoose").SchemaDefinitionProperty<string | null, CitizenFeedbackSchema, import("mongoose").Document<unknown, {}, CitizenFeedbackSchema, {}, import("mongoose").DefaultSchemaOptions> & CitizenFeedbackSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, CitizenFeedbackSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<IssueReportSchema, import("mongoose").Model<IssueReportSchema, any, any, any, any, any, IssueReportSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lga?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        ward?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string | null, IssueReportSchema, import("mongoose").Document<unknown, {}, IssueReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IssueReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, IssueReportSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<DonationSchema, import("mongoose").Model<DonationSchema, any, any, any, any, any, DonationSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        amount?: import("mongoose").SchemaDefinitionProperty<number, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        reference?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, DonationSchema, import("mongoose").Document<unknown, {}, DonationSchema, {}, import("mongoose").DefaultSchemaOptions> & DonationSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, DonationSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<CanvassingSessionSchema, import("mongoose").Model<CanvassingSessionSchema, any, any, any, any, any, CanvassingSessionSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        wardId?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        teamLead?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        teamSize?: import("mongoose").SchemaDefinitionProperty<number, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        scheduledDate?: import("mongoose").SchemaDefinitionProperty<Date | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        completedDate?: import("mongoose").SchemaDefinitionProperty<Date | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingSessionSchema, import("mongoose").Document<unknown, {}, CanvassingSessionSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingSessionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, CanvassingSessionSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<CanvassingVisitSchema, import("mongoose").Model<CanvassingVisitSchema, any, any, any, any, any, CanvassingVisitSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        sessionId?: import("mongoose").SchemaDefinitionProperty<string, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        address?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        supportLevel?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        issues?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        outcome?: import("mongoose").SchemaDefinitionProperty<string | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        contactedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, CanvassingVisitSchema, import("mongoose").Document<unknown, {}, CanvassingVisitSchema, {}, import("mongoose").DefaultSchemaOptions> & CanvassingVisitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, CanvassingVisitSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<VolunteerAssignmentSchema, import("mongoose").Model<VolunteerAssignmentSchema, any, any, any, any, any, VolunteerAssignmentSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        volunteerId?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        wardId?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        role?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assignedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, VolunteerAssignmentSchema, import("mongoose").Document<unknown, {}, VolunteerAssignmentSchema, {}, import("mongoose").DefaultSchemaOptions> & VolunteerAssignmentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, VolunteerAssignmentSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<CandidateTourSchema, import("mongoose").Model<CandidateTourSchema, any, any, any, any, any, CandidateTourSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        wardId?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        visitType?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        tourDate?: import("mongoose").SchemaDefinitionProperty<Date | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        expectedAttendees?: import("mongoose").SchemaDefinitionProperty<number, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        actualAttendees?: import("mongoose").SchemaDefinitionProperty<number, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        stakeholdersMet?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        commitments?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        complaints?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        volunteerSignups?: import("mongoose").SchemaDefinitionProperty<number, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        mediaCoverage?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, CandidateTourSchema, import("mongoose").Document<unknown, {}, CandidateTourSchema, {}, import("mongoose").DefaultSchemaOptions> & CandidateTourSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, CandidateTourSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<ContentAssetSchema, import("mongoose").Model<ContentAssetSchema, any, any, any, any, any, ContentAssetSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        type?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        targetAudience?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        messageKey?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assetUrl?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        language?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        tags?: import("mongoose").SchemaDefinitionProperty<string | null, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, ContentAssetSchema, import("mongoose").Document<unknown, {}, ContentAssetSchema, {}, import("mongoose").DefaultSchemaOptions> & ContentAssetSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, ContentAssetSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<ListeningMentionSchema, import("mongoose").Model<ListeningMentionSchema, any, any, any, any, any, ListeningMentionSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        platform?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        mentionUrl?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        title?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        content?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        sentiment?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        reach?: import("mongoose").SchemaDefinitionProperty<number, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        mentionedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        source?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        category?: import("mongoose").SchemaDefinitionProperty<string | null, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isUrgent?: import("mongoose").SchemaDefinitionProperty<boolean, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, ListeningMentionSchema, import("mongoose").Document<unknown, {}, ListeningMentionSchema, {}, import("mongoose").DefaultSchemaOptions> & ListeningMentionSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, ListeningMentionSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<RapidResponseSchema, import("mongoose").Model<RapidResponseSchema, any, any, any, any, any, RapidResponseSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        mentionId?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        responseType?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        content?: import("mongoose").SchemaDefinitionProperty<string, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        publishedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        publishedBy?: import("mongoose").SchemaDefinitionProperty<string | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        platform?: import("mongoose").SchemaDefinitionProperty<string | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        effectiveness?: import("mongoose").SchemaDefinitionProperty<string | null, RapidResponseSchema, import("mongoose").Document<unknown, {}, RapidResponseSchema, {}, import("mongoose").DefaultSchemaOptions> & RapidResponseSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, RapidResponseSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<LgaSchema, import("mongoose").Model<LgaSchema, any, any, any, any, any, LgaSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        code?: import("mongoose").SchemaDefinitionProperty<string, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        region?: import("mongoose").SchemaDefinitionProperty<string | null, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, LgaSchema, import("mongoose").Document<unknown, {}, LgaSchema, {}, import("mongoose").DefaultSchemaOptions> & LgaSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, LgaSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<WardSchema, import("mongoose").Model<WardSchema, any, any, any, any, any, WardSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        code?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        displayOrder?: import("mongoose").SchemaDefinitionProperty<number, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, WardSchema, import("mongoose").Document<unknown, {}, WardSchema, {}, import("mongoose").DefaultSchemaOptions> & WardSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, WardSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<PollingUnitSchema, import("mongoose").Model<PollingUnitSchema, any, any, any, any, any, PollingUnitSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        code?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        wardId?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        registeredVoters?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pastResultApm?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pastResultPdp?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pastResultApc?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pastResultOther?: import("mongoose").SchemaDefinitionProperty<number, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        latitude?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        longitude?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        riskLevel?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        conversionStatus?: import("mongoose").SchemaDefinitionProperty<string, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assignedAgentName?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assignedAgentPhone?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, PollingUnitSchema, import("mongoose").Document<unknown, {}, PollingUnitSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingUnitSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, PollingUnitSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<StakeholderSchema, import("mongoose").Model<StakeholderSchema, any, any, any, any, any, StakeholderSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        email?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        role?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        wardId?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        affiliation?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        influenceLevel?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        conversionStatus?: import("mongoose").SchemaDefinitionProperty<string, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, StakeholderSchema, import("mongoose").Document<unknown, {}, StakeholderSchema, {}, import("mongoose").DefaultSchemaOptions> & StakeholderSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, StakeholderSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<ConversionScoreSchema, import("mongoose").Model<ConversionScoreSchema, any, any, any, any, any, ConversionScoreSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        entityType?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        entityId?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        score?: import("mongoose").SchemaDefinitionProperty<number, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lastAssessedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assessedBy?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionScoreSchema, import("mongoose").Document<unknown, {}, ConversionScoreSchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionScoreSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, ConversionScoreSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<ConversionActivitySchema, import("mongoose").Model<ConversionActivitySchema, any, any, any, any, any, ConversionActivitySchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        stakeholderId?: import("mongoose").SchemaDefinitionProperty<string, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        type?: import("mongoose").SchemaDefinitionProperty<string, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        outcome?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        conductedBy?: import("mongoose").SchemaDefinitionProperty<string | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        conductedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        followUpDate?: import("mongoose").SchemaDefinitionProperty<Date | null, ConversionActivitySchema, import("mongoose").Document<unknown, {}, ConversionActivitySchema, {}, import("mongoose").DefaultSchemaOptions> & ConversionActivitySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, ConversionActivitySchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<WhatsAppGroupSchema, import("mongoose").Model<WhatsAppGroupSchema, any, any, any, any, any, WhatsAppGroupSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        level?: import("mongoose").SchemaDefinitionProperty<string, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        parentId?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        groupLink?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        adminName?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        adminPhone?: import("mongoose").SchemaDefinitionProperty<string | null, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        memberCount?: import("mongoose").SchemaDefinitionProperty<number, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, WhatsAppGroupSchema, import("mongoose").Document<unknown, {}, WhatsAppGroupSchema, {}, import("mongoose").DefaultSchemaOptions> & WhatsAppGroupSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, WhatsAppGroupSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<PollingAgentSchema, import("mongoose").Model<PollingAgentSchema, any, any, any, any, any, PollingAgentSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        name?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        phone?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        role?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        trainingStatus?: import("mongoose").SchemaDefinitionProperty<string, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        assignedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        isActive?: import("mongoose").SchemaDefinitionProperty<boolean, PollingAgentSchema, import("mongoose").Document<unknown, {}, PollingAgentSchema, {}, import("mongoose").DefaultSchemaOptions> & PollingAgentSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, PollingAgentSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<ResultEntrySchema, import("mongoose").Model<ResultEntrySchema, any, any, any, any, any, ResultEntrySchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        lgaId?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        wardId?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        apmVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pdpVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        apcVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        otherVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        totalVotes?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        registeredVoters?: import("mongoose").SchemaDefinitionProperty<number, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        photoUrl?: import("mongoose").SchemaDefinitionProperty<string | null, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        enteredBy?: import("mongoose").SchemaDefinitionProperty<string | null, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, ResultEntrySchema, import("mongoose").Document<unknown, {}, ResultEntrySchema, {}, import("mongoose").DefaultSchemaOptions> & ResultEntrySchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, ResultEntrySchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<IncidentReportSchema, import("mongoose").Model<IncidentReportSchema, any, any, any, any, any, IncidentReportSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        type?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        description?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        severity?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        reportedBy?: import("mongoose").SchemaDefinitionProperty<string | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        reportedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        status?: import("mongoose").SchemaDefinitionProperty<string, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        legalEscalation?: import("mongoose").SchemaDefinitionProperty<boolean, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        securityEscalation?: import("mongoose").SchemaDefinitionProperty<boolean, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, IncidentReportSchema, import("mongoose").Document<unknown, {}, IncidentReportSchema, {}, import("mongoose").DefaultSchemaOptions> & IncidentReportSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, IncidentReportSchema>;
} | {
    name: string;
    schema: import("mongoose").Schema<GotvRecordSchema, import("mongoose").Model<GotvRecordSchema, any, any, any, any, any, GotvRecordSchema>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {
        id?: import("mongoose").SchemaDefinitionProperty<string, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        pollingUnitId?: import("mongoose").SchemaDefinitionProperty<string, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        supporterName?: import("mongoose").SchemaDefinitionProperty<string, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        supporterPhone?: import("mongoose").SchemaDefinitionProperty<string | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        contacted?: import("mongoose").SchemaDefinitionProperty<boolean, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        turnedOut?: import("mongoose").SchemaDefinitionProperty<boolean, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        contactedVia?: import("mongoose").SchemaDefinitionProperty<string | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        contactedAt?: import("mongoose").SchemaDefinitionProperty<Date | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
        notes?: import("mongoose").SchemaDefinitionProperty<string | null, GotvRecordSchema, import("mongoose").Document<unknown, {}, GotvRecordSchema, {}, import("mongoose").DefaultSchemaOptions> & GotvRecordSchema & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        }> | undefined;
    }, GotvRecordSchema>;
})[];
