import { Get, Req, Post, Put, Body, Controller, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get(':id')
  findOne(@Param() param) {
    return this.UserService.findOne(param.id)
  }

  @Get()
  findAll() {
    return this.UserService.findAll()
  }

  @Get('mark')
  findMarkUser() {
    return this.UserService.findMarkUser()
  }

  @Post()
  post(@Body() body) {
    return this.UserService.create(body);
  }

  @Put()
  put(@Body() data) {
    return this.UserService.update(data.username, data.password);
  }

  @Delete()
  delete(@Body() body) {
    return this.UserService.delete(body.id);
  }
}
