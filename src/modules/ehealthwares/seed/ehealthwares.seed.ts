import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SiteSectionDocument, ProductDocument, ServiceDocument,
  TestimonialDocument, PartnerDocument, TeamMemberDocument,
  SiteSettingDocument, HeroSlideDocument, CategoryDocument,
  ArticleDocument, InvestorDataDocument, CareerDocument,
} from '../schemas';

/**
 * Bump this constant whenever the seed content changes so the backend
 * re-runs the upserts on next start ("update and reseed where necessary").
 */
const SEED_VERSION = 5;

/**
 * eHealthwares brand asset helpers.
 * Product images are context-matched per module (see assets/ in the
 * website repo). Modules without a local asset use Unsplash placeholders
 * that match the industry.
 */
const UNSPLASH = {
  pharmacy:
    'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
  digitalHealth:
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
  researchDna:
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1200&q=80',
  team:
    'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80',
  doctorLaptop:
    'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1200&q=80',
};

const ASSETS = {
  emr: '/assets/pexels-polina-tankilevitch-5234506.jpg',
  emrTablet: '/assets/pexels-tessy-agbonome-521343232-19957218.jpg',
  emrVideo: '/assets/6097001-uhd_2160_3840_24fps.mp4',
  labMicroscope: '/assets/pexels-pavel-danilyuk-8442154.jpg',
  labTechnician: '/assets/pexels-carmel-nsenga-735492-18712504.jpg',
  labAnalysis: '/assets/pexels-kenneth-mulindwa-445017357-15457773.jpg',
  radiologyMri: '/assets/pexels-mart-production-7089614.jpg',
  radiologyXray: '/assets/pexels-tima-miroshnichenko-5452186.jpg',
  radiologyScan: '/assets/pexels-tima-miroshnichenko-6234991.jpg',
  radiologyCt: '/assets/pexels-valery-arispe-2149327983-34170810.jpg',
  radiologyVideo: '/assets/7579839-uhd_2160_4096_25fps.mp4',
  telemedicineConsult: '/assets/pexels-cottonbro-5867190.jpg',
  telemedicineVideoCall: '/assets/pexels-karola-g-7195191.jpg',
  telemedicineVideo: '/assets/8375668-uhd_2160_4096_25fps.mp4',
  trainingDiscussion: '/assets/pexels-gustavo-fring-7446984.jpg',
  trainingMobile: '/assets/pexels-ivan-s-4989164.jpg',
  echoBrainscope: '/assets/pexels-kos-chiropractic-integrative-health-716706805-19034027.jpg',
  echoNeurofeedback: '/assets/pexels-mindfield-biosystems-ltd-564865676-24346267.jpg',
  echoScanner: '/assets/pexels-neuphonyforyou-27260729.jpg',
  echoCardiac: '/assets/pexels-vantik93-12197315.jpg',
  interopNetwork: '/assets/pexels-omar-ashraf-575569521-38246354.jpg',
  interopCables: '/assets/pexels-markus-erichsen-3167926-4779729.jpg',
  interopEcg: '/assets/pexels-daliladalprat-5875565.jpg',
  aiLab: '/assets/pexels-polina-tankilevitch-3735707.jpg',
  researchVideo: '/assets/12645675-uhd_4096_2160_30fps.mp4',
  monitoringEcg: '/assets/pexels-stephentcandrews-9408868.jpg',
};

@Injectable()
export class EhealthwaresSeedService implements OnModuleInit {
  private readonly logger = new Logger(EhealthwaresSeedService.name);

