import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { ContentLabelGroupService } from './contentLabelGroup.service';


@Controller('api/contentLabelGroup')
export class ContentLabelGroupController {
  constructor(private readonly ContentLabelGroupService: ContentLabelGroupService) {}

  @Get()
  get () {
    return this.ContentLabelGroupService.findAll()
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.ContentLabelGroupService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.ContentLabelGroupService.create(body)
  }

  @Put()
  put (@Body() body) {
    return this.ContentLabelGroupService.update(body)
  }

  @Delete()
  delete (@Body() body) {
    return this.ContentLabelGroupService.delete(body.id)
  }
}
