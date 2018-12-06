import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { ContentLabelService } from './contentLabel.service';

class IGetByID {
  id: number
}

@Controller('api/contentLabel')
export class ContentLabelController {
  constructor(private readonly ContentLabelService: ContentLabelService) {}

  @Get()
  get (@Req() req) {
    return this.ContentLabelService.find(req.query.offset, req.query.pageSize)
  }

  @Get(":id")
  findOne (@Param() param: IGetByID) {
    return this.ContentLabelService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.ContentLabelService.create(body)
  }

  @Put()
  put (@Body() body) {
    return this.ContentLabelService.update(body)
  }

  @Delete()
  delete (@Body() body) {
    return this.ContentLabelService.delete(body.id)
  }
}
