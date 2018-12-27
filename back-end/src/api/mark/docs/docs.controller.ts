import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { DocsService } from './docs.service';

@Controller('api/docs')
export class DocsController {
  constructor(private readonly DocsService: DocsService) {}
  
  @Get()
  find(@Req() req) {
    return this.DocsService.find(req.query.offset, req.query.pageSize, req.query.type);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.DocsService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.DocsService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.DocsService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    return this.DocsService.delete(body.id);
  }
}
