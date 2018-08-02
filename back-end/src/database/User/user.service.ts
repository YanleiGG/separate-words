import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>,
  ) {}

  async post( type: string ,username: string, password: string ) {
    let user = await this.UserRepository.findOne({ name: username })
    if (type == 'signin') {
      if (user && password == user.password) {
        return {
          code: 0,
          msg: 'signin success!',
          user
        }
      } else {
        return {
          code: 10001,
          msg: 'signup failed!',
          user: null
        }
      }
    } else if (type == 'signup') {
      if (user) {
        return {
          code: 10001,
          msg: 'username has already existed!',
          user
        }
      } else {
        user = new User()
        user.name = username
        user.password = password
        await this.UserRepository.save(user)
        return null
      }
    }
  }

  async update (username: string, password: string) {
    let user = await this.UserRepository.findOne({ name: username })
    user.password = password
    await this.UserRepository.save(user)
    return {
      code: 0,
      msg: 'update success!',
      user
    }
  }
}