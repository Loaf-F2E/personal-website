import { articleStatus } from 'src/constants/user';
import { Tag } from 'src/modules/tags/entitles/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn({ name: 'article_id' })
  articleId: number;

  @Column({ comment: '标题' })
  title: string;

  @Column({ comment: '内容' })
  content: string;

  @Column({ comment: '标签', type: 'simple-array' })
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

  // user_id === Article.createBy
  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'createBy' })
  user: User;

  @Column({ type: 'date', comment: '创建时间', nullable: true })
  create_time: Date;

  @Column({ type: 'date', comment: '修改时间', nullable: true })
  update_time: Date;
}
