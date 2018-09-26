import { Get, Req, Post, Put, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

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
}