  constructor(
    @InjectModel('SiteSection') private readonly sectionModel: Model<SiteSectionDocument>,
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
    @InjectModel('Service') private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel('Testimonial') private readonly testimonialModel: Model<TestimonialDocument>,
    @InjectModel('Partner') private readonly partnerModel: Model<PartnerDocument>,
    @InjectModel('TeamMember') private readonly teamModel: Model<TeamMemberDocument>,
    @InjectModel('SiteSetting') private readonly settingModel: Model<SiteSettingDocument>,
    @InjectModel('HeroSlide') private readonly heroSlideModel: Model<HeroSlideDocument>,
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Article') private readonly articleModel: Model<ArticleDocument>,
    @InjectModel('InvestorData') private readonly investorModel: Model<InvestorDataDocument>,
    @InjectModel('Career') private readonly careerModel: Model<CareerDocument>,
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    // Version gate: only re-seed when the seed content has changed. Each run
    // upserts by unique key, so updated content propagates without clobbering
    // admin edits on every restart.
    const versionSetting = await this.settingModel
      .findOne({ key: 'ehealthwares_seed_version' })
      .exec();
    const currentVersion = versionSetting ? Number(versionSetting.value) || 0 : 0;

    if (currentVersion >= SEED_VERSION) {
      this.logger.log(`eHealthwares seed up to date (v${currentVersion}), skipping`);
      return;
    }

    this.logger.log(`Seeding eHealthwares website data (v${SEED_VERSION})...`);

    const steps: any[] = [
      this.seedSections, this.seedProducts, this.seedServices,
      this.seedTestimonials, this.seedPartners, this.seedTeam, this.seedSettings,
      this.seedHeroSlides, this.seedCategories, this.seedArticles,
      this.seedInvestorData, this.seedCareers,
    ];
    for (const step of steps) {
      try {
        await step.call(this);
      } catch (err: any) {
        this.logger.error(`Seed step failed: ${err && err.message ? err.message : err}`);
      }
    }

    await this.settingModel.updateOne(
      { key: 'ehealthwares_seed_version' },
      { $set: { value: String(SEED_VERSION) } },
      { upsert: true },
    );

    this.logger.log('eHealthwares website data seeding completed.');
  }

  /** Upsert a list of documents by a unique key field (slug/name/key/etc). */
  private async upsertMany(
    model: Model<any>,
    keyField: string,
    docs: any[],
    filterExtra: Record<string, unknown> = {},
  ): Promise<void> {
    for (const doc of docs) {
      const key = doc[keyField];
      await model.updateOne(
        { [keyField]: key, ...filterExtra },
        { $set: doc },
        { upsert: true },
      );
    }
  }

  /**
   * Upsert canonical documents, delete any legacy records that are not part
   * of the canonical set, and deduplicate records sharing a canonical key.
   * Keeps collections aligned with the seed content.
   */
  private async seedCanonical(
    model: Model<any>,
    keyField: string,
    docs: any[],
    filterExtra: Record<string, unknown> = {},
  ): Promise<void> {
    await this.upsertMany(model, keyField, docs, filterExtra);
    const keys = docs.map((d) => d[keyField]);
    // Remove records that are not part of the canonical set.
    await model.deleteMany({ [keyField]: { $nin: keys }, ...filterExtra }).exec();
    // Deduplicate: keep a single (oldest) record per canonical key.
    for (const key of keys) {
      const existing = await model.find({ [keyField]: key, ...filterExtra }).sort({ _id: 1 }).exec();
      if (existing.length > 1) {
        const keepId = existing[0]._id;
        await model.deleteMany({ [keyField]: key, ...filterExtra, _id: { $ne: keepId } }).exec();
      }
    }
  }

  private async seedSections() {
    const sections = [
      {
        key: 'hero',
        title: 'Building Connected Healthcare Technology Ecosystems',
        subtitle: 'eHealthwares helps healthcare organizations transform operations through enterprise software solutions, healthcare interoperability, intelligent automation, and specialized platforms such as PrognoCare EMR and RxSoft Pharmacy Management System.',
        content: null,
        displayOrder: 0,
        isActive: true,
      },
      {
        key: 'about',
        title: 'Transforming Healthcare Through Technology',
        subtitle: null,
        content: '<p>eHealthwares designs and delivers enterprise healthcare technology solutions that connect patients, healthcare providers, clinical teams, and operational systems through integrated digital platforms.</p><p>We help healthcare organizations transform care delivery by combining healthcare software engineering, interoperability, workflow automation, communication platforms, and intelligent data solutions.</p>',
        displayOrder: 1,
        isActive: true,
      },
      {
        key: 'stats',
        title: null,
        subtitle: null,
        content: null,
        displayOrder: 2,
        isActive: true,
      },
      {
        key: 'cta',
        title: 'Ready to Transform Your Healthcare Operations?',
        subtitle: "Let's discuss how eHealthwares can help your organization deliver better care through technology.",
        content: null,
        displayOrder: 10,
        isActive: true,
      },
    ];
    await this.upsertMany(this.sectionModel, 'key', sections);
    this.logger.log('Seeded site sections');
  }

