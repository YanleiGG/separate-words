import { Module, Inject } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { roleProviders } from '../../database/role/role.provider';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller'

import { userProviders } from '../../database/user/user.provider';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller'

import { LoginService } from './login/login.service'
import { LoginController } from './login/login.controller'
import { Role } from 'database/role/role.entity';
import { User } from 'database/user/user.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...roleProviders,
    ...userProviders,
    RoleService,
    LoginService,
    UserService,
  ],
  controllers: [
    UserController,
    LoginController,
    RoleController
  ]
  // exports: [...userProviders],
})
export class AuthModule {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly UserRepository: Repository<User>,
    @Inject('RoleRepositoryToken')
    private readonly RoleRepository: Repository<Role>
  ) {
    // 初始化数据
    this.RoleRepository.findOne({ name: '用户管理' }).then(role => {
      if (!role) {
        let userManageRole = new Role()
        let taskAndLabelManageRole = new Role()
        let dataManageRole = new Role()
        let markRole = new Role()
        userManageRole.name = '用户管理'
        taskAndLabelManageRole.name = '任务及标签管理'
        dataManageRole.name = '数据管理'
        markRole.name = '任务标注'
        this.RoleRepository.save([userManageRole, taskAndLabelManageRole, dataManageRole, markRole])
      }
    })
    this.UserRepository.findOne({name: 'admin'}).then(async user => {
      if (!user) {
        let user = new User()
        user.name = 'admin'
        user.password = '123'
        user.roles = []
        user.roles = await this.RoleRepository.find()
        while(user.roles.length === 0) {
          user.roles = await this.RoleRepository.find()
        }
        await this.UserRepository.save(user)
      }
    })
  }
}