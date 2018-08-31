import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ArticleGroupClassifyService } from './article_group_classify.service';

@Controller('api/article_group_classify')
export class ArticleGroupClassifyController {
  constructor(private readonly ArticleGroupClassifyService: ArticleGroupClassifyService) {}
  
  @Get()
  find(@Req() req) {
    return this.ArticleGroupClassifyService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ArticleGroupClassifyService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.ArticleGroupClassifyService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.ArticleGroupClassifyService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.ArticleGroupClassifyService.delete(body.id);
  }
}