  private async seedProducts() {
    const products = [
      {
        slug: 'rxsoft-pharmacy',
        name: 'RxSoft Pharmacy Management System',
        tagline: 'Enterprise pharmacy platform digitizing pharmacy operations',
        description: '<p>RxSoft is an enterprise pharmacy management platform designed to digitize and optimize pharmacy operations, from prescription processing and inventory management to dispensing, sales, and analytics.</p><p>RxSoft enables pharmacies, hospitals, and healthcare organizations to manage medication workflows efficiently while integrating with broader healthcare ecosystems.</p>',
        features: [
          'Prescription processing and validation',
          'Medication dispensing workflows',
          'Drug interaction support',
          'Patient medication history',
          'Stock management with batch and expiry tracking',
          'Supplier and purchase order management',
          'Multi-location inventory management',
          'Pharmacy POS with invoice generation',
          'Sales reporting and analytics',
          'Role-based access control and audit trails',
        ],
        iconName: 'Pill',
        imageUrl: UNSPLASH.pharmacy,
        displayOrder: 0,
        isActive: true,
        metaTitle: 'RxSoft Pharmacy Management System | eHealthwares',
        metaDescription: 'Enterprise pharmacy management platform for prescription processing, inventory management, dispensing, and analytics.',
      },
      {
        slug: 'emr',
        name: 'PrognoCare EMR — Electronic Medical Records',
        tagline: 'A unified electronic medical record for hospitals and clinics',
        description: '<p>PrognoCare EMR brings patient records, clinical documentation, appointments, e-prescriptions, laboratory and radiology results, and billing into one secure platform — built for modern healthcare providers.</p><p>Designed for meaningful use of data, streamlined clinical workflows, connected care teams, and better patient outcomes, it works on desktop, tablet, and mobile, with HL7 and FHIR interoperability built in.</p>',
        features: [
          'Patient records and clinical charting',
          'Clinical documentation (SOAP & progress notes)',
          'Appointment scheduling and reminders',
          'e-Prescriptions and formulary support',
          'Laboratory and radiology workflow integration',
          'Billing and invoicing',
          'Role-based access control and audit logs',
          'HL7 / FHIR interoperability',
          'Multi-facility management',
          'Analytics and reporting',
        ],
        iconName: 'Heartbeat',
        imageUrl: ASSETS.emr,
        displayOrder: 1,
        isActive: true,
        metaTitle: 'PrognoCare EMR — Electronic Medical Records Platform | eHealthwares',
        metaDescription: 'A secure electronic medical records platform for hospitals and clinics — patient records, clinical documentation, e-prescriptions, lab & radiology integration, HL7/FHIR interoperability, and billing.',
      },
      {
        slug: 'lis',
        name: 'Laboratory Information System (LIS)',
        tagline: 'Comprehensive laboratory workflow automation',
        description: '<p>Streamline laboratory operations from order entry to result delivery. Our LIS solution automates workflows, manages samples, and integrates seamlessly with EMR systems.</p>',
        features: [
          'Laboratory workflow automation',
          'Order management',
          'Sample tracking and management',
          'Result management and validation',
          'EMR connectivity',
          'Quality control support',
        ],
        iconName: 'Microscope',
        imageUrl: ASSETS.labMicroscope,
        displayOrder: 2,
        isActive: true,
        metaTitle: 'Laboratory Information System | eHealthwares',
        metaDescription: 'Comprehensive LIS solution for laboratory workflow automation, sample tracking, and EMR integration.',
      },
      {
        slug: 'ris',
        name: 'Radiology Information System (RIS)',
        tagline: 'Advanced radiology workflow and imaging management',
        description: '<p>Optimize radiology departments with comprehensive workflow management, modality integration, and PACS connectivity.</p>',
        features: [
          'Radiology workflow management',
          'Imaging order workflows',
          'Modality worklist integration',
          'PACS connectivity',
          'DICOM interoperability',
          'Radiology reporting and result delivery',
        ],
        iconName: 'Scan',
        imageUrl: ASSETS.radiologyMri,
        displayOrder: 3,
        isActive: true,
        metaTitle: 'Radiology Information System | eHealthwares',
        metaDescription: 'RIS solution for radiology workflow management, PACS connectivity, and DICOM interoperability.',
      },
      {
        slug: 'healthcare-interoperability',
        name: 'Healthcare Interoperability — Exchange Gateway',
        tagline: 'Connect systems across your healthcare organization',
        description: '<p>Our interoperability solutions enable seamless data exchange between healthcare systems, supporting HL7, FHIR, and DICOM standards. Connect labs, pharmacies, radiology, and EMR platforms into one connected ecosystem.</p>',
        features: [
          'HL7 messaging and integration',
          'FHIR API development',
          'DICOM standards support',
          'EMR integration',
          'Laboratory and radiology integration',
          'Event notification and healthcare data exchange',
        ],
        iconName: 'Share2',
        imageUrl: ASSETS.interopNetwork,
        displayOrder: 4,
        isActive: true,
        metaTitle: 'Healthcare Interoperability Solutions | eHealthwares',
        metaDescription: 'Connect healthcare systems with HL7, FHIR, and DICOM interoperability solutions — the Exchange Gateway.',
      },
      {
        slug: 'ai-automation',
        name: 'Myaia — Healthcare AI & Automation',
        tagline: 'Intelligent automation for healthcare workflows',
        description: '<p>Myaia is an AI-powered healthcare assistant that transforms clinical and patient information into intelligent insights, personalized guidance, and more connected care experiences.</p><p>Leverage AI to automate healthcare workflows, engage patients, and derive clinical insights from your data.</p>',
        features: [
          'Conversational healthcare assistants',
          'Patient engagement automation',
          'Workflow automation',
          'Smart routing of healthcare requests',
          'AI-assisted healthcare operations',
          'Clinical intelligence',
        ],
        iconName: 'Bot',
        imageUrl: ASSETS.aiLab,
        displayOrder: 5,
        isActive: true,
        metaTitle: 'Myaia — Healthcare AI & Automation | eHealthwares',
        metaDescription: 'AI-powered healthcare automation solutions for patient engagement, workflow optimization, and clinical intelligence.',
      },
      {
        slug: 'telemedicine',
        name: 'Telemedicine Solutions',
        tagline: 'Virtual care platform connecting patients and providers',
        description: '<p>Our telemedicine platform enables healthcare providers to deliver virtual consultations, remote patient monitoring, and digital health services with secure video conferencing, integrated scheduling, and EHR connectivity.</p>',
        features: [
          'Secure video consultations',
          'Remote patient monitoring',
          'Integrated scheduling and reminders',
          'EHR and practice management integration',
          'Patient portal and messaging',
          'Multi-provider support',
        ],
        iconName: 'Video',
        imageUrl: ASSETS.telemedicineConsult,
        displayOrder: 6,
        isActive: true,
        metaTitle: 'Telemedicine Solutions | eHealthwares',
        metaDescription: 'Virtual care platform for telemedicine, remote patient monitoring, and digital health services.',
      },
      {
        slug: 'medtrain',
        name: 'MedTrain — Healthcare Training',
        tagline: 'Practical training for healthcare professionals and students',
        description: '<p>MedTrain delivers practical training for students, schools, and healthcare teams across every health profession — remotely or onsite — to build skills, confidence, and workplace readiness.</p>',
        features: [
          'Remote and onsite training delivery',
          'Clinical skills and simulation workshops',
          'Health profession curricula',
          'Student and school programs',
          'Workforce upskilling and certification support',
          'Assessment and outcome tracking',
        ],
        iconName: 'School',
        imageUrl: ASSETS.trainingDiscussion,
        displayOrder: 7,
        isActive: true,
        metaTitle: 'MedTrain — Healthcare Training | eHealthwares',
        metaDescription: 'Practical healthcare training for students, schools, and healthcare teams — remotely or onsite.',
      },
      {
        slug: 'echo',
        name: 'Echo — Specialized Diagnostics',
        tagline: 'Advanced diagnostic platforms for specialized care',
        description: '<p>Echo supports specialized diagnostic workflows — echocardiography, neuro-diagnostics, and advanced imaging — from acquisition and review to structured reporting and EMR integration.</p>',
        features: [
          'Echocardiography workflow support',
          'Neuro-diagnostic data capture',
          'Structured reporting',
          'Image and waveform management',
          'Referral and requisition workflows',
          'EMR integration',
        ],
        iconName: 'Activity',
        imageUrl: ASSETS.echoBrainscope,
        displayOrder: 8,
        isActive: true,
        metaTitle: 'Echo — Specialized Diagnostics | eHealthwares',
        metaDescription: 'Specialized diagnostic technology platforms supporting echocardiography, neuro-diagnostics, and advanced imaging workflows.',
      },
      {
        slug: 'research',
        name: 'Research & Innovation',
        tagline: 'Emerging healthcare technology research and innovation',
        description: '<p>eHealthwares explores emerging technologies shaping the future of healthcare — AI-assisted workflows, biomedical data analysis, smart devices, and next-generation care delivery.</p>',
        features: [
          'AI in healthcare research',
          'Biomedical data analysis',
          'Emerging technology evaluation',
          'Clinical informatics',
          'AI for biology and medicine',
          'Smart device and wearable research',
        ],
        iconName: 'Flask',
        imageUrl: UNSPLASH.researchDna,
        displayOrder: 9,
        isActive: true,
        metaTitle: 'Research & Innovation | eHealthwares',
        metaDescription: 'Emerging healthcare technology research — AI in healthcare, biomedical data, smart devices, and future care delivery.',
      },
      {
        slug: 'monitoring',
        name: 'Patient Monitoring & Smart Devices',
        tagline: 'Vital signs, remote monitoring, and connected devices',
        description: '<p>Healthcare equipment and smart-device solutions supporting patient monitoring, vital signs, wearable technology, and connected health — from procurement to installation and support.</p>',
        features: [
          'Patient monitoring systems',
          'Vital signs monitoring',
          'Wearable and remote monitoring devices',
          'Medical device procurement and sourcing',
          'Installation and maintenance coordination',
          'Monitoring data integration',
        ],
        iconName: 'Heartbeat',
        imageUrl: ASSETS.monitoringEcg,
        displayOrder: 10,
        isActive: true,
        metaTitle: 'Patient Monitoring & Smart Devices | eHealthwares',
        metaDescription: 'Patient monitoring systems, wearable technology, and connected medical devices for continuous care.',
      },
    ];
    await this.upsertMany(this.productModel, 'slug', products);
    this.logger.log('Seeded products');
  }

