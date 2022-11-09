import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题' })
  @IsString()
  readonly title!: string;

  @ApiProperty({ description: '文章内容' })
  @IsString()
  readonly content!: string;

  @ApiProperty({ description: '文章标签id' })
  @IsString()
  readonly tags: string;

  @ApiProperty({ description: '文章状态' })
  @IsNumber()
  readonly article_status: number;

  @ApiProperty({ description: '文章创建时间' })
  @IsDate()
  @IsOptional()
  readonly create_time: Date;

  @ApiProperty({ description: '文章修改时间' })
  @IsDate()
  @IsOptional()
  readonly update_time: Date;
}
