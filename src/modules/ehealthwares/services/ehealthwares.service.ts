import { Injectable, NotFoundException } from '@nestjs/common';
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
} from '../schemas';
import { CreateContactDto } from '../dto/ehealthwares.dto';

@Injectable()
export class EhealthwaresService {
  constructor(
    @InjectModel('SiteSection') private readonly sectionModel: Model<SiteSectionDocument>,
    @InjectModel('Product') private readonly productModel: Model<ProductDocument>,
    @InjectModel('Service') private readonly serviceModel: Model<ServiceDocument>,
    @InjectModel('Testimonial') private readonly testimonialModel: Model<TestimonialDocument>,
    @InjectModel('Partner') private readonly partnerModel: Model<PartnerDocument>,
    @InjectModel('TeamMember') private readonly teamModel: Model<TeamMemberDocument>,
    @InjectModel('ContactSubmission') private readonly contactModel: Model<ContactSubmissionDocument>,
    @InjectModel('SiteSetting') private readonly settingModel: Model<SiteSettingDocument>,
  ) {}

  async getSections() {
    return this.sectionModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getProducts() {
    return this.productModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getProductBySlug(slug: string) {
    const product = await this.productModel.findOne({ slug, isActive: true }).exec();
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async getServices() {
    return this.serviceModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getServiceBySlug(slug: string) {
    const service = await this.serviceModel.findOne({ slug, isActive: true }).exec();
    if (!service) throw new NotFoundException('Service not found');
    return service;
  }

  async getTestimonials() {
    return this.testimonialModel.find({ isActive: true }).sort({ displayOrder: 1 }).exec();
  }

  async getPartners() {
    return this.partnerModel.find().sort({ displayOrder: 1 }).exec();
  }

  async getTeam() {
    return this.teamModel.find().sort({ displayOrder: 1 }).exec();
  }

  async submitContact(dto: CreateContactDto) {
    return new this.contactModel(dto).save();
  }

  async getSettings() {
    const settings = await this.settingModel.find().exec();
    const map: Record<string, unknown> = {};
    for (const s of settings) {
      map[s.key] = s.value;
    }
    return map;
  }
}
