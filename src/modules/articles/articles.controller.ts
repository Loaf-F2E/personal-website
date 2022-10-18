import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { ArticlesService } from './articles.service';

@UseGuards(AuthGuard('jwt'))
@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticlesService) {}
}
