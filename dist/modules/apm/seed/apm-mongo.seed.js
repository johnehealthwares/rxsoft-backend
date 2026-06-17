"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ApmMongoSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApmMongoSeedService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ApmMongoSeedService = ApmMongoSeedService_1 = class ApmMongoSeedService {
    campaignInfoModel;
    agendaModel;
    achievementModel;
    newsModel;
    eventModel;
    testimonialModel;
    mediaModel;
    lgaModel;
    wardModel;
    puModel;
    stakeholderModel;
    scoreModel;
    waGroupModel;
    agentModel;
    resultModel;
    incidentModel;
    gotvModel;
    logger = new common_1.Logger(ApmMongoSeedService_1.name);
    constructor(campaignInfoModel, agendaModel, achievementModel, newsModel, eventModel, testimonialModel, mediaModel, lgaModel, wardModel, puModel, stakeholderModel, scoreModel, waGroupModel, agentModel, resultModel, incidentModel, gotvModel) {
        this.campaignInfoModel = campaignInfoModel;
        this.agendaModel = agendaModel;
        this.achievementModel = achievementModel;
        this.newsModel = newsModel;
        this.eventModel = eventModel;
        this.testimonialModel = testimonialModel;
        this.mediaModel = mediaModel;
        this.lgaModel = lgaModel;
        this.wardModel = wardModel;
        this.puModel = puModel;
        this.stakeholderModel = stakeholderModel;
        this.scoreModel = scoreModel;
        this.waGroupModel = waGroupModel;
        this.agentModel = agentModel;
        this.resultModel = resultModel;
        this.incidentModel = incidentModel;
        this.gotvModel = gotvModel;
    }
    async onModuleInit() {
        await this.seed();
    }
    async seed() {
        const lgaCount = await this.lgaModel.countDocuments().exec();
        if (lgaCount > 0) {
            this.logger.log('APM data already seeded in MongoDB, skipping');
            return;
        }
        this.logger.log('Seeding APM campaign data into MongoDB...');
        await this.seedLgas();
        await this.seedWards();
        await this.seedPollingUnits();
        await this.seedStakeholders();
        await this.seedConversionScores();
        await this.seedWhatsAppGroups();
        await this.seedCampaignInfo();
        await this.seedAchievements();
        await this.seedAgenda();
        await this.seedNews();
        await this.seedEvents();
        await this.seedTestimonials();
        await this.seedMedia();
        await this.seedAgents();
        await this.seedResults();
        await this.seedIncidents();
        await this.seedGotv();
        this.logger.log('APM campaign data seeded into MongoDB successfully!');
    }
    async seedLgas() {
        const lgas = [
            { name: 'Afijio', code: 'AFI', region: 'Oyo', displayOrder: 0 },
            { name: 'Akinyele', code: 'AKI', region: 'Oyo', displayOrder: 1 },
            { name: 'Atiba', code: 'ATI', region: 'Oyo', displayOrder: 2 },
            { name: 'Atisbo', code: 'ATS', region: 'Oyo', displayOrder: 3 },
            { name: 'Egbeda', code: 'EGB', region: 'Oyo', displayOrder: 4 },
            { name: 'Ibadan North', code: 'IBN', region: 'Ibadan', displayOrder: 5 },
            { name: 'Ibadan North-East', code: 'INE', region: 'Ibadan', displayOrder: 6 },
            { name: 'Ibadan North-West', code: 'INW', region: 'Ibadan', displayOrder: 7 },
            { name: 'Ibadan South-East', code: 'ISE', region: 'Ibadan', displayOrder: 8 },
            { name: 'Ibadan South-West', code: 'ISW', region: 'Ibadan', displayOrder: 9 },
            { name: 'Ibarapa Central', code: 'IPC', region: 'Ibarapa', displayOrder: 10 },
            { name: 'Ibarapa East', code: 'IPE', region: 'Ibarapa', displayOrder: 11 },
            { name: 'Ibarapa North', code: 'IPN', region: 'Ibarapa', displayOrder: 12 },
            { name: 'Ido', code: 'IDO', region: 'Oyo', displayOrder: 13 },
            { name: 'Irepo', code: 'IRE', region: 'Oyo', displayOrder: 14 },
            { name: 'Iseyin', code: 'ISY', region: 'Oyo', displayOrder: 15 },
            { name: 'Itesiwaju', code: 'ITW', region: 'Oyo', displayOrder: 16 },
            { name: 'Iwajowa', code: 'IWA', region: 'Oyo', displayOrder: 17 },
            { name: 'Kajola', code: 'KAJ', region: 'Oyo', displayOrder: 18 },
            { name: 'Lagelu', code: 'LAG', region: 'Oyo', displayOrder: 19 },
            { name: 'Ogbomoso North', code: 'OGN', region: 'Ogbomoso', displayOrder: 20 },
            { name: 'Ogbomoso South', code: 'OGS', region: 'Ogbomoso', displayOrder: 21 },
            { name: 'Ogo Oluwa', code: 'OGO', region: 'Oyo', displayOrder: 22 },
            { name: 'Olorunsogo', code: 'OLO', region: 'Oyo', displayOrder: 23 },
            { name: 'Oluyole', code: 'OLU', region: 'Ibadan', displayOrder: 24 },
            { name: 'Ona Ara', code: 'ONA', region: 'Ibadan', displayOrder: 25 },
            { name: 'Orelope', code: 'ORE', region: 'Oyo', displayOrder: 26 },
            { name: 'Ori Ire', code: 'ORI', region: 'Oyo', displayOrder: 27 },
            { name: 'Oyo East', code: 'OYE', region: 'Oyo', displayOrder: 28 },
            { name: 'Oyo West', code: 'OYW', region: 'Oyo', displayOrder: 29 },
            { name: 'Saki East', code: 'SAE', region: 'Oyo', displayOrder: 30 },
            { name: 'Saki West', code: 'SAW', region: 'Oyo', displayOrder: 31 },
            { name: 'Surulere', code: 'SUR', region: 'Oyo', displayOrder: 32 },
        ];
        await this.lgaModel.insertMany(lgas.map((l) => ({ ...l, isActive: true })));
        this.logger.log(`Seeded ${lgas.length} LGAs into MongoDB`);
    }
    async seedWards() {
        const lgas = await this.lgaModel.find().sort({ displayOrder: 1 }).exec();
        const wards = [];
        let wardDisplayOrder = 0;
        for (const lga of lgas) {
            for (let i = 1; i <= 11; i++) {
                wards.push({
                    name: `Ward ${i}`, code: `${lga.code}W${String(i).padStart(2, '0')}`,
                    lgaId: lga._id.toString(), displayOrder: wardDisplayOrder++, isActive: true,
                });
            }
        }
        await this.wardModel.insertMany(wards);
        this.logger.log(`Seeded ${wards.length} wards into MongoDB`);
    }
    async seedPollingUnits() {
        const wards = await this.wardModel.find().exec();
        const pus = [];
        for (const ward of wards.slice(0, 33)) {
            for (let i = 1; i <= 5; i++) {
                pus.push({
                    code: `${ward.code}PU${String(i).padStart(3, '0')}`,
                    name: `${ward.name} Polling Unit ${i}`,
                    wardId: ward._id.toString(), lgaId: ward.lgaId,
                    registeredVoters: Math.floor(Math.random() * 500) + 200,
                    pastResultApm: Math.floor(Math.random() * 100),
                    pastResultPdp: Math.floor(Math.random() * 200) + 50,
                    pastResultApc: Math.floor(Math.random() * 80),
                    pastResultOther: Math.floor(Math.random() * 30),
                    riskLevel: ['green', 'yellow', 'red', 'grey'][Math.floor(Math.random() * 4)],
                    conversionStatus: ['untouched', 'engaged', 'won', 'lost'][Math.floor(Math.random() * 4)],
                    isActive: true,
                });
            }
        }
        await this.puModel.insertMany(pus);
        this.logger.log(`Seeded ${pus.length} polling units into MongoDB`);
    }
    async seedStakeholders() {
        const lgas = await this.lgaModel.find().limit(6).exec();
        const roles = ['chairman', 'councillor', 'party-leader', 'youth-leader', 'women-leader', 'religious-leader', 'community-leader'];
        const affiliations = ['PDP', 'APC', 'APM', 'LP', 'Other'];
        const statuses = ['untouched', 'engaged', 'leaning', 'won', 'lost', 'hostile'];
        const stakeholders = [];
        for (const lga of lgas) {
            for (let i = 0; i < 5; i++) {
                stakeholders.push({
                    name: `Stakeholder ${i + 1} - ${lga.name}`,
                    phone: `080${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
                    role: roles[Math.floor(Math.random() * roles.length)],
                    lgaId: lga._id.toString(),
                    affiliation: affiliations[Math.floor(Math.random() * affiliations.length)],
                    influenceLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
                    conversionStatus: statuses[Math.floor(Math.random() * statuses.length)],
                    isActive: true,
                });
            }
        }
        await this.stakeholderModel.insertMany(stakeholders);
        this.logger.log(`Seeded ${stakeholders.length} stakeholders into MongoDB`);
    }
    async seedConversionScores() {
        const lgas = await this.lgaModel.find().exec();
        const lgaScores = lgas.map((lga, i) => ({
            entityType: 'lga', entityId: lga._id.toString(),
            score: Math.floor(Math.random() * 60) + 20,
            status: ['green', 'yellow', 'red', 'grey'][i % 4],
            lastAssessedAt: new Date(), assessedBy: 'System Seed',
        }));
        const wards = await this.wardModel.find().limit(33).exec();
        const wardScores = wards.map((ward, i) => ({
            entityType: 'ward', entityId: ward._id.toString(),
            score: Math.floor(Math.random() * 60) + 20,
            status: ['green', 'yellow', 'red', 'grey'][i % 4],
            lastAssessedAt: new Date(), assessedBy: 'System Seed',
        }));
        await this.scoreModel.insertMany([...lgaScores, ...wardScores]);
        this.logger.log(`Seeded ${lgaScores.length + wardScores.length} conversion scores into MongoDB`);
    }
    async seedWhatsAppGroups() {
        const groups = [
            { level: 'state', name: 'APM Oyo State Command', description: 'State-level coordination group', memberCount: 15, isActive: true },
            { level: 'senatorial', name: 'APM Oyo Central Senatorial', description: 'Oyo Central coordination', memberCount: 25, isActive: true },
            { level: 'senatorial', name: 'APM Oyo North Senatorial', description: 'Oyo North coordination', memberCount: 25, isActive: true },
            { level: 'senatorial', name: 'APM Oyo South Senatorial', description: 'Oyo South coordination', memberCount: 25, isActive: true },
        ];
        await this.waGroupModel.insertMany(groups);
        this.logger.log(`Seeded ${groups.length} WhatsApp groups into MongoDB`);
    }
    async seedCampaignInfo() {
        const items = [
            { key: 'trust_banner', value: 'Continuity with Competence', label: 'Trust Banner', displayOrder: 0 },
            { key: 'hero_headline', value: 'Building on Progress. Securing Our Future.', label: 'Hero Headline', displayOrder: 1 },
            { key: 'hero_subheadline', value: 'Bimbo Adekanmbi — Proven leadership to sustain and advance Oyo State\'s transformation.', label: 'Hero Subheadline', displayOrder: 2 },
            { key: 'hero_stat_1_label', value: 'Years of Experience', label: null, displayOrder: 3 },
            { key: 'hero_stat_1_value', value: '20+', label: null, displayOrder: 4 },
            { key: 'hero_stat_2_label', value: 'LGAs Engaged', label: null, displayOrder: 5 },
            { key: 'hero_stat_2_value', value: '33', label: null, displayOrder: 6 },
            { key: 'hero_stat_3_label', value: 'Wards Mobilized', label: null, displayOrder: 7 },
            { key: 'hero_stat_3_value', value: '351', label: null, displayOrder: 8 },
            { key: 'hero_stat_4_label', value: 'Communities Reached', label: null, displayOrder: 9 },
            { key: 'hero_stat_4_value', value: '600+', label: null, displayOrder: 10 },
            { key: 'candidate_name', value: 'Bimbo Adekanmbi', label: 'Candidate Name', displayOrder: 11 },
            { key: 'candidate_tagline', value: 'Your Choice for Continuous Transformation', label: 'Candidate Tagline', displayOrder: 12 },
            { key: 'candidate_story', value: 'Bimbo Adekanmbi is a seasoned financial executive...', label: 'Candidate Story', displayOrder: 13 },
            { key: 'video_url', value: 'https://www.youtube.com/watch?v=NGexChoo52g', label: 'Campaign Video URL', displayOrder: 14 },
        ];
        await this.campaignInfoModel.insertMany(items.map((item) => ({ ...item, isActive: true })));
    }
    async seedAchievements() {
        const items = [
            { title: 'Economic Transformation', summary: 'Strategic investments in agribusiness, infrastructure, and job creation.', description: 'The Makinde administration delivered the Oyo State IITA Agribusiness Industrial Park...', category: 'Economy', statLabel: 'Jobs Created', statValue: '50,000+', displayOrder: 0, isActive: true },
            { title: 'Education Revolution', summary: 'Massive rehabilitation of schools and free education.', description: 'Over 500 schools rehabilitated across all 33 LGAs...', category: 'Education', statLabel: 'Schools Rehabilitated', statValue: '500+', displayOrder: 1, isActive: true },
            { title: 'Healthcare Access', summary: 'Upgraded secondary health facilities and improved primary healthcare.', description: 'Ring Road High Dependency Unit established...', category: 'Healthcare', statLabel: 'Facilities Upgraded', statValue: '200+', displayOrder: 2, isActive: true },
            { title: 'Road Infrastructure', summary: 'Major road construction and rehabilitation connecting communities.', description: 'The 65km Moniya-Iseyin Road stands as a landmark achievement...', category: 'Infrastructure', statLabel: 'KM of Roads', statValue: '500+', displayOrder: 3, isActive: true },
            { title: 'Security Architecture', summary: 'Establishment of Amotekun Corps and security modernization.', description: 'The Amotekun Corps was established to complement federal security agencies...', category: 'Security', statLabel: 'Security Outfits', statValue: 'Amotekun', displayOrder: 4, isActive: true },
            { title: 'Youth Empowerment', summary: 'Skills development, entrepreneurship support, and youth engagement.', description: 'Youth in agribusiness schemes, skills acquisition centres...', category: 'Youth', statLabel: 'Youth Empowered', statValue: '10,000+', displayOrder: 5, isActive: true },
        ];
        await this.achievementModel.insertMany(items);
    }
    async seedAgenda() {
        const items = [
            { title: 'Economic Growth', summary: 'Deepen agribusiness industrialization.', description: 'Expand the agribusiness park model across all zones...', icon: 'CircleDollarSign', category: 'Economy', displayOrder: 0, isActive: true },
            { title: 'Infrastructure', summary: 'Connect every community with quality roads, water, and electricity.', description: 'Complete ongoing road projects...', icon: 'Building2', category: 'Infrastructure', displayOrder: 1, isActive: true },
            { title: 'Agriculture', summary: 'Transform Oyo into Nigeria\'s leading agribusiness hub.', description: 'Support farmers with inputs...', icon: 'Wheat', category: 'Agriculture', displayOrder: 2, isActive: true },
            { title: 'Healthcare', summary: 'Universal health coverage and world-class medical facilities.', description: 'Complete the upgrade of all primary healthcare centres...', icon: 'HeartPulse', category: 'Healthcare', displayOrder: 3, isActive: true },
            { title: 'Education', summary: 'Free, quality education from primary to secondary.', description: 'Sustain free education policy...', icon: 'BookOpen', category: 'Education', displayOrder: 4, isActive: true },
            { title: 'Security', summary: 'Community-driven security architecture.', description: 'Strengthen Amotekun with advanced equipment...', icon: 'ShieldCheck', category: 'Security', displayOrder: 5, isActive: true },
            { title: 'Technology', summary: 'Digital Oyo — technology for governance and jobs.', description: 'Expand broadband access across the state...', icon: 'Cpu', category: 'Technology', displayOrder: 6, isActive: true },
        ];
        await this.agendaModel.insertMany(items);
    }
    async seedNews() {
        const items = [
            { title: 'Bimbo Adekanmbi Receives Governor Makinde\'s Endorsement as Preferred Successor', slug: 'makinde-endorses-adekanmbi', excerpt: 'Governor Seyi Makinde has publicly declared Bimbo Adekanmbi as his preferred successor...', content: 'Full article content...', category: 'Endorsement', authorName: 'APM Media Team', isFeatured: true, isPublished: true, publishedAt: new Date('2026-01-15') },
            { title: 'Oyo Next: Adekanmbi Unveils 7-Point Agenda for Sustainable Development', slug: 'oyo-seven-point-agenda', excerpt: 'The APM governorship candidate has unveiled a comprehensive 7-point agenda...', content: 'Full article content...', category: 'Policy', authorName: 'APM Media Team', isFeatured: true, isPublished: true, publishedAt: new Date('2026-02-01') },
            { title: 'Grassroots Movement Grows as 10,000 Volunteers Join APM Campaign', slug: 'ten-thousand-volunteers', excerpt: 'The Adekanmbi/APM campaign has recorded over 10,000 volunteer registrations...', content: 'Full article content...', category: 'Campaign', authorName: 'APM Media Team', isFeatured: false, isPublished: true, publishedAt: new Date('2026-03-10') },
            { title: 'Continuity with Competence: The Adekanmbi Vision for Oyo State', slug: 'continuity-with-competence-vision', excerpt: 'Why Bimbo Adekanmbi believes continuity is the best strategy...', content: 'Full article content...', category: 'Policy', authorName: 'APM Media Team', isFeatured: false, isPublished: true, publishedAt: new Date('2026-04-05') },
        ];
        await this.newsModel.insertMany(items);
    }
    async seedEvents() {
        const items = [
            { title: 'Oyo North Stakeholders Engagement', description: 'A town hall meeting with traditional rulers and community leaders.', location: 'Ogbomoso, Oyo State', eventDate: new Date('2026-07-15'), eventTime: '10:00 AM', category: 'Town Hall', isPublished: true, maxAttendees: 500 },
            { title: 'Youth Summit 2026: Our Future, Our Choice', description: 'A youth-focused event bringing together young leaders.', location: 'Ibadan, Oyo State', eventDate: new Date('2026-08-01'), eventTime: '09:00 AM', category: 'Youth', isPublished: true, maxAttendees: 1000 },
            { title: 'Women in Leadership Conference', description: 'An engagement with women leaders and professional associations.', location: 'Ibadan, Oyo State', eventDate: new Date('2026-08-20'), eventTime: '10:00 AM', category: 'Women', isPublished: true, maxAttendees: 300 },
        ];
        await this.eventModel.insertMany(items);
    }
    async seedTestimonials() {
        const items = [
            { name: 'Chief Oluwole Adegoke', text: 'I have known Bimbo Adekanmbi for over 15 years. He is a man of integrity.', focus: 'Community Leader', isVerified: true, displayOrder: 0, isActive: true },
            { name: 'Mrs. Funmilayo Oke', text: 'The progress I have seen in Oyo State under Governor Makinde is remarkable.', focus: 'Market Women Association', isVerified: true, displayOrder: 1, isActive: true },
            { name: 'Comrade Yusuf Babatunde', text: 'As a youth leader, I appreciate that Adekanmbi has a clear plan for young people.', focus: 'Youth Leader', isVerified: true, displayOrder: 2, isActive: true },
            { name: 'High Chief Rasheed Ogunlade', text: 'Continuity is important for development. Bimbo Adekanmbi represents that continuity.', focus: 'Traditional Council', isVerified: true, displayOrder: 3, isActive: true },
        ];
        await this.testimonialModel.insertMany(items);
    }
    async seedMedia() {
        const items = [
            { title: 'Continuity with Competence — Campaign Video', description: 'The official campaign video.', type: 'video', assetUrl: 'https://www.youtube.com/watch?v=NGexChoo52g', category: 'Video', displayOrder: 0, isActive: true },
            { title: 'Bimbo Adekanmbi in Conversation', description: 'An exclusive interview.', type: 'video', assetUrl: 'https://www.youtube.com/watch?v=CQeRLccE4Qg', category: 'Video', displayOrder: 1, isActive: true },
            { title: 'Campaign Rally Highlights', description: 'Highlights from the APM campaign rally.', type: 'video', assetUrl: 'https://www.youtube.com/watch?v=bkVvB-x2ZYE', category: 'Video', displayOrder: 2, isActive: true },
        ];
        await this.mediaModel.insertMany(items);
    }
    async seedAgents() {
        const pus = await this.puModel.find().limit(20).exec();
        const names = ['Tunde Ojo', 'Folake Adeyemi', 'Chinedu Okonkwo', 'Aisha Bello', 'Segun Akinlade',
            'Titilayo Ogun', 'Emeka Nwosu', 'Bisi Ademola', 'Kunle Fashola', 'Ngozi Eze'];
        const agents = pus.map((pu, i) => ({
            pollingUnitId: pu._id.toString(),
            name: names[i % names.length],
            phone: `080${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
            role: i % 4 === 0 ? 'ward-supervisor' : i % 4 === 1 ? 'backup-agent' : 'agent',
            trainingStatus: i < 12 ? 'trained' : 'untrained',
            assignedAt: new Date(), isActive: true,
        }));
        await this.agentModel.insertMany(agents);
        this.logger.log(`Seeded ${agents.length} polling agents into MongoDB`);
    }
    async seedResults() {
        const pus = await this.puModel.find().limit(15).exec();
        const results = pus.map((pu) => {
            const apmVotes = Math.floor(Math.random() * 120) + 20;
            const pdpVotes = Math.floor(Math.random() * 100) + 30;
            const apcVotes = Math.floor(Math.random() * 60);
            const otherVotes = Math.floor(Math.random() * 20);
            return {
                pollingUnitId: pu._id.toString(), lgaId: pu.lgaId, wardId: pu.wardId,
                apmVotes, pdpVotes, apcVotes, otherVotes,
                totalVotes: apmVotes + pdpVotes + apcVotes + otherVotes,
                registeredVoters: pu.registeredVoters,
                enteredBy: 'Seed Admin',
                status: Math.random() > 0.5 ? 'verified' : 'submitted',
            };
        });
        await this.resultModel.insertMany(results);
        this.logger.log(`Seeded ${results.length} result entries into MongoDB`);
    }
    async seedIncidents() {
        const incidents = [
            { type: 'equipment-failure', description: 'Card reader malfunction at polling unit', severity: 'medium', reportedBy: 'Agent Report', reportedAt: new Date(), status: 'open', legalEscalation: false, securityEscalation: false },
            { type: 'intimidation', description: 'Party thugs attempting to chase away voters at Ward 3', severity: 'high', reportedBy: 'Polling Agent', reportedAt: new Date(), status: 'open', legalEscalation: false, securityEscalation: true },
            { type: 'other', description: 'Delayed arrival of election materials by 2 hours', severity: 'low', reportedBy: 'Ward Supervisor', reportedAt: new Date(), status: 'resolved', legalEscalation: false, securityEscalation: false },
            { type: 'rigging', description: 'Suspected ballot box stuffing at PU 005', severity: 'critical', reportedBy: 'Agent Network', reportedAt: new Date(), status: 'open', legalEscalation: true, securityEscalation: true },
            { type: 'violence', description: 'Physical altercation between party supporters near polling centre', severity: 'critical', reportedBy: 'Security Observer', reportedAt: new Date(), status: 'open', legalEscalation: true, securityEscalation: true },
        ];
        await this.incidentModel.insertMany(incidents);
        this.logger.log(`Seeded ${incidents.length} incident reports into MongoDB`);
    }
    async seedGotv() {
        const pus = await this.puModel.find().limit(12).exec();
        const names = ['Rashidi Adebayo', 'Modupe Alabi', 'Ifeanyi Okafor', 'Grace Okoro', 'Sikiru Lawal',
            'Bukola Salami', 'Yusuf Bello', 'Nkechi Umeh', 'Segun Ogunlade', 'Aminat Yusuf',
            'Rotimi Adegoke', 'Chioma Nwankwo'];
        const contacts = names.map((name, i) => ({
            pollingUnitId: pus[i % pus.length]._id.toString(),
            supporterName: name,
            supporterPhone: `080${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
            contacted: true,
            turnedOut: Math.random() > 0.4,
            contactedVia: ['sms', 'whatsapp', 'phone', 'visit'][Math.floor(Math.random() * 4)],
            contactedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)),
        }));
        await this.gotvModel.insertMany(contacts);
        this.logger.log(`Seeded ${contacts.length} GOTV records into MongoDB`);
    }
};
exports.ApmMongoSeedService = ApmMongoSeedService;
exports.ApmMongoSeedService = ApmMongoSeedService = ApmMongoSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('CampaignInfo')),
    __param(1, (0, mongoose_1.InjectModel)('AgendaItem')),
    __param(2, (0, mongoose_1.InjectModel)('Achievement')),
    __param(3, (0, mongoose_1.InjectModel)('NewsArticle')),
    __param(4, (0, mongoose_1.InjectModel)('Event')),
    __param(5, (0, mongoose_1.InjectModel)('Testimonial')),
    __param(6, (0, mongoose_1.InjectModel)('MediaAsset')),
    __param(7, (0, mongoose_1.InjectModel)('Lga')),
    __param(8, (0, mongoose_1.InjectModel)('Ward')),
    __param(9, (0, mongoose_1.InjectModel)('PollingUnit')),
    __param(10, (0, mongoose_1.InjectModel)('Stakeholder')),
    __param(11, (0, mongoose_1.InjectModel)('ConversionScore')),
    __param(12, (0, mongoose_1.InjectModel)('WhatsAppGroup')),
    __param(13, (0, mongoose_1.InjectModel)('PollingAgent')),
    __param(14, (0, mongoose_1.InjectModel)('ResultEntry')),
    __param(15, (0, mongoose_1.InjectModel)('IncidentReport')),
    __param(16, (0, mongoose_1.InjectModel)('GotvRecord')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ApmMongoSeedService);
//# sourceMappingURL=apm-mongo.seed.js.map