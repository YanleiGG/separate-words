import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/User/user.module'
import { ArticleModule } from './api/Article/article.module'
import { loginModule } from './api/login/login.module'
import { classModule } from './api/class/class.module'

@Module({
  imports: [UserModule, ArticleModule, loginModule, classModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