  private async seedServices() {
    const services = [
      {
        slug: 'digital-transformation',
        name: 'Healthcare Digital Transformation',
        tagline: 'Strategic technology modernization for healthcare',
        description: '<p>We help healthcare organizations develop and execute digital transformation strategies that modernize operations, improve patient outcomes, and reduce costs.</p>',
        iconName: 'ArrowBigRightDash',
        displayOrder: 0,
        isActive: true,
      },
      {
        slug: 'enterprise-architecture',
        name: 'Enterprise Architecture',
        tagline: 'Scalable healthcare system design',
        description: '<p>Our architects design robust, scalable healthcare systems covering solution architecture, cloud infrastructure, data architecture, and integration patterns.</p>',
        iconName: 'Building2',
        displayOrder: 1,
        isActive: true,
      },
      {
        slug: 'custom-software-development',
        name: 'Custom Healthcare Software',
        tagline: 'Tailored software solutions for healthcare',
        description: '<p>From web and mobile applications to enterprise platforms and APIs, we build custom healthcare software that meets your specific needs.</p>',
        iconName: 'Code2',
        displayOrder: 2,
        isActive: true,
      },
      {
        slug: 'healthcare-integration',
        name: 'Healthcare Integration Services',
        tagline: 'Seamless system connectivity',
        description: '<p>Connect your EMR, pharmacy, laboratory, and radiology systems with our comprehensive integration services.</p>',
        iconName: 'Link2',
        displayOrder: 3,
        isActive: true,
      },
    ];
    await this.upsertMany(this.serviceModel, 'slug', services);
    this.logger.log('Seeded services');
  }

