import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../tags/entitles/tag.entity';
import { User } from '../users/entities/user.entity';
import { ArticleController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entitles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, User])],
  controllers: [ArticleController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
