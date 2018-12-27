import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../database/user/user.entity';

@Injectable()
export class LoginService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>
  ) {}

  async login (username: string, password: string, req) {
    let user, name
    if (req.session.user && !username) {
      name = req.session.user.username
      user = await this.UserRepository.findOne({
        where: { name, password: req.session.user.password },
        relations: ['roles']
      })
    } else {
      name = username
      user = await this.UserRepository.findOne({
        where: { name, password },
        relations: ['roles']
      })
    }

    if (user) {
      if (!req.session.user) req.session.user = {}
      req.session.user.username = user.name
      req.session.user.password = user.password

      return {
        code: 0,
        msg: 'login successed!',
        user: {
          id: user.id,
          name,
          roles: user.roles
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

  // 注销登录状态，重置session
  async delete (req) {
    if (req.session.user) {
      req.session.user.username = ''
      req.session.user.password = ''
      return {
        code: 0,
        msg: 'logout successed!'
      }
    } else {
      return {
        code: 1,
        msg: 'logout failed!'
      }
    }
  }
}