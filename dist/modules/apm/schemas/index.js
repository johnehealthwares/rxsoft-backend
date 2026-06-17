"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollingUnitSchemaFactory = exports.PollingUnitSchema = exports.WardSchemaFactory = exports.WardSchema = exports.LgaSchemaFactory = exports.LgaSchema = exports.RapidResponseSchemaFactory = exports.RapidResponseSchema = exports.ListeningMentionSchemaFactory = exports.ListeningMentionSchema = exports.ContentAssetSchemaFactory = exports.ContentAssetSchema = exports.CandidateTourSchemaFactory = exports.CandidateTourSchema = exports.VolunteerAssignmentSchemaFactory = exports.VolunteerAssignmentSchema = exports.CanvassingVisitSchemaFactory = exports.CanvassingVisitSchema = exports.CanvassingSessionSchemaFactory = exports.CanvassingSessionSchema = exports.DonationSchemaFactory = exports.DonationSchema = exports.IssueReportSchemaFactory = exports.IssueReportSchema = exports.CitizenFeedbackSchemaFactory = exports.CitizenFeedbackSchema = exports.NewsletterSubscriberSchemaFactory = exports.NewsletterSubscriberSchema = exports.ContactSubmissionSchemaFactory = exports.ContactSubmissionSchema = exports.MediaAssetSchemaFactory = exports.MediaAssetSchema = exports.TestimonialSchemaFactory = exports.TestimonialSchema = exports.SupporterSchemaFactory = exports.SupporterSchema = exports.VolunteerSchemaFactory = exports.VolunteerSchema = exports.EventRegistrationSchemaFactory = exports.EventRegistrationSchema = exports.EventSchemaFactory = exports.EventSchema = exports.NewsArticleSchemaFactory = exports.NewsArticleSchema = exports.AchievementSchemaFactory = exports.AchievementSchema = exports.AgendaItemSchemaFactory = exports.AgendaItemSchema = exports.CampaignInfoSchemaFactory = exports.CampaignInfoSchema = void 0;
exports.mongooseFeatureModels = exports.mongooseModelNames = exports.GotvRecordSchemaFactory = exports.GotvRecordSchema = exports.IncidentReportSchemaFactory = exports.IncidentReportSchema = exports.ResultEntrySchemaFactory = exports.ResultEntrySchema = exports.PollingAgentSchemaFactory = exports.PollingAgentSchema = exports.WhatsAppGroupSchemaFactory = exports.WhatsAppGroupSchema = exports.ConversionActivitySchemaFactory = exports.ConversionActivitySchema = exports.ConversionScoreSchemaFactory = exports.ConversionScoreSchema = exports.StakeholderSchemaFactory = exports.StakeholderSchema = void 0;
const campaign_info_schema_1 = require("./campaign-info.schema");
Object.defineProperty(exports, "CampaignInfoSchema", { enumerable: true, get: function () { return campaign_info_schema_1.CampaignInfoSchema; } });
Object.defineProperty(exports, "CampaignInfoSchemaFactory", { enumerable: true, get: function () { return campaign_info_schema_1.CampaignInfoSchemaFactory; } });
const agenda_item_schema_1 = require("./agenda-item.schema");
Object.defineProperty(exports, "AgendaItemSchema", { enumerable: true, get: function () { return agenda_item_schema_1.AgendaItemSchema; } });
Object.defineProperty(exports, "AgendaItemSchemaFactory", { enumerable: true, get: function () { return agenda_item_schema_1.AgendaItemSchemaFactory; } });
const achievement_schema_1 = require("./achievement.schema");
Object.defineProperty(exports, "AchievementSchema", { enumerable: true, get: function () { return achievement_schema_1.AchievementSchema; } });
Object.defineProperty(exports, "AchievementSchemaFactory", { enumerable: true, get: function () { return achievement_schema_1.AchievementSchemaFactory; } });
const news_article_schema_1 = require("./news-article.schema");
Object.defineProperty(exports, "NewsArticleSchema", { enumerable: true, get: function () { return news_article_schema_1.NewsArticleSchema; } });
Object.defineProperty(exports, "NewsArticleSchemaFactory", { enumerable: true, get: function () { return news_article_schema_1.NewsArticleSchemaFactory; } });
const event_schema_1 = require("./event.schema");
Object.defineProperty(exports, "EventSchema", { enumerable: true, get: function () { return event_schema_1.EventSchema; } });
Object.defineProperty(exports, "EventSchemaFactory", { enumerable: true, get: function () { return event_schema_1.EventSchemaFactory; } });
const event_registration_schema_1 = require("./event-registration.schema");
Object.defineProperty(exports, "EventRegistrationSchema", { enumerable: true, get: function () { return event_registration_schema_1.EventRegistrationSchema; } });
Object.defineProperty(exports, "EventRegistrationSchemaFactory", { enumerable: true, get: function () { return event_registration_schema_1.EventRegistrationSchemaFactory; } });
const volunteer_schema_1 = require("./volunteer.schema");
Object.defineProperty(exports, "VolunteerSchema", { enumerable: true, get: function () { return volunteer_schema_1.VolunteerSchema; } });
Object.defineProperty(exports, "VolunteerSchemaFactory", { enumerable: true, get: function () { return volunteer_schema_1.VolunteerSchemaFactory; } });
const supporter_schema_1 = require("./supporter.schema");
Object.defineProperty(exports, "SupporterSchema", { enumerable: true, get: function () { return supporter_schema_1.SupporterSchema; } });
Object.defineProperty(exports, "SupporterSchemaFactory", { enumerable: true, get: function () { return supporter_schema_1.SupporterSchemaFactory; } });
const testimonial_schema_1 = require("./testimonial.schema");
Object.defineProperty(exports, "TestimonialSchema", { enumerable: true, get: function () { return testimonial_schema_1.TestimonialSchema; } });
Object.defineProperty(exports, "TestimonialSchemaFactory", { enumerable: true, get: function () { return testimonial_schema_1.TestimonialSchemaFactory; } });
const media_asset_schema_1 = require("./media-asset.schema");
Object.defineProperty(exports, "MediaAssetSchema", { enumerable: true, get: function () { return media_asset_schema_1.MediaAssetSchema; } });
Object.defineProperty(exports, "MediaAssetSchemaFactory", { enumerable: true, get: function () { return media_asset_schema_1.MediaAssetSchemaFactory; } });
const contact_submission_schema_1 = require("./contact-submission.schema");
Object.defineProperty(exports, "ContactSubmissionSchema", { enumerable: true, get: function () { return contact_submission_schema_1.ContactSubmissionSchema; } });
Object.defineProperty(exports, "ContactSubmissionSchemaFactory", { enumerable: true, get: function () { return contact_submission_schema_1.ContactSubmissionSchemaFactory; } });
const newsletter_subscriber_schema_1 = require("./newsletter-subscriber.schema");
Object.defineProperty(exports, "NewsletterSubscriberSchema", { enumerable: true, get: function () { return newsletter_subscriber_schema_1.NewsletterSubscriberSchema; } });
Object.defineProperty(exports, "NewsletterSubscriberSchemaFactory", { enumerable: true, get: function () { return newsletter_subscriber_schema_1.NewsletterSubscriberSchemaFactory; } });
const citizen_feedback_schema_1 = require("./citizen-feedback.schema");
Object.defineProperty(exports, "CitizenFeedbackSchema", { enumerable: true, get: function () { return citizen_feedback_schema_1.CitizenFeedbackSchema; } });
Object.defineProperty(exports, "CitizenFeedbackSchemaFactory", { enumerable: true, get: function () { return citizen_feedback_schema_1.CitizenFeedbackSchemaFactory; } });
const issue_report_schema_1 = require("./issue-report.schema");
Object.defineProperty(exports, "IssueReportSchema", { enumerable: true, get: function () { return issue_report_schema_1.IssueReportSchema; } });
Object.defineProperty(exports, "IssueReportSchemaFactory", { enumerable: true, get: function () { return issue_report_schema_1.IssueReportSchemaFactory; } });
const donation_schema_1 = require("./donation.schema");
Object.defineProperty(exports, "DonationSchema", { enumerable: true, get: function () { return donation_schema_1.DonationSchema; } });
Object.defineProperty(exports, "DonationSchemaFactory", { enumerable: true, get: function () { return donation_schema_1.DonationSchemaFactory; } });
const canvassing_session_schema_1 = require("./canvassing-session.schema");
Object.defineProperty(exports, "CanvassingSessionSchema", { enumerable: true, get: function () { return canvassing_session_schema_1.CanvassingSessionSchema; } });
Object.defineProperty(exports, "CanvassingSessionSchemaFactory", { enumerable: true, get: function () { return canvassing_session_schema_1.CanvassingSessionSchemaFactory; } });
const canvassing_visit_schema_1 = require("./canvassing-visit.schema");
Object.defineProperty(exports, "CanvassingVisitSchema", { enumerable: true, get: function () { return canvassing_visit_schema_1.CanvassingVisitSchema; } });
Object.defineProperty(exports, "CanvassingVisitSchemaFactory", { enumerable: true, get: function () { return canvassing_visit_schema_1.CanvassingVisitSchemaFactory; } });
const volunteer_assignment_schema_1 = require("./volunteer-assignment.schema");
Object.defineProperty(exports, "VolunteerAssignmentSchema", { enumerable: true, get: function () { return volunteer_assignment_schema_1.VolunteerAssignmentSchema; } });
Object.defineProperty(exports, "VolunteerAssignmentSchemaFactory", { enumerable: true, get: function () { return volunteer_assignment_schema_1.VolunteerAssignmentSchemaFactory; } });
const candidate_tour_schema_1 = require("./candidate-tour.schema");
Object.defineProperty(exports, "CandidateTourSchema", { enumerable: true, get: function () { return candidate_tour_schema_1.CandidateTourSchema; } });
Object.defineProperty(exports, "CandidateTourSchemaFactory", { enumerable: true, get: function () { return candidate_tour_schema_1.CandidateTourSchemaFactory; } });
const content_asset_schema_1 = require("./content-asset.schema");
Object.defineProperty(exports, "ContentAssetSchema", { enumerable: true, get: function () { return content_asset_schema_1.ContentAssetSchema; } });
Object.defineProperty(exports, "ContentAssetSchemaFactory", { enumerable: true, get: function () { return content_asset_schema_1.ContentAssetSchemaFactory; } });
const listening_mention_schema_1 = require("./listening-mention.schema");
Object.defineProperty(exports, "ListeningMentionSchema", { enumerable: true, get: function () { return listening_mention_schema_1.ListeningMentionSchema; } });
Object.defineProperty(exports, "ListeningMentionSchemaFactory", { enumerable: true, get: function () { return listening_mention_schema_1.ListeningMentionSchemaFactory; } });
const rapid_response_schema_1 = require("./rapid-response.schema");
Object.defineProperty(exports, "RapidResponseSchema", { enumerable: true, get: function () { return rapid_response_schema_1.RapidResponseSchema; } });
Object.defineProperty(exports, "RapidResponseSchemaFactory", { enumerable: true, get: function () { return rapid_response_schema_1.RapidResponseSchemaFactory; } });
const lga_schema_1 = require("./lga.schema");
Object.defineProperty(exports, "LgaSchema", { enumerable: true, get: function () { return lga_schema_1.LgaSchema; } });
Object.defineProperty(exports, "LgaSchemaFactory", { enumerable: true, get: function () { return lga_schema_1.LgaSchemaFactory; } });
const ward_schema_1 = require("./ward.schema");
Object.defineProperty(exports, "WardSchema", { enumerable: true, get: function () { return ward_schema_1.WardSchema; } });
Object.defineProperty(exports, "WardSchemaFactory", { enumerable: true, get: function () { return ward_schema_1.WardSchemaFactory; } });
const polling_unit_schema_1 = require("./polling-unit.schema");
Object.defineProperty(exports, "PollingUnitSchema", { enumerable: true, get: function () { return polling_unit_schema_1.PollingUnitSchema; } });
Object.defineProperty(exports, "PollingUnitSchemaFactory", { enumerable: true, get: function () { return polling_unit_schema_1.PollingUnitSchemaFactory; } });
const stakeholder_schema_1 = require("./stakeholder.schema");
Object.defineProperty(exports, "StakeholderSchema", { enumerable: true, get: function () { return stakeholder_schema_1.StakeholderSchema; } });
Object.defineProperty(exports, "StakeholderSchemaFactory", { enumerable: true, get: function () { return stakeholder_schema_1.StakeholderSchemaFactory; } });
const conversion_score_schema_1 = require("./conversion-score.schema");
Object.defineProperty(exports, "ConversionScoreSchema", { enumerable: true, get: function () { return conversion_score_schema_1.ConversionScoreSchema; } });
Object.defineProperty(exports, "ConversionScoreSchemaFactory", { enumerable: true, get: function () { return conversion_score_schema_1.ConversionScoreSchemaFactory; } });
const conversion_activity_schema_1 = require("./conversion-activity.schema");
Object.defineProperty(exports, "ConversionActivitySchema", { enumerable: true, get: function () { return conversion_activity_schema_1.ConversionActivitySchema; } });
Object.defineProperty(exports, "ConversionActivitySchemaFactory", { enumerable: true, get: function () { return conversion_activity_schema_1.ConversionActivitySchemaFactory; } });
const whatsapp_group_schema_1 = require("./whatsapp-group.schema");
Object.defineProperty(exports, "WhatsAppGroupSchema", { enumerable: true, get: function () { return whatsapp_group_schema_1.WhatsAppGroupSchema; } });
Object.defineProperty(exports, "WhatsAppGroupSchemaFactory", { enumerable: true, get: function () { return whatsapp_group_schema_1.WhatsAppGroupSchemaFactory; } });
const polling_agent_schema_1 = require("./polling-agent.schema");
Object.defineProperty(exports, "PollingAgentSchema", { enumerable: true, get: function () { return polling_agent_schema_1.PollingAgentSchema; } });
Object.defineProperty(exports, "PollingAgentSchemaFactory", { enumerable: true, get: function () { return polling_agent_schema_1.PollingAgentSchemaFactory; } });
const result_entry_schema_1 = require("./result-entry.schema");
Object.defineProperty(exports, "ResultEntrySchema", { enumerable: true, get: function () { return result_entry_schema_1.ResultEntrySchema; } });
Object.defineProperty(exports, "ResultEntrySchemaFactory", { enumerable: true, get: function () { return result_entry_schema_1.ResultEntrySchemaFactory; } });
const incident_report_schema_1 = require("./incident-report.schema");
Object.defineProperty(exports, "IncidentReportSchema", { enumerable: true, get: function () { return incident_report_schema_1.IncidentReportSchema; } });
Object.defineProperty(exports, "IncidentReportSchemaFactory", { enumerable: true, get: function () { return incident_report_schema_1.IncidentReportSchemaFactory; } });
const gotv_record_schema_1 = require("./gotv-record.schema");
Object.defineProperty(exports, "GotvRecordSchema", { enumerable: true, get: function () { return gotv_record_schema_1.GotvRecordSchema; } });
Object.defineProperty(exports, "GotvRecordSchemaFactory", { enumerable: true, get: function () { return gotv_record_schema_1.GotvRecordSchemaFactory; } });
exports.mongooseModelNames = [
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
exports.mongooseFeatureModels = [
    { name: 'CampaignInfo', schema: campaign_info_schema_1.CampaignInfoSchemaFactory },
    { name: 'AgendaItem', schema: agenda_item_schema_1.AgendaItemSchemaFactory },
    { name: 'Achievement', schema: achievement_schema_1.AchievementSchemaFactory },
    { name: 'NewsArticle', schema: news_article_schema_1.NewsArticleSchemaFactory },
    { name: 'Event', schema: event_schema_1.EventSchemaFactory },
    { name: 'EventRegistration', schema: event_registration_schema_1.EventRegistrationSchemaFactory },
    { name: 'Volunteer', schema: volunteer_schema_1.VolunteerSchemaFactory },
    { name: 'Supporter', schema: supporter_schema_1.SupporterSchemaFactory },
    { name: 'Testimonial', schema: testimonial_schema_1.TestimonialSchemaFactory },
    { name: 'MediaAsset', schema: media_asset_schema_1.MediaAssetSchemaFactory },
    { name: 'ContactSubmission', schema: contact_submission_schema_1.ContactSubmissionSchemaFactory },
    { name: 'NewsletterSubscriber', schema: newsletter_subscriber_schema_1.NewsletterSubscriberSchemaFactory },
    { name: 'CitizenFeedback', schema: citizen_feedback_schema_1.CitizenFeedbackSchemaFactory },
    { name: 'IssueReport', schema: issue_report_schema_1.IssueReportSchemaFactory },
    { name: 'Donation', schema: donation_schema_1.DonationSchemaFactory },
    { name: 'CanvassingSession', schema: canvassing_session_schema_1.CanvassingSessionSchemaFactory },
    { name: 'CanvassingVisit', schema: canvassing_visit_schema_1.CanvassingVisitSchemaFactory },
    { name: 'VolunteerAssignment', schema: volunteer_assignment_schema_1.VolunteerAssignmentSchemaFactory },
    { name: 'CandidateTour', schema: candidate_tour_schema_1.CandidateTourSchemaFactory },
    { name: 'ContentAsset', schema: content_asset_schema_1.ContentAssetSchemaFactory },
    { name: 'ListeningMention', schema: listening_mention_schema_1.ListeningMentionSchemaFactory },
    { name: 'RapidResponse', schema: rapid_response_schema_1.RapidResponseSchemaFactory },
    { name: 'Lga', schema: lga_schema_1.LgaSchemaFactory },
    { name: 'Ward', schema: ward_schema_1.WardSchemaFactory },
    { name: 'PollingUnit', schema: polling_unit_schema_1.PollingUnitSchemaFactory },
    { name: 'Stakeholder', schema: stakeholder_schema_1.StakeholderSchemaFactory },
    { name: 'ConversionScore', schema: conversion_score_schema_1.ConversionScoreSchemaFactory },
    { name: 'ConversionActivity', schema: conversion_activity_schema_1.ConversionActivitySchemaFactory },
    { name: 'WhatsAppGroup', schema: whatsapp_group_schema_1.WhatsAppGroupSchemaFactory },
    { name: 'PollingAgent', schema: polling_agent_schema_1.PollingAgentSchemaFactory },
    { name: 'ResultEntry', schema: result_entry_schema_1.ResultEntrySchemaFactory },
    { name: 'IncidentReport', schema: incident_report_schema_1.IncidentReportSchemaFactory },
    { name: 'GotvRecord', schema: gotv_record_schema_1.GotvRecordSchemaFactory },
];
//# sourceMappingURL=index.js.map