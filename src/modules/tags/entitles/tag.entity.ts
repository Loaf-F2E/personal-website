import { tgaStatus } from 'src/constants/user';
import { Article } from 'src/modules/articles/entitles/article.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn({ name: 'tag_id' })
  tagId: number;

  @Column({ comment: '名称', unique: true })
  name: string;

  @Column({ comment: '颜色', unique: true })
  color: string;

  @Column({
    default: tgaStatus.Effective,
    comment: '状态：0-失效|1-有效|2-删除',
  })
  status: number;

  @Column({ comment: '创建者' })
  createBy: number;

  @Column({ comment: '被引用次数', default: 0 })
  count: number;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
