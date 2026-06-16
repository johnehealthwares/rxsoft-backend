import { Injectable, Logger } from '@nestjs/common';
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
} from '../entities';

@Injectable()
export class ApmSeedService {
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
  ) {}

  async seed() {
    const count = await this.campaignInfoRepo.count();
    if (count > 0) {
      this.logger.log('APM data already seeded, skipping');
      return;
    }

    this.logger.log('Seeding APM campaign data...');

    await this.seedCampaignInfo();
    await this.seedAchievements();
    await this.seedAgenda();
    await this.seedNews();
    await this.seedEvents();
    await this.seedTestimonials();
    await this.seedMedia();

    this.logger.log('APM campaign data seeded successfully!');
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
      {
        title: 'Economic Transformation',
        summary: 'Strategic investments in agribusiness, infrastructure, and job creation across Oyo State.',
        description: 'The Makinde administration delivered the Oyo State IITA Agribusiness Industrial Park, Ojoo Bus Terminal, and numerous market rehabilitations. These projects created thousands of jobs and positioned Oyo as an emerging investment destination in Nigeria.',
        category: 'Economy',
        statLabel: 'Jobs Created',
        statValue: '50,000+',
        displayOrder: 0,
      },
      {
        title: 'Education Revolution',
        summary: 'Massive rehabilitation of schools and free education from primary to secondary levels.',
        description: 'Over 500 schools rehabilitated across all 33 LGAs. Free education in all public primary and secondary schools. Renovation of Awoyemi Commercial High School, Community Primary School Airport, and numerous others. Investment in modern learning facilities and teacher training.',
        category: 'Education',
        statLabel: 'Schools Rehabilitated',
        statValue: '500+',
        displayOrder: 1,
      },
      {
        title: 'Healthcare Access',
        summary: 'Upgraded secondary health facilities and improved primary healthcare delivery.',
        description: 'Ring Road High Dependency Unit established. Upgraded secondary health facilities across the state. Improved emergency response systems and maternal healthcare. Investment in modern medical equipment and personnel training.',
        category: 'Healthcare',
        statLabel: 'Facilities Upgraded',
        statValue: '200+',
        displayOrder: 2,
      },
      {
        title: 'Road Infrastructure',
        summary: 'Major road construction and rehabilitation connecting communities across Oyo.',
        description: 'The 65km Moniya-Iseyin Road stands as a landmark achievement. Saki Township Road, Beere-Sango-Orita-Aperin Road, and numerous urban and rural road projects have transformed connectivity and commerce across the state.',
        category: 'Infrastructure',
        statLabel: 'KM of Roads',
        statValue: '500+',
        displayOrder: 3,
      },
      {
        title: 'Security Architecture',
        summary: 'Establishment of Amotekun Corps and comprehensive security modernization.',
        description: 'The Amotekun Corps was established to complement federal security agencies. Investment in security vehicles, communication equipment, and intelligence gathering. Community policing initiatives strengthened across all LGAs.',
        category: 'Security',
        statLabel: 'Security Outfits',
        statValue: 'Amotekun',
        displayOrder: 4,
      },
      {
        title: 'Youth Empowerment',
        summary: 'Skills development, entrepreneurship support, and youth engagement programmes.',
        description: 'Youth in agribusiness schemes, skills acquisition centres, and entrepreneurship grants. Investment in sports development and creative economy. Digital skills training and technology hubs established across the state.',
        category: 'Youth',
        statLabel: 'Youth Empowered',
        statValue: '10,000+',
        displayOrder: 5,
      },
    ];

    await this.achievementRepo.save(items);
  }

  private async seedAgenda() {
    const items: Partial<AgendaItemOrmEntity>[] = [
      {
        title: 'Economic Growth',
        summary: 'Deepen agribusiness industrialization and create sustainable employment.',
        description: 'Expand the agribusiness park model across all zones. Support SMEs with access to capital and markets. Build industrial clusters in strategic locations. Create a business-enabling environment that attracts investment.',
        icon: 'CircleDollarSign',
        category: 'Economy',
        displayOrder: 0,
      },
      {
        title: 'Infrastructure',
        summary: 'Connect every community with quality roads, water, and electricity.',
        description: 'Complete ongoing road projects and initiate new ones across all 33 LGAs. Expand rural electrification. Improve water supply infrastructure. Develop modern public transportation systems.',
        icon: 'Building2',
        category: 'Infrastructure',
        displayOrder: 1,
      },
      {
        title: 'Agriculture',
        summary: 'Transform Oyo into Nigeria\'s leading agribusiness hub.',
        description: 'Support farmers with inputs, extension services, and market access. Establish processing zones to add value locally. Promote youth in agribusiness. Leverage technology for precision farming.',
        icon: 'Wheat',
        category: 'Agriculture',
        displayOrder: 2,
      },
      {
        title: 'Healthcare',
        summary: 'Universal health coverage and world-class medical facilities.',
        description: 'Complete the upgrade of all primary healthcare centres. Establish a state health insurance scheme. Modernize general hospitals. Invest in medical training and retention of healthcare professionals.',
        icon: 'HeartPulse',
        category: 'Healthcare',
        displayOrder: 3,
      },
      {
        title: 'Education',
        summary: 'Free, quality education from primary to secondary for every Oyo child.',
        description: 'Sustain free education policy. Build new model schools. Invest in teacher training and welfare. Expand technical and vocational education. Leverage technology for remote learning.',
        icon: 'BookOpen',
        category: 'Education',
        displayOrder: 4,
      },
      {
        title: 'Security',
        summary: 'Community-driven security architecture for lasting peace.',
        description: 'Strengthen Amotekun with advanced equipment and training. Deepen community policing. Invest in intelligence gathering. Support conflict resolution mechanisms at ward and LGA levels.',
        icon: 'ShieldCheck',
        category: 'Security',
        displayOrder: 5,
      },
      {
        title: 'Technology',
        summary: 'Digital Oyo — technology for governance, jobs, and inclusion.',
        description: 'Expand broadband access across the state. Establish innovation hubs. Digitize government services. Support tech startups. Train youth in digital skills. Use data for evidence-based policymaking.',
        icon: 'Cpu',
        category: 'Technology',
        displayOrder: 6,
      },
    ];

    await this.agendaRepo.save(items);
  }

  private async seedNews() {
    const items: Partial<NewsArticleOrmEntity>[] = [
      {
        title: 'Bimbo Adekanmbi Receives Governor Makinde\'s Endorsement as Preferred Successor',
        slug: 'makinde-endorses-adekanmbi',
        excerpt: 'Governor Seyi Makinde has publicly declared Bimbo Adekanmbi as his preferred successor, citing his competence, loyalty, and capacity to sustain the Omituntun legacy.',
        content: 'Governor Seyi Makinde has officially declared Bimbo Adekanmbi as his preferred successor in the 2027 Oyo State governorship election. Speaking at a gathering of party stakeholders, the Governor described Adekanmbi as a leader with the discipline, financial acumen, and grassroots connection required to sustain the transformation agenda of his administration. "I have worked closely with Bimbo Adekanmbi, and I know his capacity. He is not just competent — he is prepared. He understands the vision, he understands the people, and he will not let Oyo State down," Makinde stated.',
        category: 'Endorsement',
        authorName: 'APM Media Team',
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2026-01-15'),
      },
      {
        title: 'Oyo Next: Adekanmbi Unveils 7-Point Agenda for Sustainable Development',
        slug: 'oyo-seven-point-agenda',
        excerpt: 'The APM governorship candidate has unveiled a comprehensive 7-point agenda focused on economy, infrastructure, agriculture, healthcare, education, security, and technology.',
        content: 'Bimbo Adekanmbi has unveiled his "Oyo Next" agenda, a comprehensive 7-point development plan that builds on the achievements of the Makinde administration while charting a bold new course for the state. The agenda covers economic growth, infrastructure expansion, agricultural transformation, universal healthcare, quality education, community security, and digital innovation. "This is not a new promise — it is a continuation of the progress we have already made, with a plan to go further, faster," Adekanmbi said during the unveiling.',
        category: 'Policy',
        authorName: 'APM Media Team',
        isFeatured: true,
        isPublished: true,
        publishedAt: new Date('2026-02-01'),
      },
      {
        title: 'Grassroots Movement Grows as 10,000 Volunteers Join APM Campaign',
        slug: 'ten-thousand-volunteers',
        excerpt: 'The Adekanmbi/APM campaign has recorded over 10,000 volunteer registrations across all 33 LGAs of Oyo State in just three months.',
        content: 'The Adekanmbi/APM campaign has achieved a major milestone, recording over 10,000 volunteer registrations across all 33 Local Government Areas of Oyo State. The volunteers, drawn from youth groups, market associations, professional bodies, and community organizations, have been deployed for door-to-door canvassing, event coordination, and digital mobilization. "This is proof that the people of Oyo State are ready for continuity. They have seen the progress, and they want it sustained," said the campaign director.',
        category: 'Campaign',
        authorName: 'APM Media Team',
        isFeatured: false,
        isPublished: true,
        publishedAt: new Date('2026-03-10'),
      },
      {
        title: 'Continuity with Competence: The Adekanmbi Vision for Oyo State',
        slug: 'continuity-with-competence-vision',
        excerpt: 'Why Bimbo Adekanmbi believes continuity is the best strategy for Oyo State\'s continued growth and transformation.',
        content: 'In a recent media chat, Bimbo Adekanmbi explained why "Continuity with Competence" is more than a campaign slogan — it is a governance philosophy. "Governor Makinde has laid a foundation. We have seen results in education, healthcare, roads, and security. The worst thing we can do is start over. What Oyo needs is someone who understands the vision, respects the legacy, and has the competence to take it to the next level," Adekanmbi stated. He outlined his plans to build on the Omituntun 1.0 achievements and deliver the Omituntun 2.0 promises.',
        category: 'Policy',
        authorName: 'APM Media Team',
        isFeatured: false,
        isPublished: true,
        publishedAt: new Date('2026-04-05'),
      },
    ];

    await this.newsRepo.save(items);
  }

  private async seedEvents() {
    const items: Partial<EventOrmEntity>[] = [
      {
        title: 'Oyo North Stakeholders Engagement',
        description: 'A town hall meeting with traditional rulers, community leaders, youth groups, and market associations from Oyo North Senatorial District to discuss the continuity agenda.',
        location: 'Ogbomoso, Oyo State',
        eventDate: new Date('2026-07-15'),
        eventTime: '10:00 AM',
        category: 'Town Hall',
        isPublished: true,
        maxAttendees: 500,
      },
      {
        title: 'Youth Summit 2026: Our Future, Our Choice',
        description: 'A youth-focused event bringing together young leaders, students, entrepreneurs, and innovators to discuss the role of young people in shaping Oyo State\'s future.',
        location: 'Ibadan, Oyo State',
        eventDate: new Date('2026-08-01'),
        eventTime: '09:00 AM',
        category: 'Youth',
        isPublished: true,
        maxAttendees: 1000,
      },
      {
        title: 'Women in Leadership Conference',
        description: 'An engagement with women leaders, market women, professional women associations, and female entrepreneurs across Oyo State.',
        location: 'Ibadan, Oyo State',
        eventDate: new Date('2026-08-20'),
        eventTime: '10:00 AM',
        category: 'Women',
        isPublished: true,
        maxAttendees: 300,
      },
    ];

    await this.eventRepo.save(items);
  }

  private async seedTestimonials() {
    const items: Partial<TestimonialOrmEntity>[] = [
      {
        name: 'Chief Oluwole Adegoke',
        text: 'I have known Bimbo Adekanmbi for over 15 years. He is a man of integrity, discipline, and deep understanding of governance. Oyo State will be in safe hands.',
        focus: 'Community Leader',
        isVerified: true,
        displayOrder: 0,
      },
      {
        name: 'Mrs. Funmilayo Oke',
        text: 'The progress I have seen in Oyo State under Governor Makinde is remarkable. I believe Bimbo Adekanmbi is the right person to continue this good work. My family and I are fully behind him.',
        focus: 'Market Women Association',
        isVerified: true,
        displayOrder: 1,
      },
      {
        name: 'Comrade Yusuf Babatunde',
        text: 'As a youth leader, I appreciate that Adekanmbi has a clear plan for young people. He listens, he understands our challenges, and he has a vision for our future. That is the kind of leader we need.',
        focus: 'Youth Leader',
        isVerified: true,
        displayOrder: 2,
      },
      {
        name: 'High Chief Rasheed Ogunlade',
        text: 'Continuity is important for development. Every time we change direction, we lose momentum. Bimbo Adekanmbi represents the continuity that Oyo State needs to reach its full potential.',
        focus: 'Traditional Council',
        isVerified: true,
        displayOrder: 3,
      },
    ];

    await this.testimonialRepo.save(items);
  }

  private async seedMedia() {
    const items: Partial<MediaAssetOrmEntity>[] = [
      {
        title: 'Continuity with Competence — Campaign Video',
        description: 'The official campaign video introducing Bimbo Adekanmbi and the vision for Oyo State.',
        type: 'video',
        assetUrl: 'https://www.youtube.com/watch?v=NGexChoo52g',
        category: 'Video',
        displayOrder: 0,
      },
      {
        title: 'Bimbo Adekanmbi in Conversation',
        description: 'An exclusive interview discussing the Oyo Next agenda and the path forward.',
        type: 'video',
        assetUrl: 'https://www.youtube.com/watch?v=CQeRLccE4Qg',
        category: 'Video',
        displayOrder: 1,
      },
      {
        title: 'Campaign Rally Highlights',
        description: 'Highlights from the APM campaign rally across Oyo State.',
        type: 'video',
        assetUrl: 'https://www.youtube.com/watch?v=bkVvB-x2ZYE',
        category: 'Video',
        displayOrder: 2,
      },
    ];

    await this.mediaRepo.save(items);
  }
}
