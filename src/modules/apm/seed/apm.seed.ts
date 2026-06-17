import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CampaignInfoOrmEntity,
  AgendaItemOrmEntity,
  AchievementOrmEntity,
  NewsArticleOrmEntity,
  EventOrmEntity,
  TestimonialOrmEntity,
  MediaAssetOrmEntity,
  LgaOrmEntity,
  WardOrmEntity,
  PollingUnitOrmEntity,
  StakeholderOrmEntity,
  ConversionScoreOrmEntity,
  WhatsAppGroupOrmEntity,
  PollingAgentOrmEntity,
  ResultEntryOrmEntity,
  IncidentReportOrmEntity,
  GotvRecordOrmEntity,
} from '../entities';

@Injectable()
export class ApmSeedService implements OnModuleInit {
  private readonly logger = new Logger(ApmSeedService.name);

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
    @InjectRepository(TestimonialOrmEntity)
    private readonly testimonialRepo: Repository<TestimonialOrmEntity>,
    @InjectRepository(MediaAssetOrmEntity)
    private readonly mediaRepo: Repository<MediaAssetOrmEntity>,
    @InjectRepository(LgaOrmEntity)
    private readonly lgaRepo: Repository<LgaOrmEntity>,
    @InjectRepository(WardOrmEntity)
    private readonly wardRepo: Repository<WardOrmEntity>,
    @InjectRepository(PollingUnitOrmEntity)
    private readonly puRepo: Repository<PollingUnitOrmEntity>,
    @InjectRepository(StakeholderOrmEntity)
    private readonly stakeholderRepo: Repository<StakeholderOrmEntity>,
    @InjectRepository(ConversionScoreOrmEntity)
    private readonly scoreRepo: Repository<ConversionScoreOrmEntity>,
    @InjectRepository(WhatsAppGroupOrmEntity)
    private readonly waGroupRepo: Repository<WhatsAppGroupOrmEntity>,
    @InjectRepository(PollingAgentOrmEntity)
    private readonly agentRepo: Repository<PollingAgentOrmEntity>,
    @InjectRepository(ResultEntryOrmEntity)
    private readonly resultRepo: Repository<ResultEntryOrmEntity>,
    @InjectRepository(IncidentReportOrmEntity)
    private readonly incidentRepo: Repository<IncidentReportOrmEntity>,
    @InjectRepository(GotvRecordOrmEntity)
    private readonly gotvRepo: Repository<GotvRecordOrmEntity>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const lgaCount = await this.lgaRepo.count();
    if (lgaCount > 0) {
      this.logger.log('APM LGA/ward data already seeded, checking campaign data...');
      const campaignCount = await this.campaignInfoRepo.count();
      if (campaignCount > 0) {
        this.logger.log('APM data already seeded, skipping');
        return;
      }
    }

    this.logger.log('Seeding APM campaign data...');

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

