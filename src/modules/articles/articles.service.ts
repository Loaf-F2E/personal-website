import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entitles/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const article = this.articleRepository.create({ ...createArticleDto });

    await this.articleRepository.save(article);

    return {
      message: '添加成功',
    };
  }
}
