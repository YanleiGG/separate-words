import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { EntitiesGroupService } from './entities_group.service';

@Controller('api/entities_group')
export class EntitiesGroupController {
  constructor(private readonly EntitiesGroupService: EntitiesGroupService) {}
  
  @Get()
  find(@Req() req) {
    return this.EntitiesGroupService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.EntitiesGroupService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.EntitiesGroupService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.EntitiesGroupService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.EntitiesGroupService.delete(body.id);
  }
}
