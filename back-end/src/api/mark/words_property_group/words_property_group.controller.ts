import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { WordsPropertyGroupService } from './words_property_group.service';


@Controller('api/words_property_group')
export class WordsPropertyGroupController {
  constructor(private readonly WordsPropertyGroupService: WordsPropertyGroupService) {}

  @Get()
  get () {
    return this.WordsPropertyGroupService.findAll()
  }

  @Get(":id")
  findOne (@Param() param) {
    return this.WordsPropertyGroupService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.WordsPropertyGroupService.create(body)
  }

  @Put()
  put (@Body() body) {
    return this.WordsPropertyGroupService.update(body)
  }

  @Delete()
  delete (@Body() body) {
    return this.WordsPropertyGroupService.delete(body.id)
  }
}
