import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ArticleEmotionService } from './article_emotion.service';

@Controller('api/article_emotion')
export class ArticleEmotionController {
  constructor(private readonly ArticleEmotionService: ArticleEmotionService) {}
  
  @Get()
  find(@Req() req) {
    return this.ArticleEmotionService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ArticleEmotionService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.ArticleEmotionService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.ArticleEmotionService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    return this.ArticleEmotionService.delete(body.id);
  }
}
