import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HeroSlideDocument = HydratedDocument<HeroSlide>;

@Schema({ timestamps: true, collection: 'ehealthwares_hero_slides' })
export class HeroSlide {
  @Prop()
  title: string;

  @Prop()
  subtitle: string;

  @Prop()
  mediaUrl: string;

  @Prop({ enum: ['image', 'video'], default: 'image' })
  mediaType: string;

  @Prop()
  ctaText: string;

  @Prop()
  ctaLink: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const HeroSlideSchema = SchemaFactory.createForClass(HeroSlide);
