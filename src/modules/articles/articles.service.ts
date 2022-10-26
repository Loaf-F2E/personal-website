import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './entitles/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const list = [];
    const { tags, userId, ...params } = createArticleDto;
    const user = await this.usersService.findOne(userId);
    const tagList = tags.split(',');

    if (!user) {
      return {
        code: -1,
        message: '该用户不存在',
      };
    }

    for (let i = 0; i < tagList.length; i++) {
      const { data } = await this.tagsService.findOne(Number(tagList[i]));

      if (data) {
        list.push(data);
        const { count, tagId, ...params } = data;
        // 标签被文章使用过 引用索引加一
        await this.tagsService.update(tagId, { count: count + 1, ...params });
      }
    }

    const article = this.articleRepository.create({
      ...params,
      user: user,
      tags: list,
    });

    await this.articleRepository.save(article);

    return {
      message: '添加成功',
    };
  }
}
