import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ClassifyService } from './classify.service';

@Controller('api/classify')
export class ClassifyController {
  constructor(private readonly ClassifyService: ClassifyService) {}
  
  @Get()
  find(@Req() req) {
    return this.ClassifyService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ClassifyService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.ClassifyService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.ClassifyService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.ClassifyService.delete(body.id);
  }
}
