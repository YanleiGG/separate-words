import { Get, Req, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { ClassService } from './class.service';


@Controller('api/class')
export class ClassController {
  constructor(private readonly ClassService: ClassService) {}

  @Get()
  get (@Req() req) {
    return this.ClassService.find(req.query.id)
  }

  @Post()
  post (@Body() body) {
    return this.ClassService.create(body.single, body.double, body.much)
  }

  @Put()
  put (@Body() body) {
    return this.ClassService.update( body.id, body.single, body.double, body.much)
  }

  @Delete()
  delete (@Body() body) {
    return this.ClassService.delete(body.id)
  }
}
