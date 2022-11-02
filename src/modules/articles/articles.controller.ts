import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
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

  @ApiOperation({ summary: '获取该用户的所有文章' })
  @Get()
  findAll(@Req() request: Request) {
    const user: userInfo = request.user;

    return this.articlesService.findAll(user.userId);
  }

  @ApiOperation({ summary: '查找文章' })
  @Get(':id')
  findOne(@Param('id') id: number | string) {
    return this.articlesService.findOne(id);
  }
}
