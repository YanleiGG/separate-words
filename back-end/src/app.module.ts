import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './entity/User/user.module'
import { ArticleModule } from './entity/Article/article.module.ts'

@Module({
  imports: [UserModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
