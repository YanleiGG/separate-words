import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { EmotionTypeService } from './emotionType.service';

@Controller('api/emotionType')
export class EmotionTypeController {
  constructor(private readonly EmotionTypeService: EmotionTypeService) {}

  @Get()
  get (@Req() req) {
    return this.EmotionTypeService.find(req.query.offset, req.query.pageSize)
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.EmotionTypeService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.EmotionTypeService.create(body)
  }

  @Put()
  put (@Body() body) {
    return this.EmotionTypeService.update(body)
  }

  @Delete()
  delete (@Body() body) {
    return this.EmotionTypeService.delete(body.id)
  }
}
