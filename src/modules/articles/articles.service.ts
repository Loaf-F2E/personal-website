import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entitles/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
  ) {}

  async create(createArticleDto: CreateArticleDto, userId: number) {
    const list = [];
    const { tags, ...params } = createArticleDto;
    const { data: user } = await this.usersService.findOne(userId);
    const tagList = tags.split(',');

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

  async findAll(id: number) {
    const all = await this.articleRepository
      .createQueryBuilder('article')
      .select(['article', 'tag.name', 'tag.tagId', 'tag.color'])
      .where('article.createBy = :id', { id: id })
      .leftJoin('article.tags', 'tag')
      .getMany();

    return {
      data: all,
    };
  }

  async findOne(id: string, title: string) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .select(['article', 'tag.name', 'tag.tagId', 'tag.color'])
      .where('article.article_id = :id', { id: id })
      .orWhere('article.title = :title', { title: title })
      .leftJoin('article.tags', 'tag')
      .getOne();

    if (!article) {
      return {
        message: '该文章不存在！',
      };
    }

    return {
      data: article,
      message: '查找成功',
    };
  }

  // async update(updateArticleDto: UpdateArticleDto, id: number) {}
}
