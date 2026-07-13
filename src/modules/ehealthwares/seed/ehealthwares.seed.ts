import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SiteSectionDocument, ProductDocument, ServiceDocument,
  TestimonialDocument, PartnerDocument, TeamMemberDocument,
  SiteSettingDocument, HeroSlideDocument, CategoryDocument,
  ArticleDocument, InvestorDataDocument, CareerDocument,
} from '../schemas';

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
    this.logger.log('Seeding eHealthwares website data...');

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

    this.logger.log('eHealthwares website data seeding attempted (some steps may have been skipped).');
  }

  private async seedSections() {
    if (await this.sectionModel.countDocuments().exec()) { this.logger.log('Sections already seeded, skipping'); return; }
    const sections = [
      {
        key: 'hero',
        title: 'Building Connected Healthcare Technology Ecosystems',
        subtitle: 'eHealthwares helps healthcare organizations transform operations through enterprise software solutions, healthcare interoperability, intelligent automation, and specialized platforms such as RxSoft Pharmacy Management System.',
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
    await this.sectionModel.insertMany(sections);
    this.logger.log('Seeded site sections');
  }

  private async seedProducts() {
    if (await this.productModel.countDocuments().exec()) { this.logger.log('Products already seeded, skipping'); return; }
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
        displayOrder: 0,
        isActive: true,
        metaTitle: 'RxSoft Pharmacy Management System | eHealthwares',
        metaDescription: 'Enterprise pharmacy management platform for prescription processing, inventory management, dispensing, and analytics.',
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
        displayOrder: 1,
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
        displayOrder: 2,
        isActive: true,
        metaTitle: 'Radiology Information System | eHealthwares',
        metaDescription: 'RIS solution for radiology workflow management, PACS connectivity, and DICOM interoperability.',
      },
      {
        slug: 'healthcare-interoperability',
        name: 'Healthcare Interoperability',
        tagline: 'Connect systems across your healthcare organization',
        description: '<p>Our interoperability solutions enable seamless data exchange between healthcare systems, supporting HL7, FHIR, and DICOM standards.</p>',
        features: [
          'HL7 messaging and integration',
          'FHIR API development',
          'DICOM standards support',
          'EMR integration',
          'Laboratory and radiology integration',
          'Healthcare data exchange',
        ],
        iconName: 'Share2',
        displayOrder: 3,
        isActive: true,
        metaTitle: 'Healthcare Interoperability Solutions | eHealthwares',
        metaDescription: 'Connect healthcare systems with HL7, FHIR, and DICOM interoperability solutions.',
      },
      {
        slug: 'ai-automation',
        name: 'Healthcare AI & Automation',
        tagline: 'Intelligent automation for healthcare workflows',
        description: '<p>Leverage AI to automate healthcare workflows, engage patients, and derive clinical insights from your data.</p>',
        features: [
          'Conversational healthcare assistants',
          'Patient engagement automation',
          'Workflow automation',
          'Smart routing of healthcare requests',
          'AI-assisted healthcare operations',
          'Clinical intelligence',
        ],
        iconName: 'Bot',
        displayOrder: 4,
        isActive: true,
        metaTitle: 'Healthcare AI & Automation | eHealthwares',
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
        displayOrder: 5,
        isActive: true,
        metaTitle: 'Telemedicine Solutions | eHealthwares',
        metaDescription: 'Virtual care platform for telemedicine, remote patient monitoring, and digital health services.',
      },
    ];
    await this.productModel.insertMany(products);
    this.logger.log('Seeded products');
  }

  private async seedServices() {
    if (await this.serviceModel.countDocuments().exec()) { this.logger.log('Services already seeded, skipping'); return; }
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
    await this.serviceModel.insertMany(services);
    this.logger.log('Seeded services');
  }

  private async seedTestimonials() {
    if (await this.testimonialModel.countDocuments().exec()) { this.logger.log('Testimonials already seeded, skipping'); return; }
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
    await this.testimonialModel.insertMany(testimonials);
    this.logger.log('Seeded testimonials');
  }

  private async seedPartners() {
    if (await this.partnerModel.countDocuments().exec()) { this.logger.log('Partners already seeded, skipping'); return; }
    const partners = [
      {
        name: 'HealthStack EMR',
        logoUrl: null,
        websiteUrl: null,
        displayOrder: 0,
      },
    ];
    await this.partnerModel.insertMany(partners);
    this.logger.log('Seeded partners');
  }

  private async seedTeam() {
    if (await this.teamModel.countDocuments().exec()) { this.logger.log('Team already seeded, skipping'); return; }
    const team = [
      { name: 'John Doe', role: 'Chief Executive Officer', bio: 'Visionary leader with 20+ years in healthcare technology.', displayOrder: 0 },
      { name: 'Jane Smith', role: 'Chief Technology Officer', bio: 'Expert in healthcare systems architecture and interoperability.', displayOrder: 1 },
      { name: 'Dr. Michael Ade', role: 'VP of Healthcare Solutions', bio: 'Physician and technologist bridging clinical and digital domains.', displayOrder: 2 },
    ];
    await this.teamModel.insertMany(team);
    this.logger.log('Seeded team members');
  }

  private async seedSettings() {
    if (await this.settingModel.countDocuments().exec()) { this.logger.log('Settings already seeded, skipping'); return; }
    const settings = [
      { key: 'brand_name', value: 'eHealthwares' },
      { key: 'brand_tagline', value: 'Building Connected Healthcare Technology Ecosystems' },
      { key: 'contact_email', value: 'info@ehealthwares.com' },
      { key: 'contact_phone', value: '+234-800-HEALTH' },
      { key: 'seo_title', value: 'eHealthwares — Healthcare Technology Solutions' },
      { key: 'seo_description', value: 'eHealthwares designs and delivers enterprise healthcare technology solutions connecting patients, providers, and systems.' },
    ];
    await this.settingModel.insertMany(settings);
    this.logger.log('Seeded site settings');
  }

  private async seedHeroSlides() {
    if (await this.heroSlideModel.countDocuments().exec()) { this.logger.log('HeroSlides already seeded, skipping'); return; }
    const slides = [
      {
        title: 'Building Connected Healthcare Technology Ecosystems',
        subtitle: 'eHealthwares helps healthcare organizations transform operations through enterprise software solutions, healthcare interoperability, and intelligent automation.',
        mediaUrl: '/assets/pexels-shvetsa-4225925.jpg',
        mediaType: 'image',
        ctaText: 'Explore Products',
        ctaLink: '/products/rxsoft-pharmacy',
        displayOrder: 0,
        isActive: true,
      },
      {
        title: 'Enterprise Software for Modern Healthcare',
        subtitle: 'RxSoft Pharmacy, Laboratory Information System, and Radiology Information System — purpose-built for healthcare organizations.',
        mediaUrl: '/assets/pexels-mart-production-7089011.jpg',
        mediaType: 'image',
        ctaText: 'View Solutions',
        ctaLink: '/products/rxsoft-pharmacy',
        displayOrder: 1,
        isActive: true,
      },
      {
        title: 'Seamless Healthcare Interoperability',
        subtitle: 'Connect your systems with HL7, FHIR, and DICOM standards. Break down data silos across your healthcare organization.',
        mediaUrl: '/assets/pexels-tima-miroshnichenko-6234976.jpg',
        mediaType: 'image',
        ctaText: 'Learn More',
        ctaLink: '/products/healthcare-interoperability',
        displayOrder: 2,
        isActive: true,
      },
      {
        title: 'Innovating Healthcare Through Technology',
        subtitle: 'AI-powered automation, patient engagement platforms, and intelligent workflow solutions for the future of care.',
        mediaUrl: '/assets/8375668-uhd_2160_4096_25fps.mp4',
        mediaType: 'video',
        ctaText: 'Contact Sales',
        ctaLink: '/contact',
        displayOrder: 3,
        isActive: true,
      },
    ];
    await this.heroSlideModel.insertMany(slides);
    this.logger.log('Seeded hero slides');
  }

  private async seedCategories() {
    if (await this.categoryModel.countDocuments().exec()) { this.logger.log('Categories already seeded, skipping'); return; }
    const categories = [
      {
        name: 'Pharmacy Management',
        slug: 'pharmacy',
        description: 'End-to-end pharmacy management platform for prescription processing, inventory, and dispensing.',
        iconUrl: null,
        imageUrl: '/assets/pexels-shvetsa-4225925.jpg',
        displayOrder: 0,
        isActive: true,
      },
      {
        name: 'Laboratory Systems',
        slug: 'laboratory',
        description: 'Comprehensive lab information systems for workflow automation and result management.',
        iconUrl: null,
        imageUrl: '/assets/pexels-mart-production-7089011.jpg',
        displayOrder: 1,
        isActive: true,
      },
      {
        name: 'Radiology & Imaging',
        slug: 'radiology',
        description: 'Advanced radiology information systems with PACS connectivity and DICOM support.',
        iconUrl: null,
        imageUrl: '/assets/pexels-tima-miroshnichenko-6234976.jpg',
        displayOrder: 2,
        isActive: true,
      },
      {
        name: 'Interoperability',
        slug: 'interoperability',
        description: 'Seamless data exchange across healthcare systems with HL7, FHIR, and custom integrations.',
        iconUrl: null,
        imageUrl: '/assets/pexels-daliladalprat-5875565.jpg',
        displayOrder: 3,
        isActive: true,
      },
    ];
    await this.categoryModel.insertMany(categories);
    this.logger.log('Seeded categories');
  }

  private async seedArticles() {
    if (await this.articleModel.countDocuments().exec()) { this.logger.log('Articles already seeded, skipping'); return; }
    const articles = [
      {
        title: 'The Future of Pharmacy Management: Digital Transformation in 2026',
        slug: 'future-of-pharmacy-management-2026',
        excerpt: 'Explore how digital transformation is reshaping pharmacy operations, from automated dispensing to AI-powered inventory management.',
        body: '<p>Pharmacy management is undergoing a digital revolution...</p>',
        imageUrl: '/assets/pexels-cottonbro-7579832.jpg',
        category: 'Pharmacy',
        publishedAt: new Date('2026-06-15'),
        isActive: true,
      },
      {
        title: 'HL7 vs FHIR: Choosing the Right Interoperability Standard',
        slug: 'hl7-vs-fhir-interoperability-standards',
        excerpt: 'A comprehensive comparison of HL7 and FHIR standards to help healthcare organizations choose the right integration approach.',
        body: '<p>Healthcare interoperability standards continue to evolve...</p>',
        imageUrl: '/assets/pexels-pavel-danilyuk-8442154.jpg',
        category: 'Interoperability',
        publishedAt: new Date('2026-05-20'),
        isActive: true,
      },
      {
        title: 'How LIS Integration Improves Laboratory Efficiency by 40%',
        slug: 'lis-integration-laboratory-efficiency',
        excerpt: 'Discover how modern Laboratory Information Systems with seamless integration capabilities are transforming lab operations.',
        body: '<p>Laboratory efficiency is critical for patient care...</p>',
        imageUrl: '/assets/pexels-karola-g-7195191.jpg',
        category: 'Laboratory',
        publishedAt: new Date('2026-04-10'),
        isActive: true,
      },
      {
        title: 'AI in Healthcare: Beyond the Hype — Real Use Cases in 2026',
        slug: 'ai-healthcare-real-use-cases-2026',
        excerpt: 'From conversational assistants to clinical intelligence, explore the practical AI applications transforming healthcare today.',
        body: '<p>Artificial intelligence in healthcare has moved beyond experimentation...</p>',
        imageUrl: '/assets/pexels-tima-miroshnichenko-6234978.jpg',
        category: 'AI & Automation',
        publishedAt: new Date('2026-03-05'),
        isActive: true,
      },
      {
        title: 'Building a Digital Health Strategy: A Framework for Providers',
        slug: 'digital-health-strategy-framework',
        excerpt: 'A practical framework for healthcare providers developing their digital health strategy and technology roadmap.',
        body: '<p>Developing a digital health strategy requires careful planning...</p>',
        imageUrl: '/assets/pexels-ivan-s-4989164.jpg',
        category: 'Strategy',
        publishedAt: new Date('2026-02-18'),
        isActive: true,
      },
    ];
    await this.articleModel.insertMany(articles);
    this.logger.log('Seeded articles');
  }

  private async seedInvestorData() {
    if (await this.investorModel.countDocuments().exec()) { this.logger.log('InvestorData already seeded, skipping'); return; }
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
    await this.investorModel.insertMany(data);
    this.logger.log('Seeded investor data');
  }

  private async seedCareers() {
    if (await this.careerModel.countDocuments().exec()) { this.logger.log('Careers already seeded, skipping'); return; }
    const careers = [
      {
        title: 'Senior Software Engineer — Healthcare',
        slug: 'senior-software-engineer',
        location: 'Lagos, Nigeria (Hybrid)',
        type: 'full-time',
        department: 'Engineering',
        description: 'Build and maintain healthcare technology platforms including pharmacy, laboratory, and radiology systems. Work with NestJS, React, PostgreSQL, and MongoDB.',
        imageUrl: '/assets/pexels-gustavo-fring-7446984.jpg',
        isActive: true,
      },
      {
        title: 'Healthcare Integration Specialist',
        slug: 'healthcare-integration-specialist',
        location: 'Remote (Africa)',
        type: 'remote',
        department: 'Professional Services',
        description: 'Lead HL7, FHIR, and DICOM integration projects for healthcare organizations. Design and implement data exchange workflows.',
        imageUrl: '/assets/pexels-mart-production-7089614.jpg',
        isActive: true,
      },
      {
        title: 'Product Manager — Interoperability Platform',
        slug: 'product-manager-interoperability',
        location: 'Lagos, Nigeria',
        type: 'full-time',
        department: 'Product',
        description: 'Define and execute the product roadmap for our healthcare interoperability platform. Work with engineering, sales, and customer teams.',
        imageUrl: '/assets/pexels-gustavo-fring-7446994.jpg',
        isActive: true,
      },
    ];
    await this.careerModel.insertMany(careers);
    this.logger.log('Seeded careers');
  }
}
