import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './database/User/user.module'
import { ArticleModule } from './database/Article/article.module'

@Module({
  imports: [UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
