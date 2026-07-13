import { SiteSetting, SiteSettingSchema } from './site-setting.schema';
import { SiteSection, SiteSectionSchema } from './site-section.schema';
import { Product, ProductSchema } from './product.schema';
import { Service, ServiceSchema } from './service.schema';
import { Testimonial, TestimonialSchema } from './testimonial.schema';
import { Partner, PartnerSchema } from './partner.schema';
import { TeamMember, TeamMemberSchema } from './team-member.schema';
import { ContactSubmission, ContactSubmissionSchema } from './contact-submission.schema';
import { Article, ArticleSchema } from './article.schema';
import { HeroSlide, HeroSlideSchema } from './heroslide.schema';
import { Category, CategorySchema } from './category.schema';
import { InvestorData, InvestorDataSchema } from './investor.schema';
import { Career, CareerSchema } from './career.schema';

export {
  SiteSection, SiteSectionSchema,
  Product, ProductSchema,
  Service, ServiceSchema,
  Testimonial, TestimonialSchema,
  Partner, PartnerSchema,
  TeamMember, TeamMemberSchema,
  ContactSubmission, ContactSubmissionSchema,
  SiteSetting, SiteSettingSchema,
  Article, ArticleSchema,
  HeroSlide, HeroSlideSchema,
  Category, CategorySchema,
  InvestorData, InvestorDataSchema,
  Career, CareerSchema,
};

export type { SiteSectionDocument } from './site-section.schema';
export type { ProductDocument } from './product.schema';
export type { ServiceDocument } from './service.schema';
export type { TestimonialDocument } from './testimonial.schema';
export type { PartnerDocument } from './partner.schema';
export type { TeamMemberDocument } from './team-member.schema';
export type { ContactSubmissionDocument } from './contact-submission.schema';
export type { SiteSettingDocument } from './site-setting.schema';
export type { ArticleDocument } from './article.schema';
export type { HeroSlideDocument } from './heroslide.schema';
export type { CategoryDocument } from './category.schema';
export type { InvestorDataDocument } from './investor.schema';
export type { CareerDocument } from './career.schema';

export const mongooseFeatureModels = [
  { name: 'SiteSection', schema: SiteSectionSchema },
  { name: 'Product', schema: ProductSchema },
  { name: 'Service', schema: ServiceSchema },
  { name: 'Testimonial', schema: TestimonialSchema },
  { name: 'Partner', schema: PartnerSchema },
  { name: 'TeamMember', schema: TeamMemberSchema },
  { name: 'ContactSubmission', schema: ContactSubmissionSchema },
  { name: 'SiteSetting', schema: SiteSettingSchema },
  { name: 'Article', schema: ArticleSchema },
  { name: 'HeroSlide', schema: HeroSlideSchema },
  { name: 'Category', schema: CategorySchema },
  { name: 'InvestorData', schema: InvestorDataSchema },
  { name: 'Career', schema: CareerSchema },
];
