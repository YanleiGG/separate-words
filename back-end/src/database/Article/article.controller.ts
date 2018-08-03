import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

class IGet {
  query: {
    offset: number
    pageSize: number
  }
}

class IGetByID {
  id: number
}

class IPost {
  title: string
  data: string
}

class IPut {
  id: number
  title: string
  data: string
}

class IDelete {
  id: number
}

@Controller('api/article')
export class ArticleController {
  constructor(private readonly ArticleService: ArticleService) {}
  
  @Get()
  find(@Req() req: IGet) {
    return this.ArticleService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param: IGetByID) {
    return this.ArticleService.findOne(param.id);
  }

  @Post()
  create(@Body() body: IPost){
    return this.ArticleService.create(body.title, body.data);
  }

  @Put()
  update (@Body() body: IPut){
    return this.ArticleService.update(body.id, body.title, body.data);
  }

  @Delete()
  delete (@Body() body: IDelete) {
    return this.ArticleService.delete(body.id);
  }
}
