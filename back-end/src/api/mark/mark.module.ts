import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { articleProviders } from '../../database/article/article.provider';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller'
import { wordsPropertyProviders } from '../../database/words_property/words_property.provider'
import { WordsPropertyService } from './words_property/words_property.service'
import { WordsPropertyController } from './words_property/words_property.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...articleProviders,
    ...wordsPropertyProviders,
    ArticleService,
    WordsPropertyService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController
  ]
})
export class MarkModule {}