    this.logger.log('APM campaign data seeded successfully!');
  }

  private async seedLgas() {
    const lgas: Partial<LgaOrmEntity>[] = [
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
    await this.lgaRepo.save(lgas);
    this.logger.log(`Seeded ${lgas.length} LGAs`);
  }

  private async seedWards() {
    const lgas = await this.lgaRepo.find({ order: { displayOrder: 'ASC' } });
    const wards: Partial<WardOrmEntity>[] = [];
    let wardDisplayOrder = 0;

    for (const lga of lgas) {
      for (let i = 1; i <= 11; i++) {
        wards.push({
          name: `Ward ${i}`,
          code: `${lga.code}W${String(i).padStart(2, '0')}`,
          lgaId: lga.id,
          displayOrder: wardDisplayOrder++,
        });
      }
    }
    await this.wardRepo.save(wards);
    this.logger.log(`Seeded ${wards.length} wards across ${lgas.length} LGAs`);
  }

  private async seedPollingUnits() {
    const wards = await this.wardRepo.find();
    const pus: Partial<PollingUnitOrmEntity>[] = [];
    let puCount = 0;

    for (const ward of wards.slice(0, 33)) {
      for (let i = 1; i <= 5; i++) {
        pus.push({
          code: `${ward.code}PU${String(i).padStart(3, '0')}`,
          name: `${ward.name} Polling Unit ${i}`,
          wardId: ward.id,
          lgaId: ward.lgaId,
          registeredVoters: Math.floor(Math.random() * 500) + 200,
          pastResultApm: Math.floor(Math.random() * 100),
          pastResultPdp: Math.floor(Math.random() * 200) + 50,
          pastResultApc: Math.floor(Math.random() * 80),
          pastResultOther: Math.floor(Math.random() * 30),
          riskLevel: ['green', 'yellow', 'red', 'grey'][Math.floor(Math.random() * 4)],
          conversionStatus: ['untouched', 'engaged', 'won', 'lost'][Math.floor(Math.random() * 4)],
          isActive: true,
        });
        puCount++;
      }
    }
    await this.puRepo.save(pus);
    this.logger.log(`Seeded ${puCount} polling units`);
  }

  private async seedStakeholders() {
    const lgas = await this.lgaRepo.find({ take: 6 });
    const stakeholders: Partial<StakeholderOrmEntity>[] = [];
    const roles = ['chairman', 'councillor', 'party-leader', 'youth-leader', 'women-leader', 'religious-leader', 'community-leader'];
    const affiliations = ['PDP', 'APC', 'APM', 'LP', 'Other'];
    const statuses = ['untouched', 'engaged', 'leaning', 'won', 'lost', 'hostile'];

    for (const lga of lgas) {
      for (let i = 0; i < 5; i++) {
        stakeholders.push({
          name: `Stakeholder ${i + 1} - ${lga.name}`,
          phone: `080${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
          role: roles[Math.floor(Math.random() * roles.length)],
          lgaId: lga.id,
          affiliation: affiliations[Math.floor(Math.random() * affiliations.length)],
          influenceLevel: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
          conversionStatus: statuses[Math.floor(Math.random() * statuses.length)],
          isActive: true,
        });
      }
    }
    await this.stakeholderRepo.save(stakeholders);
    this.logger.log(`Seeded ${stakeholders.length} stakeholders`);
  }

  private async seedConversionScores() {
    const lgas = await this.lgaRepo.find();
    const lgaScores: Partial<ConversionScoreOrmEntity>[] = lgas.map((lga, i) => ({
      entityType: 'lga',
      entityId: lga.id,
      score: Math.floor(Math.random() * 60) + 20,
      status: ['green', 'yellow', 'red', 'grey'][i % 4],
      lastAssessedAt: new Date(),
      assessedBy: 'System Seed',
    }));

    const wards = await this.wardRepo.find({ take: 33 });
    const wardScores: Partial<ConversionScoreOrmEntity>[] = wards.map((ward, i) => ({
      entityType: 'ward',
      entityId: ward.id,
      score: Math.floor(Math.random() * 60) + 20,
      status: ['green', 'yellow', 'red', 'grey'][i % 4],
      lastAssessedAt: new Date(),
      assessedBy: 'System Seed',
    }));

    await this.scoreRepo.save([...lgaScores, ...wardScores]);
    this.logger.log(`Seeded ${lgaScores.length + wardScores.length} conversion scores`);
  }

  private async seedWhatsAppGroups() {
    const groups: Partial<WhatsAppGroupOrmEntity>[] = [
      { level: 'state', name: 'APM Oyo State Command', description: 'State-level coordination group', memberCount: 15, isActive: true },
      { level: 'senatorial', name: 'APM Oyo Central Senatorial', description: 'Oyo Central coordination', memberCount: 25, isActive: true },
      { level: 'senatorial', name: 'APM Oyo North Senatorial', description: 'Oyo North coordination', memberCount: 25, isActive: true },
      { level: 'senatorial', name: 'APM Oyo South Senatorial', description: 'Oyo South coordination', memberCount: 25, isActive: true },
    ];
    await this.waGroupRepo.save(groups);
    this.logger.log(`Seeded ${groups.length} WhatsApp groups`);
  }

  private async seedCampaignInfo() {
    const items: Partial<CampaignInfoOrmEntity>[] = [
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
      { key: 'candidate_story', value: 'Bimbo Adekanmbi is a seasoned financial executive, technocrat, and grassroots leader with over two decades of experience in public and private sector transformation. As Governor Seyi Makinde\'s preferred successor, he represents continuity, competence, and a relentless commitment to Oyo State\'s progress. His journey from financial management to community mobilization has equipped him with the discipline, vision, and heart to lead Oyo State into its next chapter of growth.', label: 'Candidate Story', displayOrder: 13 },
      { key: 'video_url', value: 'https://www.youtube.com/watch?v=NGexChoo52g', label: 'Campaign Video URL', displayOrder: 14 },
    ];
    await this.campaignInfoRepo.save(items);
  }

  private async seedAchievements() {
    const items: Partial<AchievementOrmEntity>[] = [
      { title: 'Economic Transformation', summary: 'Strategic investments in agribusiness, infrastructure, and job creation across Oyo State.', description: 'The Makinde administration delivered the Oyo State IITA Agribusiness Industrial Park, Ojoo Bus Terminal, and numerous market rehabilitations. These projects created thousands of jobs and positioned Oyo as an emerging investment destination in Nigeria.', category: 'Economy', statLabel: 'Jobs Created', statValue: '50,000+', displayOrder: 0 },
      { title: 'Education Revolution', summary: 'Massive rehabilitation of schools and free education from primary to secondary levels.', description: 'Over 500 schools rehabilitated across all 33 LGAs. Free education in all public primary and secondary schools. Renovation of Awoyemi Commercial High School, Community Primary School Airport, and numerous others. Investment in modern learning facilities and teacher training.', category: 'Education', statLabel: 'Schools Rehabilitated', statValue: '500+', displayOrder: 1 },
      { title: 'Healthcare Access', summary: 'Upgraded secondary health facilities and improved primary healthcare delivery.', description: 'Ring Road High Dependency Unit established. Upgraded secondary health facilities across the state. Improved emergency response systems and maternal healthcare. Investment in modern medical equipment and personnel training.', category: 'Healthcare', statLabel: 'Facilities Upgraded', statValue: '200+', displayOrder: 2 },
      { title: 'Road Infrastructure', summary: 'Major road construction and rehabilitation connecting communities across Oyo.', description: 'The 65km Moniya-Iseyin Road stands as a landmark achievement. Saki Township Road, Beere-Sango-Orita-Aperin Road, and numerous urban and rural road projects have transformed connectivity and commerce across the state.', category: 'Infrastructure', statLabel: 'KM of Roads', statValue: '500+', displayOrder: 3 },
      { title: 'Security Architecture', summary: 'Establishment of Amotekun Corps and comprehensive security modernization.', description: 'The Amotekun Corps was established to complement federal security agencies. Investment in security vehicles, communication equipment, and intelligence gathering. Community policing initiatives strengthened across all LGAs.', category: 'Security', statLabel: 'Security Outfits', statValue: 'Amotekun', displayOrder: 4 },
      { title: 'Youth Empowerment', summary: 'Skills development, entrepreneurship support, and youth engagement programmes.', description: 'Youth in agribusiness schemes, skills acquisition centres, and entrepreneurship grants. Investment in sports development and creative economy. Digital skills training and technology hubs established across the state.', category: 'Youth', statLabel: 'Youth Empowered', statValue: '10,000+', displayOrder: 5 },
    ];
    await this.achievementRepo.save(items);
  }

  private async seedAgenda() {
    const items: Partial<AgendaItemOrmEntity>[] = [
      { title: 'Economic Growth', summary: 'Deepen agribusiness industrialization and create sustainable employment.', description: 'Expand the agribusiness park model across all zones. Support SMEs with access to capital and markets. Build industrial clusters in strategic locations. Create a business-enabling environment that attracts investment.', icon: 'CircleDollarSign', category: 'Economy', displayOrder: 0 },
      { title: 'Infrastructure', summary: 'Connect every community with quality roads, water, and electricity.', description: 'Complete ongoing road projects and initiate new ones across all 33 LGAs. Expand rural electrification. Improve water supply infrastructure. Develop modern public transportation systems.', icon: 'Building2', category: 'Infrastructure', displayOrder: 1 },
      { title: 'Agriculture', summary: 'Transform Oyo into Nigeria\'s leading agribusiness hub.', description: 'Support farmers with inputs, extension services, and market access. Establish processing zones to add value locally. Promote youth in agribusiness. Leverage technology for precision farming.', icon: 'Wheat', category: 'Agriculture', displayOrder: 2 },
      { title: 'Healthcare', summary: 'Universal health coverage and world-class medical facilities.', description: 'Complete the upgrade of all primary healthcare centres. Establish a state health insurance scheme. Modernize general hospitals. Invest in medical training and retention of healthcare professionals.', icon: 'HeartPulse', category: 'Healthcare', displayOrder: 3 },
      { title: 'Education', summary: 'Free, quality education from primary to secondary for every Oyo child.', description: 'Sustain free education policy. Build new model schools. Invest in teacher training and welfare. Expand technical and vocational education. Leverage technology for remote learning.', icon: 'BookOpen', category: 'Education', displayOrder: 4 },
      { title: 'Security', summary: 'Community-driven security architecture for lasting peace.', description: 'Strengthen Amotekun with advanced equipment and training. Deepen community policing. Invest in intelligence gathering. Support conflict resolution mechanisms at ward and LGA levels.', icon: 'ShieldCheck', category: 'Security', displayOrder: 5 },
      { title: 'Technology', summary: 'Digital Oyo — technology for governance, jobs, and inclusion.', description: 'Expand broadband access across the state. Establish innovation hubs. Digitize government services. Support tech startups. Train youth in digital skills. Use data for evidence-based policymaking.', icon: 'Cpu', category: 'Technology', displayOrder: 6 },
    ];
    await this.agendaRepo.save(items);
  }

  private async seedNews() {
    const items: Partial<NewsArticleOrmEntity>[] = [
      { title: 'Bimbo Adekanmbi Receives Governor Makinde\'s Endorsement as Preferred Successor', slug: 'makinde-endorses-adekanmbi', excerpt: 'Governor Seyi Makinde has publicly declared Bimbo Adekanmbi as his preferred successor, citing his competence, loyalty, and capacity to sustain the Omituntun legacy.', content: 'Governor Seyi Makinde has officially declared Bimbo Adekanmbi as his preferred successor in the 2027 Oyo State governorship election. Speaking at a gathering of party stakeholders, the Governor described Adekanmbi as a leader with the discipline, financial acumen, and grassroots connection required to sustain the transformation agenda of his administration.', category: 'Endorsement', authorName: 'APM Media Team', isFeatured: true, isPublished: true, publishedAt: new Date('2026-01-15') },
      { title: 'Oyo Next: Adekanmbi Unveils 7-Point Agenda for Sustainable Development', slug: 'oyo-seven-point-agenda', excerpt: 'The APM governorship candidate has unveiled a comprehensive 7-point agenda focused on economy, infrastructure, agriculture, healthcare, education, security, and technology.', content: 'Bimbo Adekanmbi has unveiled his "Oyo Next" agenda, a comprehensive 7-point development plan that builds on the achievements of the Makinde administration while charting a bold new course for the state.', category: 'Policy', authorName: 'APM Media Team', isFeatured: true, isPublished: true, publishedAt: new Date('2026-02-01') },
      { title: 'Grassroots Movement Grows as 10,000 Volunteers Join APM Campaign', slug: 'ten-thousand-volunteers', excerpt: 'The Adekanmbi/APM campaign has recorded over 10,000 volunteer registrations across all 33 LGAs of Oyo State in just three months.', content: 'The Adekanmbi/APM campaign has achieved a major milestone, recording over 10,000 volunteer registrations across all 33 Local Government Areas of Oyo State.', category: 'Campaign', authorName: 'APM Media Team', isFeatured: false, isPublished: true, publishedAt: new Date('2026-03-10') },
      { title: 'Continuity with Competence: The Adekanmbi Vision for Oyo State', slug: 'continuity-with-competence-vision', excerpt: 'Why Bimbo Adekanmbi believes continuity is the best strategy for Oyo State\'s continued growth and transformation.', content: 'Bimbo Adekanmbi explained why "Continuity with Competence" is more than a campaign slogan — it is a governance philosophy. "What Oyo needs is someone who understands the vision, respects the legacy, and has the competence to take it to the next level," Adekanmbi stated.', category: 'Policy', authorName: 'APM Media Team', isFeatured: false, isPublished: true, publishedAt: new Date('2026-04-05') },
    ];
    await this.newsRepo.save(items);
  }

  private async seedEvents() {
    const items: Partial<EventOrmEntity>[] = [
      { title: 'Oyo North Stakeholders Engagement', description: 'A town hall meeting with traditional rulers, community leaders, youth groups, and market associations from Oyo North Senatorial District.', location: 'Ogbomoso, Oyo State', eventDate: new Date('2026-07-15'), eventTime: '10:00 AM', category: 'Town Hall', isPublished: true, maxAttendees: 500 },
      { title: 'Youth Summit 2026: Our Future, Our Choice', description: 'A youth-focused event bringing together young leaders, students, entrepreneurs, and innovators.', location: 'Ibadan, Oyo State', eventDate: new Date('2026-08-01'), eventTime: '09:00 AM', category: 'Youth', isPublished: true, maxAttendees: 1000 },
      { title: 'Women in Leadership Conference', description: 'An engagement with women leaders, market women, professional women associations, and female entrepreneurs.', location: 'Ibadan, Oyo State', eventDate: new Date('2026-08-20'), eventTime: '10:00 AM', category: 'Women', isPublished: true, maxAttendees: 300 },
    ];
    await this.eventRepo.save(items);
  }

  private async seedTestimonials() {
    const items: Partial<TestimonialOrmEntity>[] = [
      { name: 'Chief Oluwole Adegoke', text: 'I have known Bimbo Adekanmbi for over 15 years. He is a man of integrity, discipline, and deep understanding of governance. Oyo State will be in safe hands.', focus: 'Community Leader', isVerified: true, displayOrder: 0 },
      { name: 'Mrs. Funmilayo Oke', text: 'The progress I have seen in Oyo State under Governor Makinde is remarkable. I believe Bimbo Adekanmbi is the right person to continue this good work.', focus: 'Market Women Association', isVerified: true, displayOrder: 1 },
      { name: 'Comrade Yusuf Babatunde', text: 'As a youth leader, I appreciate that Adekanmbi has a clear plan for young people. He listens, he understands our challenges, and he has a vision for our future.', focus: 'Youth Leader', isVerified: true, displayOrder: 2 },
      { name: 'High Chief Rasheed Ogunlade', text: 'Continuity is important for development. Every time we change direction, we lose momentum. Bimbo Adekanmbi represents the continuity that Oyo State needs.', focus: 'Traditional Council', isVerified: true, displayOrder: 3 },
    ];
    await this.testimonialRepo.save(items);
  }

  private async seedMedia() {
    const items: Partial<MediaAssetOrmEntity>[] = [
      { title: 'Continuity with Competence — Campaign Video', description: 'The official campaign video introducing Bimbo Adekanmbi.', type: 'video', assetUrl: 'https://www.youtube.com/watch?v=NGexChoo52g', category: 'Video', displayOrder: 0 },
      { title: 'Bimbo Adekanmbi in Conversation', description: 'An exclusive interview discussing the Oyo Next agenda.', type: 'video', assetUrl: 'https://www.youtube.com/watch?v=CQeRLccE4Qg', category: 'Video', displayOrder: 1 },
      { title: 'Campaign Rally Highlights', description: 'Highlights from the APM campaign rally across Oyo State.', type: 'video', assetUrl: 'https://www.youtube.com/watch?v=bkVvB-x2ZYE', category: 'Video', displayOrder: 2 },
    ];
    await this.mediaRepo.save(items);
  }

  private async seedAgents() {
    const pus = await this.puRepo.find({ take: 20 });
    const names = ['Tunde Ojo', 'Folake Adeyemi', 'Chinedu Okonkwo', 'Aisha Bello', 'Segun Akinlade',
      'Titilayo Ogun', 'Emeka Nwosu', 'Bisi Ademola', 'Kunle Fashola', 'Ngozi Eze'];
    const agents: Partial<PollingAgentOrmEntity>[] = pus.map((pu, i) => ({
      pollingUnitId: pu.id,
      name: names[i % names.length],
      phone: `080${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
      role: i % 4 === 0 ? 'ward-supervisor' : i % 4 === 1 ? 'backup-agent' : 'agent',
      trainingStatus: i < 12 ? 'trained' : 'untrained',
      assignedAt: new Date(),
      isActive: true,
    }));
    await this.agentRepo.save(agents);
    this.logger.log(`Seeded ${agents.length} polling agents`);
  }

  private async seedResults() {
    const pus = await this.puRepo.find({ take: 15 });
    const results: Partial<ResultEntryOrmEntity>[] = pus.map((pu) => ({
      pollingUnitId: pu.id,
      lgaId: pu.lgaId,
      wardId: pu.wardId,
      apmVotes: Math.floor(Math.random() * 120) + 20,
      pdpVotes: Math.floor(Math.random() * 100) + 30,
      apcVotes: Math.floor(Math.random() * 60),
      otherVotes: Math.floor(Math.random() * 20),
      totalVotes: 0,
      registeredVoters: pu.registeredVoters,
      enteredBy: 'Seed Admin',
      status: Math.random() > 0.5 ? 'verified' : 'submitted',
    }));
    for (const r of results) {
      r.totalVotes = r.apmVotes! + r.pdpVotes! + r.apcVotes! + (r.otherVotes ?? 0);
    }
    await this.resultRepo.save(results);
    this.logger.log(`Seeded ${results.length} result entries`);
  }

  private async seedIncidents() {
    const types = ['violence', 'intimidation', 'rigging', 'equipment-failure', 'other'];
    const incidents: Partial<IncidentReportOrmEntity>[] = [
      { type: 'equipment-failure', description: 'Card reader malfunction at polling unit', severity: 'medium', reportedBy: 'Agent Report', reportedAt: new Date(), status: 'open', legalEscalation: false, securityEscalation: false },
      { type: 'intimidation', description: 'Party thugs attempting to chase away voters at Ward 3', severity: 'high', reportedBy: 'Polling Agent', reportedAt: new Date(), status: 'open', legalEscalation: false, securityEscalation: true },
      { type: 'other', description: 'Delayed arrival of election materials by 2 hours', severity: 'low', reportedBy: 'Ward Supervisor', reportedAt: new Date(), status: 'resolved', legalEscalation: false, securityEscalation: false },
      { type: 'rigging', description: 'Suspected ballot box stuffing at PU 005', severity: 'critical', reportedBy: 'Agent Network', reportedAt: new Date(), status: 'open', legalEscalation: true, securityEscalation: true },
      { type: 'violence', description: 'Physical altercation between party supporters near polling centre', severity: 'critical', reportedBy: 'Security Observer', reportedAt: new Date(), status: 'open', legalEscalation: true, securityEscalation: true },
    ];
    await this.incidentRepo.save(incidents);
    this.logger.log(`Seeded ${incidents.length} incident reports`);
  }

  private async seedGotv() {
    const pus = await this.puRepo.find({ take: 12 });
    const names = ['Rashidi Adebayo', 'Modupe Alabi', 'Ifeanyi Okafor', 'Grace Okoro', 'Sikiru Lawal',
      'Bukola Salami', 'Yusuf Bello', 'Nkechi Umeh', 'Segun Ogunlade', 'Aminat Yusuf',
      'Rotimi Adegoke', 'Chioma Nwankwo'];
    const contacts: Partial<GotvRecordOrmEntity>[] = names.map((name, i) => ({
      pollingUnitId: pus[i % pus.length].id,
      supporterName: name,
      supporterPhone: `080${String(Math.floor(Math.random() * 900000000) + 100000000)}`,
      contacted: true,
      turnedOut: Math.random() > 0.4,
      contactedVia: ['sms', 'whatsapp', 'phone', 'visit'][Math.floor(Math.random() * 4)],
      contactedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)),
    }));
    await this.gotvRepo.save(contacts);
    this.logger.log(`Seeded ${contacts.length} GOTV records`);
  }
}
