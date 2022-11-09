import { status } from 'src/constants/user';
import { Article } from 'src/modules/articles/entitles/article.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ name: 'tag_id' })
  tagId: number;

  @Column({ comment: '名称', unique: true })
  name: string;

  @Column({ comment: '颜色', unique: true })
  color: string;

  @Column({
    default: status.Effective,
    comment: '状态：0-失效|1-有效|2-删除',
  })
  tag_status: number;

  @Column({ comment: '被引用次数', default: 0 })
  count: number;

  @ManyToOne(() => User, (user) => user.tags)
  @JoinColumn({ name: 'createBy' })
  user: User;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
