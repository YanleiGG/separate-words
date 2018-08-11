import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { ArticleProviders } from '../../database/Article/article.provider';
import { ArticleService } from '../../api/article/article.service';
import { ArticleController } from '../../api/article/article.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ArticleProviders,
    ArticleService,
  ],
  controllers: [ArticleController]
})
export class ArticleModule {}