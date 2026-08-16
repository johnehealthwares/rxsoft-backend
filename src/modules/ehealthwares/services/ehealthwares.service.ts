import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SiteSectionDocument,
  ProductDocument,
  ServiceDocument,
  TestimonialDocument,
  PartnerDocument,
  TeamMemberDocument,
  ContactSubmissionDocument,
  SiteSettingDocument,
  HeroSlideDocument,
  CategoryDocument,
  ArticleDocument,
  InvestorDataDocument,
  CareerDocument,
} from '../schemas';
import { CreateContactDto } from '../dto/ehealthwares.dto';
import { AppCacheService } from '../../../common/cache/cache.service';

@Injectable()
export class EhealthwaresService {
  private readonly logger = new Logger(EhealthwaresService.name);
  private readonly cacheEnabled: boolean;
  private readonly ttlSeconds: number;

  constructor(
    private readonly cache: AppCacheService,
    private readonly config: ConfigService,
    @InjectModel('SiteSection') private readonly sectionModel: Model<SiteSectionDocument>,
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
    @InjectModel('Service') private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel('Testimonial') private readonly testimonialModel: Model<TestimonialDocument>,
    @InjectModel('Partner') private readonly partnerModel: Model<PartnerDocument>,
    @InjectModel('TeamMember') private readonly teamModel: Model<TeamMemberDocument>,
    @InjectModel('ContactSubmission') private readonly contactModel: Model<ContactSubmissionDocument>,
    @InjectModel('SiteSetting') private readonly settingModel: Model<SiteSettingDocument>,
    @InjectModel('HeroSlide') private readonly heroSlideModel: Model<HeroSlideDocument>,
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDocument>,
    @InjectModel('Article') private readonly articleModel: Model<ArticleDocument>,
    @InjectModel('InvestorData') private readonly investorModel: Model<InvestorDataDocument>,
    @InjectModel('Career') private readonly careerModel: Model<CareerDocument>,
  ) {
    // Config-driven: `EHEALTHWARES_CACHE_ENABLED=false` disables caching entirely.
    this.cacheEnabled = this.config.get<string>('EHEALTHWARES_CACHE_ENABLED') !== 'false';
    // Per-module TTL, falling back to the global CACHE_TTL_SECONDS, then 3000s.
    this.ttlSeconds =
      Number(this.config.get<string>('EHEALTHWARES_CACHE_TTL_SECONDS')) ||
      Number(this.config.get<string>('CACHE_TTL_SECONDS')) ||
      3000;
  }

  /**
   * Reads through the cache. On a miss it runs `fetcher`, then stores the result
   * (unless it is null/undefined or an empty array — we never cache transient/empty
   * states, so a cold DB during warmup won't poison the cache).
   */
  private async getCached<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
    if (!this.cacheEnabled) {
      return fetcher();
    }

    try {
      const cached = await this.cache.get<T>(key);
      if (cached !== null && cached !== undefined) {
        this.logger.debug(`cache hit: ${key}`);
        return cached;
      }
    } catch (err) {
      this.logger.warn(`cache read failed for ${key}: ${err instanceof Error ? err.message : err}`);
    }

    const value = await fetcher();

    if (
      value !== null &&
      value !== undefined &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      try {
        await this.cache.set(key, value, this.ttlSeconds);
        this.logger.debug(`cache set: ${key}`);
      } catch (err) {
        this.logger.warn(`cache write failed for ${key}: ${err instanceof Error ? err.message : err}`);
      }
    }

