import { tgaStatus } from 'src/constants/user';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '名称', unique: true })
  name: string;

  @Column({ comment: '颜色', unique: true })
  color: string;

  @Column({
    default: tgaStatus.Effective,
    comment: '状态：0-失效|1-有效|2-删除',
  })
  status: number;
}
