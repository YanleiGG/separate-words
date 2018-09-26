import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { userProviders } from '../../database/user/user.provider';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller'

import { LoginService } from './login/login.service'
import { LoginController } from './login/login.controller'

import { roleProviders } from '../../database/role/role.provider';
import { RoleService } from './role/role.service';
import { RoleController } from './role/role.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    ...roleProviders,
    UserService,
    LoginService,
    RoleService
  ],
  controllers: [
    UserController,
    LoginController,
    RoleController
  ]
  // exports: [...userProviders],
})
export class AuthModule {}