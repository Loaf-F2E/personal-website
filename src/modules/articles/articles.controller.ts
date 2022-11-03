import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query, Request } from 'express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { userInfo } from 'src/constants/user';

@UseGuards(AuthGuard('jwt'))
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: '创建文章' })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto, @Req() request: Request) {
    const user: userInfo = request.user;

    return this.articlesService.create(createArticleDto, user.userId);
  }

  @ApiOperation({ summary: '根据(id)或者(title)查找' })
  @Get('/one')
  findOne(@Query() query) {
    return this.articlesService.findOne(query?.id, query?.title);
  }

  @ApiOperation({ summary: '获取该用户的所有文章' })
  @Get()
  findAll(@Req() request: Request) {
    const user: userInfo = request.user;

    return this.articlesService.findAll(user.userId);
  }
}
