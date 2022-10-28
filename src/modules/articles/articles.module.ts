import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from '../tags/entitles/tag.entity';
import { TagsService } from '../tags/tags.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { ArticleController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entitles/article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Tag, User])],
  controllers: [ArticleController],
  providers: [
    ArticlesService,
    TagsService,
    ConfigService,
    JwtService,
    UsersService,
  ],
})
export class ArticlesModule {}
