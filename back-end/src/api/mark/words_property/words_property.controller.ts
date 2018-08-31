import { Get, Req, Param, Post, Put, Delete, Body, Controller } from '@nestjs/common';
import { WordsPropertyService } from './words_property.service';

class IGetByID {
  id: number
}

@Controller('api/words_property')
export class WordsPropertyController {
  constructor(private readonly WordsPropertyService: WordsPropertyService) {}

  @Get()
  get () {
    return this.WordsPropertyService.findAll()
  }

  @Get(":id")
  findOne (@Param() param: IGetByID) {
    return this.WordsPropertyService.findOne(param.id);
  }

  @Post()
  post (@Body() body) {
    return this.WordsPropertyService.create(body)
  }

  @Put()
  put (@Body() body) {
    return this.WordsPropertyService.update(body)
  }

  @Delete()
  delete (@Body() body) {
    return this.WordsPropertyService.delete(body.id)
  }
}
