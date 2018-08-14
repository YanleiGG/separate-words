import { Get, Post, Body, Controller, Session, Req, Res, HttpStatus } from '@nestjs/common';
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
    return session
  }

  @Post()
  async post(@Res() res, @Req() req, @Body() body: IPost, @Session() session: any) {
    let data = await this.loginService.login(body.username, body.password)
    session = { id: 1 }
    res.status(HttpStatus.OK).json(data);
  }
}
