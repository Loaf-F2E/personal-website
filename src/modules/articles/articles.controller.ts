import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

// @UseGuards(AuthGuard('jwt'))
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiOperation({ summary: '创建文章' })
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }
}
