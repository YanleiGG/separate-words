import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { EmotionTypeGroupService } from './emotionTypeGroup.service';


@Controller('api/emotionTypeGroup')
export class EmotionTypeGroupController {
  constructor(private readonly EmotionTypeGroupService: EmotionTypeGroupService) {}

  @Get()
  get () {
    return this.EmotionTypeGroupService.findAll()
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.EmotionTypeGroupService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.EmotionTypeGroupService.create(body)
  }

  @Put()
  put (@Body() body) {
    return this.EmotionTypeGroupService.update(body)
  }

  @Delete()
  delete (@Body() body) {
    return this.EmotionTypeGroupService.delete(body.id)
  }
}
