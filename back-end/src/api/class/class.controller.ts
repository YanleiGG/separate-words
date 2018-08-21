import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { ClassService } from './class.service';

class IGetByID {
  id: number
}

@Controller('api/class')
export class ClassController {
  constructor(private readonly ClassService: ClassService) {}

  @Get()
  get () {
    return this.ClassService.findAll()
  }

  @Get(":id")
  findOne (@Param() param: IGetByID) {
    return this.ClassService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.ClassService.create(body.content, body.parentId)
  }

  @Put()
  put (@Body() body) {
    return this.ClassService.update(body.id, body.content, body.parentId)
  }

  @Delete()
  delete (@Body() body) {
    return this.ClassService.delete(body.id)
  }
}
