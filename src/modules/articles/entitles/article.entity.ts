import { articleStatus } from 'src/constants/user';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '标题', unique: true })
  title: string;

  @Column({ comment: '内容', unique: true })
  content: string;

  @OneToMany()
  @Column({ comment: '标签' })
  tag: number;

  @Column({
    default: articleStatus.Effective,
    comment: '状态：0-失效|1-有效|2-删除',
  })
  status: number;

  @Column({ comment: '创建者' })
  createBy: number;
}
