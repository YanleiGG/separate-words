import { Get, Post, Body, Controller, Session, Req, Res, HttpStatus } from '@nestjs/common';
import { LoginService } from './login.service';

class IPost {
  readonly username: string;
  readonly password: string;
}

@Controller('api/login')
export class LoginController {
  constructor(private readonly LoginService: LoginService) {}
  @Get()
  get(@Session() session){
    return session
  }

  @Post()
  async post(@Res() res, @Req() req, @Body() body: IPost, @Session() session: any) {
    let data = await this.LoginService.login(body.username, body.password)
    session = { id: 1 }
    res.status(HttpStatus.OK).json(data);
  }
}
