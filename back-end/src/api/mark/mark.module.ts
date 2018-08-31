import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { articleProviders } from '../../database/article/article.provider';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller'

import { wordsPropertyProviders } from '../../database/words_property/words_property.provider'
import { WordsPropertyService } from './words_property/words_property.service'
import { WordsPropertyController } from './words_property/words_property.controller'

import { articleEmotionProviders } from '../../database/article_emotion/article_emotion.provider'
import { ArticleEmotionService } from './article_emotion/article_emotion.service'
import { ArticleEmotionController } from './article_emotion/article_emotion.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...articleProviders,
    ...wordsPropertyProviders,
    ...articleEmotionProviders,
    ArticleService,
    WordsPropertyService,
    ArticleEmotionService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController,
    ArticleEmotionController
  ]
})
export class MarkModule {}