  private async seedTestimonials() {
    const testimonials = [
      {
        name: 'Dr. Adebayo Ogunlesi',
        role: 'Chief Medical Officer',
        company: 'Lagos University Teaching Hospital',
        text: 'eHealthwares transformed our pharmacy operations. The RxSoft platform streamlined our prescription processing and inventory management, reducing wait times by 40%.',
        displayOrder: 0,
        isActive: true,
      },
      {
        name: 'Mrs. Folake Adeyemi',
        role: 'Director of Health Informatics',
        company: 'HealthStack EMR',
        text: 'Working with eHealthwares on interoperability has been exceptional. Their expertise in HL7 and FHIR integration made connecting our platforms seamless.',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Dr. Chinedu Okonkwo',
        role: 'Hospital Administrator',
        company: 'Springfield Medical Centre',
        text: 'The team at eHealthwares delivered a laboratory information system that perfectly matches our workflow. Implementation was smooth and the support has been outstanding.',
        displayOrder: 2,
        isActive: true,
      },
    ];
    await this.seedCanonical(this.testimonialModel, 'name', testimonials);
    this.logger.log('Seeded testimonials');
  }

  private async seedPartners() {
    const partners = [
      {
        name: 'HealthStack EMR',
        logoUrl: null,
        websiteUrl: null,
        displayOrder: 0,
      },
    ];
    await this.seedCanonical(this.partnerModel, 'name', partners);
    this.logger.log('Seeded partners');
  }

