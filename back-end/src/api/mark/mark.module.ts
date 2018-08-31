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

import { wordsPropertyGroupProviders } from '../../database/words_property_group/words_property_group.provider'
import { WordsPropertyGroupService } from './words_property_group/words_property_group.service'
import { WordsPropertyGroupController } from './words_property_group/words_property_group.controller'

import { classifyProviders } from '../../database/classify/classify.provider'
import { ClassifyService } from './classify/classify.service'
import { ClassifyController } from './classify/classify.controller'

import { classifyGroupProviders } from '../../database/classify_group/classify_group.provider'
import { ClassifyGroupService } from './classify_group/classify_group.service'
import { ClassifyGroupController } from './classify_group/classify_group.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...articleProviders,
    ...wordsPropertyProviders,
    ...articleEmotionProviders,
    ...articleGroupClassifyProviders,
    ...articleGroupEntitiesProviders,
    ...articleGroupWordsPropertyProviders,
    ...wordsPropertyGroupProviders,
    ...classifyProviders,
    ...classifyGroupProviders,
    ArticleService,
    WordsPropertyService,
    ArticleEmotionService,
    ArticleGroupClassifyService,
    ArticleGroupEntitiesService,
    ArticleGroupWordsPropertyService,
    WordsPropertyGroupService,
    ClassifyService,
    ClassifyGroupService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController,
    ArticleEmotionController,
    ArticleGroupClassifyController,
    ArticleGroupEntitiesController,
    ArticleGroupWordsPropertyController,
    WordsPropertyGroupController,
    ClassifyController,
    ClassifyGroupController
  ]
})
export class MarkModule {}