import { Get, Post, Body, Controller, Session, Req, Res, HttpStatus, Delete } from '@nestjs/common';
import { LoginService } from './login.service';

class IPost {
  readonly username: string;
  readonly password: string;
}

@Controller('api/login')
export class LoginController {
  constructor(private readonly LoginService: LoginService) {}

  @Post()
  async post(@Res() res, @Req() req, @Body() body: IPost) {
    let data = await this.LoginService.login(body.username, body.password, req)
    res.status(HttpStatus.OK).json(data);
  }

  @Delete()
  async delete(@Req() req){
    return await this.LoginService.delete(req)
  }
}
