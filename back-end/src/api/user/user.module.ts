import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserProviders } from '../../database/User/user.providers';
import { UserService } from './user.service';
import { UserController } from '../../api/User/user.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...UserProviders,
    UserService,
  ],
  exports: [...UserProviders],
  controllers: [UserController]
})
export class UserModule {}