  private async seedTeam() {
    const team = [
      { name: 'John Alade', role: 'Chief Executive Officer', bio: 'Visionary leader with 14+ years in healthcare technology.', displayOrder: 0 },
      { name: 'Jane Smith', role: 'Chief Technology Officer', bio: 'Expert in healthcare systems architecture and interoperability.', displayOrder: 1 },
      { name: 'Dr. Michael Ade', role: 'VP of Healthcare Solutions', bio: 'Physician and technologist bridging clinical and digital domains.', displayOrder: 2 },
    ];
    await this.seedCanonical(this.teamModel, 'name', team);
    this.logger.log('Seeded team members');
  }

  private async seedSettings() {
    const settings = [
      { key: 'brand_name', value: 'eHealthwares' },
      { key: 'brand_tagline', value: 'Building Connected Healthcare Technology Ecosystems' },
      { key: 'contact_email', value: 'info@ehealthwares.com' },
      { key: 'contact_phone', value: '+234-80-2222-4166' },
      { key: 'seo_title', value: 'eHealthwares — Healthcare Technology Solutions' },
      { key: 'seo_description', value: 'eHealthwares designs and delivers enterprise healthcare technology solutions connecting patients, providers, and systems and communities.' },
    ];
    await this.upsertMany(this.settingModel, 'key', settings);
    this.logger.log('Seeded site settings');
  }

  private async seedHeroSlides() {
    const slides = [
      {
        title: 'Building Connected Healthcare Technology Ecosystems',
        subtitle: 'eHealthwares helps healthcare organizations transform operations through enterprise software solutions, intelligent workflow automation and healthcare interoperability.',
        mediaUrl: ASSETS.emrVideo,
        mediaType: 'video',
        ctaText: 'Explore Solutions',
        ctaLink: '/products-services',
        displayOrder: 1,
        isActive: true,
      },
      {
        title: 'MedTrain: Empowering Healthcare Professionals',
        subtitle: 'Practical training for students, schools, and healthcare teams across every health profession, delivered remotely or onsite to build skills, confidence, and workplace readiness.',
        mediaUrl: ASSETS.trainingDiscussion,
        mediaType: 'image',
        ctaText: 'Our Trainings',
        ctaLink: '/products/medtrain',
        displayOrder: 2,
        isActive: true,
      },
      {
        title: 'PrognoCare EMR: Empowering Better Care',
        subtitle: 'A unified electronic medical record solution designed for meaningful use of data, streamlined clinical workflows, connected care teams, and better patient outcomes.',
        mediaUrl: ASSETS.emr,
        mediaType: 'image',
        ctaText: 'Our EMR',
        ctaLink: '/products/emr',
        displayOrder: 3,
        isActive: true,
      },
      {
        title: 'Seamless Healthcare Interoperability',
        subtitle: 'Connection and event notification between systems with HL7, FHIR, and DICOM data formats. Exchange data across your different platforms and organization.',
        mediaUrl: ASSETS.interopNetwork,
        mediaType: 'image',
        ctaText: 'Our Exchange Gateway',
        ctaLink: '/products/healthcare-interoperability',
        displayOrder: 4,
        isActive: true,
      },
      {
        title: 'Myaia: Intelligent Healthcare, Reimagined',
        subtitle: 'An AI-powered healthcare assistant that transforms clinical and patient information into intelligent insights, personalized guidance, and more connected care experiences.',
        mediaUrl: ASSETS.researchVideo,
        mediaType: 'video',
        ctaText: 'Our AI Bot',
        ctaLink: '/products/ai-automation',
        displayOrder: 5,
        isActive: true,
      },
      {
        title: 'Telemedicine: Care Without Distance',
        subtitle: 'Secure video consultations, remote patient monitoring, and digital health services connecting patients and providers from anywhere.',
        mediaUrl: ASSETS.telemedicineVideo,
        mediaType: 'video',
        ctaText: 'Our Telemedicine',
        ctaLink: '/products/telemedicine',
        displayOrder: 6,
        isActive: true,
      },
    ];

    // Upsert the canonical slides by displayOrder, then drop stale/duplicate ones.
    await this.upsertMany(this.heroSlideModel, 'displayOrder', slides);
    await this.heroSlideModel.deleteMany({ displayOrder: { $nin: [1, 2, 3, 4, 5, 6] } }).exec();
    this.logger.log('Seeded hero slides');
  }

