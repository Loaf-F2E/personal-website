import { articleStatus } from 'src/constants/user';
import { Tag } from 'src/modules/tags/entitles/tag.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ name: 'article_id' })
  articleId: number;

  @Column({ comment: '标题', unique: true })
  title: string;

  @Column({ comment: '内容', unique: true })
  content: string;

  @Column({ comment: '标签', array: true })
  @ManyToMany(() => Tag, (tag) => tag.tagId)
  @JoinTable({
    name: 'article_tag',
    joinColumns: [
      {
        name: 'article_id',
      },
    ],
    inverseJoinColumns: [
      {
        name: 'tag_id',
      },
    ],
  })
  tags: Tag[];

  @Column({
    default: articleStatus.Effective,
    comment: '状态：0-失效|1-有效|2-删除',
  })
  status: number;

  @Column({ comment: '创建者' })
  createBy: number;
}
