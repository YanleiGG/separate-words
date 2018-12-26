import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../../database/user/user.entity';
import { Role } from '../../../database/role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>,
    @Inject('RoleRepositoryToken')
    private readonly RoleRepository: Repository<Role>
  ) {}

  async findOne (id: number) {
    let user = await this.UserRepository.findOne({
      where: {
        id
      },
      relations: ['roles']
    })
    return user
  }

  async findAll () {
    let users = await this.UserRepository.find({relations: ['roles']})
    users.forEach(item => {
      delete item.password
    })
    return {
      code: 0,
      msg: 'success',
      data: users
    }
  }

  async findMarkUser() {
    let users = await this.UserRepository.find({relations: ['roles']})
    users = users.filter(item => {
      return item.roles.some(i => i.name === '任务标注')
    })
    return {
      code: 0,
      msg: 'success',
      data: users
    }
  }

  async create(args) {
    let sameName = await this.UserRepository.findOne({ name: args.username })
    if (sameName) {
      return {
        code: 10001,
        msg: '账号名称已存在!',
        data: null        
      }
    }

    let user = new User()
    user.name = args.username
    user.password = args.password
    let rolePromises = args.selectAuthIds.map(async item => {
      return await this.RoleRepository.findOne({ id: item })
    })
    let roles = await Promise.all(rolePromises)
    user.roles = roles
    await this.UserRepository.save(user)
    return {
      code: 0,
      msg: 'success',
      data: user
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

  async delete (id) {
    let user = await this.UserRepository.findOne({ id })
    await this.UserRepository.remove(user)
    return {
      code: 0,
      msg: 'delete success!'
    }
  }
}