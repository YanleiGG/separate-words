import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { ClassifyGroupService } from './classify_group.service';

@Controller('api/classify_group')
export class ClassifyGroupController {
  constructor(private readonly ClassifyGroupService: ClassifyGroupService) {}
  
  @Get()
  find(@Req() req) {
    return this.ClassifyGroupService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ClassifyGroupService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.ClassifyGroupService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.ClassifyGroupService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    // return this.ClassifyGroupService.delete(body.id);
  }
}