  private async seedCategories() {
    const categories = [
      {
        name: 'Pharmacy Management',
        slug: 'rxsoft-pharmacy',
        description: 'End-to-end pharmacy management for prescription processing, inventory, and dispensing.',
        iconUrl: null,
        imageUrl: UNSPLASH.pharmacy,
        displayOrder: 0,
        isActive: true,
      },
      {
        name: 'Laboratory Systems',
        slug: 'lis',
        description: 'Comprehensive lab information systems for workflow automation and result management.',
        iconUrl: null,
        imageUrl: ASSETS.labTechnician,
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Radiology & Imaging',
        slug: 'ris',
        description: 'Advanced radiology information systems with PACS connectivity and DICOM support.',
        iconUrl: null,
        imageUrl: ASSETS.radiologyXray,
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Interoperability',
        slug: 'healthcare-interoperability',
        description: 'Seamless data exchange across healthcare systems with HL7, FHIR, and custom integrations.',
        iconUrl: null,
        imageUrl: ASSETS.interopNetwork,
        displayOrder: 3,
        isActive: true,
      },
      {
        name: 'Electronic Medical Records',
        slug: 'emr',
        description: 'PrognoCare EMR — unified patient records, clinical documentation, and e-prescriptions.',
        iconUrl: null,
        imageUrl: ASSETS.emrTablet,
        displayOrder: 4,
        isActive: true,
      },
      {
        name: 'Telemedicine & Virtual Care',
        slug: 'telemedicine',
        description: 'Secure video consultations, remote monitoring, and patient engagement tools.',
        iconUrl: null,
        imageUrl: ASSETS.telemedicineVideoCall,
        displayOrder: 5,
        isActive: true,
      },
    ];
    await this.upsertMany(this.categoryModel, 'slug', categories);
    // Remove legacy categories whose slugs no longer map to a product page.
    await this.categoryModel
      .deleteMany({ slug: { $nin: categories.map((c) => c.slug) } })
      .exec();
    this.logger.log('Seeded categories');
  }

