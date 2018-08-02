import { Get, Post, Put, Body, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

class IPost {
  readonly type: string;
  readonly username: string;
  readonly password: string;
}

class IPut {
  readonly username: string;
  readonly password: string;
}

@Controller('api/user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  post(@Body() data: IPost) {
    return this.UserService.post(data.type, data.username, data.password);
  }

  @Put()
  put(@Body() data: IPut) {
    return this.UserService.update(data.username, data.password);
  }
}
