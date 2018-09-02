import { Get, Req, Post, Put, Delete, Body, Controller, Param } from '@nestjs/common';
import { EmotionService } from './emotion.service';

@Controller('api/article/:id/emotion')
export class EmotionController {
  constructor(private readonly EmotionService: EmotionService) {}
  
  @Get()
  find(@Req() req) {
    return this.EmotionService.find(req.query.offset, req.query.pageSize);
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.EmotionService.findOne(param.id);
  }

  @Post()
  create(@Body() body){
    return this.EmotionService.create(body);
  }

  @Put()
  update (@Body() body){
    return this.EmotionService.update(body);
  }

  @Delete()
  delete (@Body() body) {
    return this.EmotionService.delete(body.id);
  }
}