  private async seedArticles() {
    const articles = [
      {
        title: 'The Future of Pharmacy Management: Digital Transformation in 2026',
        slug: 'future-of-pharmacy-management-2026',
        excerpt: 'Explore how digital transformation is reshaping pharmacy operations, from automated dispensing to AI-powered inventory management.',
        body: '<p>Pharmacy management is undergoing a digital revolution...</p>',
        imageUrl: UNSPLASH.pharmacy,
        category: 'Pharmacy',
        publishedAt: new Date('2026-06-15'),
        isActive: true,
      },
      {
        title: 'HL7 vs FHIR: Choosing the Right Interoperability Standard',
        slug: 'hl7-vs-fhir-interoperability-standards',
        excerpt: 'A comprehensive comparison of HL7 and FHIR standards to help healthcare organizations choose the right integration approach.',
        body: '<p>Healthcare interoperability standards continue to evolve...</p>',
        imageUrl: ASSETS.interopNetwork,
        category: 'Interoperability',
        publishedAt: new Date('2026-05-20'),
        isActive: true,
      },
      {
        title: 'How LIS Integration Improves Laboratory Efficiency by 40%',
        slug: 'lis-integration-laboratory-efficiency',
        excerpt: 'Discover how modern Laboratory Information Systems with seamless integration capabilities are transforming lab operations.',
        body: '<p>Laboratory efficiency is critical for patient care...</p>',
        imageUrl: ASSETS.labAnalysis,
        category: 'Laboratory',
        publishedAt: new Date('2026-04-10'),
        isActive: true,
      },
      {
        title: 'AI in Healthcare: Beyond the Hype — Real Use Cases in 2026',
        slug: 'ai-healthcare-real-use-cases-2026',
        excerpt: 'From conversational assistants to clinical intelligence, explore the practical AI applications transforming healthcare today.',
        body: '<p>Artificial intelligence in healthcare has moved beyond experimentation...</p>',
        imageUrl: UNSPLASH.digitalHealth,
        category: 'AI & Automation',
        publishedAt: new Date('2026-03-05'),
        isActive: true,
      },
      {
        title: 'Building a Digital Health Strategy: A Framework for Providers',
        slug: 'digital-health-strategy-framework',
        excerpt: 'A practical framework for healthcare providers developing their digital health strategy and technology roadmap.',
        body: '<p>Developing a digital health strategy requires careful planning...</p>',
        imageUrl: ASSETS.trainingMobile,
        category: 'Strategy',
        publishedAt: new Date('2026-02-18'),
        isActive: true,
      },
    ];
    await this.upsertMany(this.articleModel, 'slug', articles);
    this.logger.log('Seeded articles');
  }

  private async seedInvestorData() {
    const data = [
      {
        label: 'Markets Served',
        value: '12+',
        description: 'Countries across Africa with active deployments',
        displayOrder: 0,
        isActive: true,
      },
      {
        label: 'Facilities Empowered',
        value: '500+',
        description: 'Healthcare organizations using our platforms',
        displayOrder: 1,
        isActive: true,
      },
      {
        label: 'Annual Platform Uptime',
        value: '99.97%',
        description: 'Enterprise-grade reliability and availability',
        displayOrder: 2,
        isActive: true,
      },
      {
        label: 'Integrations Delivered',
        value: '200+',
        description: 'HL7, FHIR, DICOM, and custom system connections',
        displayOrder: 3,
        isActive: true,
      },
      {
        label: 'Year-over-Year Growth',
        value: '85%',
        description: 'Sustained revenue growth for the past 3 fiscal years',
        displayOrder: 4,
        isActive: true,
      },
    ];
    await this.upsertMany(this.investorModel, 'label', data);
    this.logger.log('Seeded investor data');
  }

  private async seedCareers() {
    const careers = [
      {
        title: 'Senior Software Engineer — Healthcare',
        slug: 'senior-software-engineer',
        location: 'Lagos, Nigeria (Hybrid)',
        type: 'full-time',
        department: 'Engineering',
        description: 'Build and maintain healthcare technology platforms including pharmacy, laboratory, and radiology systems. Work with NestJS, React, PostgreSQL, and MongoDB.',
        imageUrl: UNSPLASH.team,
        isActive: true,
      },
      {
        title: 'Healthcare Integration Specialist',
        slug: 'healthcare-integration-specialist',
        location: 'Remote (Africa)',
        type: 'remote',
        department: 'Professional Services',
        description: 'Lead HL7, FHIR, and DICOM integration projects for healthcare organizations. Design and implement data exchange workflows.',
        imageUrl: ASSETS.interopCables,
        isActive: true,
      },
      {
        title: 'Product Manager — Interoperability Platform',
        slug: 'product-manager-interoperability',
        location: 'Lagos, Nigeria',
        type: 'full-time',
        department: 'Product',
        description: 'Define and execute the product roadmap for our healthcare interoperability platform. Work with engineering, sales, and customer teams.',
        imageUrl: UNSPLASH.doctorLaptop,
        isActive: true,
      },
    ];
    await this.upsertMany(this.careerModel, 'slug', careers);
    this.logger.log('Seeded careers');
  }
}
