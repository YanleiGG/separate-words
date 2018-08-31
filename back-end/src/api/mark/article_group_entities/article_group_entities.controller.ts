import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ArticleGroupEntitiesService } from './article_group_entities.service';

@Controller('api/article_group_entities')
export class ArticleGroupEntitiesController {
  constructor(private readonly ArticleGroupEntitiesService: ArticleGroupEntitiesService) {}
  
  @Get()
  find(@Req() req) {
    return this.ArticleGroupEntitiesService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ArticleGroupEntitiesService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.ArticleGroupEntitiesService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.ArticleGroupEntitiesService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.ArticleGroupEntitiesService.delete(body.id);
  }
}
