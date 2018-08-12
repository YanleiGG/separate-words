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
  post(@Body() body: IPost, @Session() session: any) {
    return this.loginService.login(body.username, body.password);
  }
}
