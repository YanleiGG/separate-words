import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { SepWordsPropertyService } from './sep_words_property.service';

@Controller('api/sep_words_property')
export class SepWordsPropertyController {
  constructor(private readonly SepWordsPropertyService: SepWordsPropertyService) {}
  
  @Get()
  find(@Req() req) {
    return this.SepWordsPropertyService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.SepWordsPropertyService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.SepWordsPropertyService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.SepWordsPropertyService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    return this.SepWordsPropertyService.delete(body.id);
  }
}
