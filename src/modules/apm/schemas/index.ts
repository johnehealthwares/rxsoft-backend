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

export {
  CampaignInfoSchema, CampaignInfoSchemaFactory,
  AgendaItemSchema, AgendaItemSchemaFactory,
  AchievementSchema, AchievementSchemaFactory,
  NewsArticleSchema, NewsArticleSchemaFactory,
  EventSchema, EventSchemaFactory,
  EventRegistrationSchema, EventRegistrationSchemaFactory,
  VolunteerSchema, VolunteerSchemaFactory,
  SupporterSchema, SupporterSchemaFactory,
  TestimonialSchema, TestimonialSchemaFactory,
  MediaAssetSchema, MediaAssetSchemaFactory,
  ContactSubmissionSchema, ContactSubmissionSchemaFactory,
  NewsletterSubscriberSchema, NewsletterSubscriberSchemaFactory,
  CitizenFeedbackSchema, CitizenFeedbackSchemaFactory,
  IssueReportSchema, IssueReportSchemaFactory,
  DonationSchema, DonationSchemaFactory,
  CanvassingSessionSchema, CanvassingSessionSchemaFactory,
  CanvassingVisitSchema, CanvassingVisitSchemaFactory,
  VolunteerAssignmentSchema, VolunteerAssignmentSchemaFactory,
  CandidateTourSchema, CandidateTourSchemaFactory,
  ContentAssetSchema, ContentAssetSchemaFactory,
  ListeningMentionSchema, ListeningMentionSchemaFactory,
  RapidResponseSchema, RapidResponseSchemaFactory,
  LgaSchema, LgaSchemaFactory,
  WardSchema, WardSchemaFactory,
  PollingUnitSchema, PollingUnitSchemaFactory,
  StakeholderSchema, StakeholderSchemaFactory,
  ConversionScoreSchema, ConversionScoreSchemaFactory,
  ConversionActivitySchema, ConversionActivitySchemaFactory,
  WhatsAppGroupSchema, WhatsAppGroupSchemaFactory,
  PollingAgentSchema, PollingAgentSchemaFactory,
  ResultEntrySchema, ResultEntrySchemaFactory,
  IncidentReportSchema, IncidentReportSchemaFactory,
  GotvRecordSchema, GotvRecordSchemaFactory,
};

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

export const mongooseModelNames = [
  'CampaignInfoSchema', 'AgendaItemSchema', 'AchievementSchema', 'NewsArticleSchema',
  'EventSchema', 'EventRegistrationSchema', 'VolunteerSchema', 'SupporterSchema',
  'TestimonialSchema', 'MediaAssetSchema', 'ContactSubmissionSchema', 'NewsletterSubscriberSchema',
  'CitizenFeedbackSchema', 'IssueReportSchema', 'DonationSchema',
  'CanvassingSessionSchema', 'CanvassingVisitSchema', 'VolunteerAssignmentSchema',
  'CandidateTourSchema', 'ContentAssetSchema', 'ListeningMentionSchema', 'RapidResponseSchema',
  'LgaSchema', 'WardSchema', 'PollingUnitSchema', 'StakeholderSchema',
  'ConversionScoreSchema', 'ConversionActivitySchema', 'WhatsAppGroupSchema',
  'PollingAgentSchema', 'ResultEntrySchema', 'IncidentReportSchema', 'GotvRecordSchema',
];

export const mongooseFeatureModels = [
  { name: 'CampaignInfo', schema: CampaignInfoSchemaFactory },
  { name: 'AgendaItem', schema: AgendaItemSchemaFactory },
  { name: 'Achievement', schema: AchievementSchemaFactory },
  { name: 'NewsArticle', schema: NewsArticleSchemaFactory },
  { name: 'Event', schema: EventSchemaFactory },
  { name: 'EventRegistration', schema: EventRegistrationSchemaFactory },
  { name: 'Volunteer', schema: VolunteerSchemaFactory },
  { name: 'Supporter', schema: SupporterSchemaFactory },
  { name: 'Testimonial', schema: TestimonialSchemaFactory },
  { name: 'MediaAsset', schema: MediaAssetSchemaFactory },
  { name: 'ContactSubmission', schema: ContactSubmissionSchemaFactory },
  { name: 'NewsletterSubscriber', schema: NewsletterSubscriberSchemaFactory },
  { name: 'CitizenFeedback', schema: CitizenFeedbackSchemaFactory },
  { name: 'IssueReport', schema: IssueReportSchemaFactory },
  { name: 'Donation', schema: DonationSchemaFactory },
  { name: 'CanvassingSession', schema: CanvassingSessionSchemaFactory },
  { name: 'CanvassingVisit', schema: CanvassingVisitSchemaFactory },
  { name: 'VolunteerAssignment', schema: VolunteerAssignmentSchemaFactory },
  { name: 'CandidateTour', schema: CandidateTourSchemaFactory },
  { name: 'ContentAsset', schema: ContentAssetSchemaFactory },
  { name: 'ListeningMention', schema: ListeningMentionSchemaFactory },
  { name: 'RapidResponse', schema: RapidResponseSchemaFactory },
  { name: 'Lga', schema: LgaSchemaFactory },
  { name: 'Ward', schema: WardSchemaFactory },
  { name: 'PollingUnit', schema: PollingUnitSchemaFactory },
  { name: 'Stakeholder', schema: StakeholderSchemaFactory },
  { name: 'ConversionScore', schema: ConversionScoreSchemaFactory },
  { name: 'ConversionActivity', schema: ConversionActivitySchemaFactory },
  { name: 'WhatsAppGroup', schema: WhatsAppGroupSchemaFactory },
  { name: 'PollingAgent', schema: PollingAgentSchemaFactory },
  { name: 'ResultEntry', schema: ResultEntrySchemaFactory },
  { name: 'IncidentReport', schema: IncidentReportSchemaFactory },
  { name: 'GotvRecord', schema: GotvRecordSchemaFactory },
];
