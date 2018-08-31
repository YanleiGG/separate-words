import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { userProviders } from '../../database/user/user.provider';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller'

import { LoginService } from './login/login.service'
import { LoginController } from './login/login.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
    LoginService
  ],
  controllers: [
    UserController,
    LoginController
  ]
  // exports: [...userProviders],
})
export class AuthModule {}