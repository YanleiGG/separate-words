import { Post, Body, Controller } from '@nestjs/common';
import { loginService } from './login.service';

class IPost {
  readonly username: string;
  readonly password: string;
}

@Controller('api/login')
export class loginController {
  constructor(private readonly loginService: loginService) {}

  @Post()
  post(@Body() data: IPost) {
    return this.loginService.login(data.username, data.password);
  }

}
