import { Get, Controller } from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.entity';

@Controller('user')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}
  
  @Get()
  findAll():  Promise<Article[]> {
    return this.ArticleService.findAll();
  }
}
