import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DateOrNullTransformer } from 'src/shared/utils/column-transformer';

@Entity('blog_articles')
export class BlogArticleOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'text', unique: true })
  slug!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string | null;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'text', nullable: true })
  category!: string | null;

  @Column({ name: 'author_name', type: 'text', nullable: true })
  authorName!: string | null;

  @Column({ name: 'image_url', type: 'text', nullable: true })
  imageUrl!: string | null;

  @Column({ name: 'reading_time', type: 'int', nullable: true })
  readingTime!: number | null;

  @Column({ name: 'is_published', type: 'boolean', default: false })
  isPublished!: boolean;

  @Column({ name: 'published_at', nullable: true, type: 'text', transformer: DateOrNullTransformer })
  publishedAt!: Date | null;

  @Column({ name: 'meta_title', type: 'text', nullable: true })
  metaTitle!: string | null;

  @Column({ name: 'meta_description', type: 'text', nullable: true })
  metaDescription!: string | null;

  @Column({ name: 'og_image_url', type: 'text', nullable: true })
  ogImageUrl!: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
