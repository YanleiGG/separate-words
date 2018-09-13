import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../database/user/user.entity';
  
@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>
  ) {}

  async findOne (username: string, password: string) {
    let user = await this.UserRepository.findOne({ name: username })
    return user
  }

  async findMarkUser () {
    let users = await this.UserRepository.find()
    return {
      code: 0,
      msg: 'success',
      data: users
    }
  }

  async post( type: string ,username: string, password: string ) {
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