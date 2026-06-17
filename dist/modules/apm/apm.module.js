"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ApmModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApmModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const mongoose_1 = require("@nestjs/mongoose");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const entities_1 = require("./entities");
const apm_controller_1 = require("./controllers/apm.controller");
const apm_admin_controller_1 = require("./controllers/apm-admin.controller");
const apm_conversion_controller_1 = require("./controllers/apm-conversion.controller");
const apm_data_controller_1 = require("./controllers/apm-data.controller");
const apm_canvassing_controller_1 = require("./controllers/apm-canvassing.controller");
const apm_intelligence_controller_1 = require("./controllers/apm-intelligence.controller");
const apm_election_controller_1 = require("./controllers/apm-election.controller");
const apm_service_1 = require("./services/apm.service");
const apm_conversion_service_1 = require("./services/apm-conversion.service");
const apm_canvassing_service_1 = require("./services/apm-canvassing.service");
const apm_intelligence_service_1 = require("./services/apm-intelligence.service");
const apm_election_service_1 = require("./services/apm-election.service");
const apm_seed_1 = require("./seed/apm.seed");
const mongo_1 = require("./services/mongo");
const apm_mongo_seed_1 = require("./seed/apm-mongo.seed");
const schemas_1 = require("./schemas");
const controllers = [
    apm_controller_1.ApmController, apm_admin_controller_1.ApmAdminController,
    apm_conversion_controller_1.ApmConversionController, apm_conversion_controller_1.ApmStakeholderController, apm_conversion_controller_1.ApmWhatsAppController,
    apm_data_controller_1.ApmDataController,
    apm_canvassing_controller_1.ApmCanvassingController, apm_canvassing_controller_1.ApmVolunteerAssignmentController, apm_canvassing_controller_1.ApmSentimentController,
    apm_intelligence_controller_1.ApmTourController, apm_intelligence_controller_1.ApmContentController, apm_intelligence_controller_1.ApmListeningController, apm_intelligence_controller_1.ApmTruthDeskController,
    apm_election_controller_1.ApmAgentController, apm_election_controller_1.ApmResultController, apm_election_controller_1.ApmIncidentController, apm_election_controller_1.ApmGotvController,
];
let ApmModule = ApmModule_1 = class ApmModule {
    static forRoot() {
        const useMongoDb = process.env.USE_MONGODB === 'true';
        if (useMongoDb) {
            return {
                module: ApmModule_1,
                imports: [
                    jwt_1.JwtModule.register({}),
                    mongoose_1.MongooseModule.forFeature(schemas_1.mongooseFeatureModels),
                ],
                controllers,
                providers: [
                    mongo_1.ApmMongoService,
                    mongo_1.ApmConversionMongoService,
                    mongo_1.ApmCanvassingMongoService,
                    mongo_1.ApmIntelligenceMongoService,
                    mongo_1.ApmElectionMongoService,
                    apm_mongo_seed_1.ApmMongoSeedService,
                    { provide: apm_service_1.ApmService, useExisting: mongo_1.ApmMongoService },
                    { provide: apm_conversion_service_1.ApmConversionService, useExisting: mongo_1.ApmConversionMongoService },
                    { provide: apm_canvassing_service_1.ApmCanvassingService, useExisting: mongo_1.ApmCanvassingMongoService },
                    { provide: apm_intelligence_service_1.ApmIntelligenceService, useExisting: mongo_1.ApmIntelligenceMongoService },
                    { provide: apm_election_service_1.ApmElectionService, useExisting: mongo_1.ApmElectionMongoService },
                    jwt_auth_guard_1.JwtAuthGuard,
                    roles_guard_1.RolesGuard,
                ],
                exports: [
                    apm_service_1.ApmService, apm_conversion_service_1.ApmConversionService, apm_canvassing_service_1.ApmCanvassingService,
                ],
            };
        }
        return {
            module: ApmModule_1,
            imports: [
                jwt_1.JwtModule.register({}),
                typeorm_1.TypeOrmModule.forFeature([
                    entities_1.CampaignInfoOrmEntity, entities_1.AgendaItemOrmEntity, entities_1.AchievementOrmEntity,
                    entities_1.NewsArticleOrmEntity, entities_1.EventOrmEntity, entities_1.EventRegistrationOrmEntity,
                    entities_1.VolunteerOrmEntity, entities_1.SupporterOrmEntity, entities_1.TestimonialOrmEntity,
                    entities_1.MediaAssetOrmEntity, entities_1.ContactSubmissionOrmEntity, entities_1.NewsletterSubscriberOrmEntity,
                    entities_1.CitizenFeedbackOrmEntity, entities_1.IssueReportOrmEntity, entities_1.DonationOrmEntity,
                    entities_1.LgaOrmEntity, entities_1.WardOrmEntity, entities_1.PollingUnitOrmEntity, entities_1.StakeholderOrmEntity,
                    entities_1.ConversionScoreOrmEntity, entities_1.ConversionActivityOrmEntity, entities_1.WhatsAppGroupOrmEntity,
                    entities_1.CanvassingSessionOrmEntity, entities_1.CanvassingVisitOrmEntity, entities_1.VolunteerAssignmentOrmEntity,
                    entities_1.CandidateTourOrmEntity, entities_1.ContentAssetOrmEntity, entities_1.ListeningMentionOrmEntity,
                    entities_1.RapidResponseOrmEntity, entities_1.PollingAgentOrmEntity, entities_1.ResultEntryOrmEntity,
                    entities_1.IncidentReportOrmEntity, entities_1.GotvRecordOrmEntity,
                ]),
            ],
            controllers,
            providers: [
                apm_service_1.ApmService, apm_conversion_service_1.ApmConversionService, apm_canvassing_service_1.ApmCanvassingService,
                apm_intelligence_service_1.ApmIntelligenceService, apm_election_service_1.ApmElectionService,
                apm_seed_1.ApmSeedService,
                jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard,
            ],
            exports: [
                apm_service_1.ApmService, apm_conversion_service_1.ApmConversionService, apm_canvassing_service_1.ApmCanvassingService,
            ],
        };
    }
};
exports.ApmModule = ApmModule;
exports.ApmModule = ApmModule = ApmModule_1 = __decorate([
    (0, common_1.Module)({})
], ApmModule);
//# sourceMappingURL=apm.module.js.map