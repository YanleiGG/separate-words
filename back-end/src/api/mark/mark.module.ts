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

import { articleGroupClassifyProviders } from '../../database/article_group_classify/article_group_classify.provider'
import { ArticleGroupClassifyService } from './article_group_classify/article_group_classify.service'
import { ArticleGroupClassifyController } from './article_group_classify/article_group_classify.controller'

import { articleGroupEntitiesProviders } from '../../database/article_group_entities/article_group_entities.provider'
import { ArticleGroupEntitiesService } from './article_group_entities/article_group_entities.service'
import { ArticleGroupEntitiesController } from './article_group_entities/article_group_entities.controller'

import { articleGroupWordsPropertyProviders } from '../../database/article_group_words_property/article_group_words_property.provider'
import { ArticleGroupWordsPropertyService } from './article_group_words_property/article_group_words_property.service'
import { ArticleGroupWordsPropertyController } from './article_group_words_property/article_group_words_property.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...articleProviders,
    ...wordsPropertyProviders,
    ...articleEmotionProviders,
    ...articleGroupClassifyProviders,
    ...articleGroupEntitiesProviders,
    ...articleGroupWordsPropertyProviders,
    ArticleService,
    WordsPropertyService,
    ArticleEmotionService,
    ArticleGroupClassifyService,
    ArticleGroupEntitiesService,
    ArticleGroupWordsPropertyService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController,
    ArticleEmotionController,
    ArticleGroupClassifyController,
    ArticleGroupEntitiesController,
    ArticleGroupWordsPropertyController
  ]
})
export class MarkModule {}