import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Tag } from 'src/modules/tags/entitles/tag.entity';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsString()
  readonly title!: string;

  @ApiProperty({ description: '文章内容' })
  @IsString()
  readonly content!: string;

  @ApiProperty({ description: '文章标签id' })
  @IsString()
  readonly tags: Tag[];

  @ApiProperty({ description: '文章状态' })
  @IsNumber()
  readonly status: number;

  @ApiProperty({ description: '文章拥有者' })
  @IsNumber()
  readonly createBy: number;
}
