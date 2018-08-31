import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { EntitiesService } from './entities.service';

@Controller('api/entities')
export class EntitiesController {
  constructor(private readonly EntitiesService: EntitiesService) {}
  
  @Get()
  find(@Req() req) {
    return this.EntitiesService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.EntitiesService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.EntitiesService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.EntitiesService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.EntitiesService.delete(body.id);
  }
}
