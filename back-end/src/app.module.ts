import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/User/user.module'
import { ArticleModule } from './api/Article/article.module'
import { loginModule } from './api/login/login.module'

@Module({
  imports: [UserModule, ArticleModule, loginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
