import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ArticleService } from './article.service';

class IGet {
  query: {
    offset: number
    pageSize: number
  }
}

class IPost {
  title: string
  separateWords: string
  separateWordsProperty: string
  markEntity: string
  content: string
}

class IPut {
  id: number
  title: string
  separateWords: string
  separateWordsProperty: string
  markEntity: string
  content: string
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

  @Get(":type/:id")
  findWithFormatData (@Param() param) {
    return this.ArticleService.findWithFormatData(param.id, param.type);
  }

  @Post()
  create(@Body() body: IPost){
    return this.ArticleService.create(body);
  }

  @Put()
  update (@Body() body: IPut){
    return this.ArticleService.update(body);
  }

  @Delete()
  delete (@Body() body: IDelete) {
    return this.ArticleService.delete(body.id);
  }
}
