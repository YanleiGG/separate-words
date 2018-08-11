import { Get, Post, Body, Controller, Session } from '@nestjs/common';
import { loginService } from './login.service';

class IPost {
  readonly username: string;
  readonly password: string;
}

@Controller('api/login')
export class loginController {
  constructor(private readonly loginService: loginService) {}
  @Get()
  get(@Session() session){
    console.log(session)
  }

  @Post()
  async post(@Body() body: IPost) {
    let res = await this.loginService.login(body.username, body.password);
    return res
  }
}
