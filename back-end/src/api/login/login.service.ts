import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../database/User/user.entity';
  
@Injectable()
export class loginService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>
  ) {}

  async login (username: string, password: string) {
    let user = await this.UserRepository.findOne({ name: username })
    if (user.password == password) {
      return {
        code: 0,
        msg: 'login successed!',
        username
      }
    } else {
      return {
        code: 1,
        msg: 'login failed!',
        username
      }
    }
  }
  
}