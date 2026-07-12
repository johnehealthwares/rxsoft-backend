import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SiteSectionDocument, ProductDocument, ServiceDocument,
  TestimonialDocument, PartnerDocument, TeamMemberDocument,
  SiteSettingDocument,
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
  ) {}

  async onModuleInit() {
    await this.seed();
  }

  async seed() {
    const count = await this.sectionModel.countDocuments().exec();
    if (count > 0) {
      this.logger.log('eHealthwares data already seeded, skipping');
      return;
    }

    this.logger.log('Seeding eHealthwares website data...');

    await this.seedSections();
    await this.seedProducts();
    await this.seedServices();
    await this.seedTestimonials();
    await this.seedPartners();
    await this.seedTeam();
    await this.seedSettings();

    this.logger.log('eHealthwares website data seeded successfully!');
  }

  private async seedSections() {
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
    ];
    await this.productModel.insertMany(products);
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
    await this.serviceModel.insertMany(services);
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
    await this.testimonialModel.insertMany(testimonials);
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
    await this.partnerModel.insertMany(partners);
    this.logger.log('Seeded partners');
  }

  private async seedTeam() {
    const team = [
      { name: 'John Doe', role: 'Chief Executive Officer', bio: 'Visionary leader with 20+ years in healthcare technology.', displayOrder: 0 },
      { name: 'Jane Smith', role: 'Chief Technology Officer', bio: 'Expert in healthcare systems architecture and interoperability.', displayOrder: 1 },
      { name: 'Dr. Michael Ade', role: 'VP of Healthcare Solutions', bio: 'Physician and technologist bridging clinical and digital domains.', displayOrder: 2 },
    ];
    await this.teamModel.insertMany(team);
    this.logger.log('Seeded team members');
  }

  private async seedSettings() {
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
}
