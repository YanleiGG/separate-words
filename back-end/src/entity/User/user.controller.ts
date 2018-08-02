import { Get, Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  
  @Get()
  findAll():  Promise<User[]> {
    return this.UserService.findAll();
  }
}