    return value;
  }

  getSections() {
    return this.getCached('ehealthwares:sections', () =>
      this.sectionModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getProducts() {
    return this.getCached('ehealthwares:products', () =>
      this.productModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getProductBySlug(slug: string) {
    return this.getCached(`ehealthwares:product:${slug}`, async () => {
      const product = await this.productModel.findOne({ slug, isActive: true }).exec();
      if (!product) throw new NotFoundException('Product not found');
      return product;
    });
  }

  getServices() {
    return this.getCached('ehealthwares:services', () =>
      this.serviceModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getServiceBySlug(slug: string) {
    return this.getCached(`ehealthwares:service:${slug}`, async () => {
      const service = await this.serviceModel.findOne({ slug, isActive: true }).exec();
      if (!service) throw new NotFoundException('Service not found');
      return service;
    });
  }

  getTestimonials() {
    return this.getCached('ehealthwares:testimonials', () =>
      this.testimonialModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getPartners() {
    return this.getCached('ehealthwares:partners', () =>
      this.partnerModel.find().sort({ displayOrder: 1 }).exec(),
    );
  }

  getTeam() {
    return this.getCached('ehealthwares:team', () =>
      this.teamModel.find().sort({ displayOrder: 1 }).exec(),
    );
  }

  submitContact(dto: CreateContactDto) {
    return new this.contactModel(dto).save();
  }

  getSettings() {
    return this.getCached('ehealthwares:settings', async () => {
      const settings = await this.settingModel.find().exec();
      const map: Record<string, unknown> = {};
      for (const s of settings) {
        map[s.key] = s.value;
      }
      return map;
    });
  }

  getHeroSlides() {
    return this.getCached('ehealthwares:hero-slides', () =>
      this.heroSlideModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getCategories() {
    return this.getCached('ehealthwares:categories', () =>
      this.categoryModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getArticles() {
    return this.getCached('ehealthwares:articles', () =>
      this.articleModel.find({ isActive: true }).sort({ publishedAt: -1 }).exec(),
    );
  }

  getInvestorData() {
    return this.getCached('ehealthwares:investors', () =>
      this.investorModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  getCareers() {
    return this.getCached('ehealthwares:careers', () =>
      this.careerModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec(),
    );
  }

  /**
   * Drop every cached eHealthwares entry (list + detail keys share the
   * `ehealthwares:` prefix), so the next request reads fresh from MongoDB.
   */
  async clearCache(): Promise<{ cleared: boolean }> {
    await this.cache.invalidateByPrefix('ehealthwares:');
    this.logger.log('eHealthwares cache cleared');
    return { cleared: true };
  }

  /**
   * Warm the cache once the app has bootstrapped, so the first real requests
   * are served from cache instead of hitting MongoDB.
   */
  async onApplicationBootstrap() {
    if (!this.cacheEnabled) {
      this.logger.log('eHealthwares caching disabled by config; skipping cache warmup');
      return;
    }

    this.logger.log('Warming eHealthwares cache on startup...');
    try {
      const [sections, products, services, testimonials, partners, team, settings, heroSlides, categories, articles, investors, careers] =
        await Promise.all([
          this.getSections(),
          this.getProducts(),
          this.getServices(),
          this.getTestimonials(),
          this.getPartners(),
          this.getTeam(),
          this.getSettings(),
          this.getHeroSlides(),
          this.getCategories(),
          this.getArticles(),
          this.getInvestorData(),
          this.getCareers(),
        ]);

      // Warm the per-slug detail entries too.
      await Promise.all(
        products.map((p) => this.getProductBySlug(p.slug).catch(() => null)),
      );
      await Promise.all(
        services.map((s) => this.getServiceBySlug(s.slug).catch(() => null)),
      );

      this.logger.log(
        `eHealthwares cache warmed | sections=${sections.length} products=${products.length} ` +
          `services=${services.length} testimonials=${testimonials.length} partners=${partners.length} ` +
          `team=${team.length} settings=${Object.keys(settings).length} ` +
          `heroSlides=${heroSlides.length} categories=${categories.length} articles=${articles.length} ` +
          `investors=${investors.length} careers=${careers.length}`,
      );
    } catch (err) {
      this.logger.warn(
        `eHealthwares cache warmup failed: ${err instanceof Error ? err.message : err}`,
      );
    }
  }
}
