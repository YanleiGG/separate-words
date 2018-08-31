import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ArticleGroupWordsPropertyService } from './article_group_words_property.service';

@Controller('api/article_group_words_property')
export class ArticleGroupWordsPropertyController {
  constructor(private readonly ArticleGroupWordsPropertyService: ArticleGroupWordsPropertyService) {}
  
  @Get()
  find(@Req() req) {
    return this.ArticleGroupWordsPropertyService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ArticleGroupWordsPropertyService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.ArticleGroupWordsPropertyService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.ArticleGroupWordsPropertyService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.ArticleGroupWordsPropertyService.delete(body.id);
  }
}
