import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database.module';
import { ArticleProviders } from './article.provider';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...ArticleProviders,
    ArticleService,
  ],
  controllers: [ArticleController]
})
export class ArticleModule {}