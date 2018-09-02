import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';

import { articleProviders } from '../../database/article/article.provider';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller'

import { wordsPropertyProviders } from '../../database/words_property/words_property.provider'
import { WordsPropertyService } from './words_property/words_property.service'
import { WordsPropertyController } from './words_property/words_property.controller'

import { emotionProviders } from '../../database/emotion/emotion.provider'
import { EmotionService } from './emotion/emotion.service'
import { EmotionController } from './emotion/emotion.controller'

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

import { entitiesProviders } from '../../database/entities/entities.provider'
import { EntitiesService } from './entities/entities.service'
import { EntitiesController } from './entities/entities.controller'

import { entitiesGroupProviders } from '../../database/entities_group/entities_group.provider'
import { EntitiesGroupService } from './entities_group/entities_group.service'
import { EntitiesGroupController } from './entities_group/entities_group.controller'

import { markEntityProviders } from "../../database/mark_entity/mark_entity.provider" 
import { MarkEntityService } from './mark_entity/mark_entity.service'
import { MarkEntityController } from './mark_entity/mark_entity.controller'

import { sepWordsPropertyProviders } from '../../database/sep_words_property/sep_words_property.provider'
import { SepWordsPropertyService } from './sep_words_property/sep_words_property.service'
import { SepWordsPropertyController } from './sep_words_property/sep_words_property.controller'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...articleProviders,
    ...wordsPropertyProviders,
    ...emotionProviders,
    ...articleGroupClassifyProviders,
    ...articleGroupEntitiesProviders,
    ...articleGroupWordsPropertyProviders,
    ...wordsPropertyGroupProviders,
    ...classifyProviders,
    ...classifyGroupProviders,
    ...entitiesProviders,
    ...entitiesGroupProviders,
    ...markEntityProviders,
    ...sepWordsPropertyProviders,
    ArticleService,
    WordsPropertyService,
    EmotionService,
    ArticleGroupClassifyService,
    ArticleGroupEntitiesService,
    ArticleGroupWordsPropertyService,
    WordsPropertyGroupService,
    ClassifyService,
    ClassifyGroupService,
    EntitiesService,
    EntitiesGroupService,
    MarkEntityService,
    SepWordsPropertyService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController,
    EmotionController,
    ArticleGroupClassifyController,
    ArticleGroupEntitiesController,
    ArticleGroupWordsPropertyController,
    WordsPropertyGroupController,
    ClassifyController,
    ClassifyGroupController,
    EntitiesController,
    EntitiesGroupController,
    MarkEntityController,
    SepWordsPropertyController
  ]
})
export class MarkModule {}