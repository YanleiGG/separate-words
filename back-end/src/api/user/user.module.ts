import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { UserProviders } from '../../database/user/user.provider';
import { UserService } from './user.service';
import { UserController } from '../../api/user/user.controller'

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