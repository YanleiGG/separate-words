import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserProviders } from '../../database/User/user.providers';
import { loginService } from './login.service';
import { loginController } from './login.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...UserProviders,
    loginService,
  ],
  exports: [...UserProviders],
  controllers: [loginController]
})
export class loginModule {}