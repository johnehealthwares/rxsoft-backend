import { SiteSetting, SiteSettingSchema } from './site-setting.schema';
import { SiteSection, SiteSectionSchema } from './site-section.schema';
import { Product, ProductSchema } from './product.schema';
import { Service, ServiceSchema } from './service.schema';
import { Testimonial, TestimonialSchema } from './testimonial.schema';
import { Partner, PartnerSchema } from './partner.schema';
import { TeamMember, TeamMemberSchema } from './team-member.schema';
import { ContactSubmission, ContactSubmissionSchema } from './contact-submission.schema';

export {
  SiteSection, SiteSectionSchema,
  Product, ProductSchema,
  Service, ServiceSchema,
  Testimonial, TestimonialSchema,
  Partner, PartnerSchema,
  TeamMember, TeamMemberSchema,
  ContactSubmission, ContactSubmissionSchema,
  SiteSetting, SiteSettingSchema,
};

export type { SiteSectionDocument } from './site-section.schema';
export type { ProductDocument } from './product.schema';
export type { ServiceDocument } from './service.schema';
export type { TestimonialDocument } from './testimonial.schema';
export type { PartnerDocument } from './partner.schema';
export type { TeamMemberDocument } from './team-member.schema';
export type { ContactSubmissionDocument } from './contact-submission.schema';
export type { SiteSettingDocument } from './site-setting.schema';

export const mongooseFeatureModels = [
  { name: 'SiteSection', schema: SiteSectionSchema },
  { name: 'Product', schema: ProductSchema },
  { name: 'Service', schema: ServiceSchema },
  { name: 'Testimonial', schema: TestimonialSchema },
  { name: 'Partner', schema: PartnerSchema },
  { name: 'TeamMember', schema: TeamMemberSchema },
  { name: 'ContactSubmission', schema: ContactSubmissionSchema },
  { name: 'SiteSetting', schema: SiteSettingSchema },
];
