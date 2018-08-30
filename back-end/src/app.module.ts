import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/User/user.module'
import { ArticleModule } from './api/Article/article.module'
import { loginModule } from './api/login/login.module'
import { WordsPropertyModule } from './api/words_property/words_property.module'

@Module({
  imports: [UserModule, ArticleModule, loginModule, WordsPropertyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
