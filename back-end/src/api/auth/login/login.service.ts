import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../database/user/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>
  ) {}

  async login (username: string, password: string) {
    let user = await this.UserRepository.findOne({ name: username, password })
    if (user) {
      return {
        code: 0,
        msg: 'login successed!',
        user: {
          id: user.id,
          name: username
        }
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