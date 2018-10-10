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

import { emotionTypeProviders } from "../../database/emotionType/emotionType.provider" 
import { EmotionTypeService } from './emotionType/emotionType.service'
import { EmotionTypeController } from './emotionType/emotionType.controller' 

import { emotionTypeGroupProviders } from "../../database/emotionTypeGroup/emotionTypeGroup.provider" 
import { EmotionTypeGroupService } from './emotionTypeGroup/emotionTypeGroup.service'
import { EmotionTypeGroupController } from './emotionTypeGroup/emotionTypeGroup.controller' 

import { sepWordsPropertyProviders } from '../../database/sep_words_property/sep_words_property.provider'
import { SepWordsPropertyService } from './sep_words_property/sep_words_property.service'
import { SepWordsPropertyController } from './sep_words_property/sep_words_property.controller'

import { taskProviders } from '../../database/task/task.provider'
import { TaskService } from './task/task.service'
import { TaskController } from './task/task.controller'

import { UploadService } from './upload/upload.service'
import { UploadController } from './upload/upload.controller'

import { typeProviders } from '../../database/type/type.provider'

import { userProviders } from '../../database/user/user.provider'

@Module({
  imports: [DatabaseModule],
  providers: [
    ...taskProviders,
    ...articleProviders,
    ...wordsPropertyProviders,
    ...emotionProviders,
    ...wordsPropertyGroupProviders,
    ...classifyProviders,
    ...classifyGroupProviders,
    ...entitiesProviders,
    ...entitiesGroupProviders,
    ...markEntityProviders,
    ...sepWordsPropertyProviders,
    ...typeProviders,
    ...userProviders,
    ...emotionTypeProviders,
    ...emotionTypeGroupProviders,
    ArticleService,
    WordsPropertyService,
    EmotionService,
    WordsPropertyGroupService,
    ClassifyService,
    ClassifyGroupService,
    EntitiesService,
    EntitiesGroupService,
    MarkEntityService,
    SepWordsPropertyService,
    TaskService,
    UploadService,
    EmotionTypeService,
    EmotionTypeGroupService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController,
    EmotionController,
    WordsPropertyGroupController,
    ClassifyController,
    ClassifyGroupController,
    EntitiesController,
    EntitiesGroupController,
    MarkEntityController,
    SepWordsPropertyController,
    TaskController,
    UploadController,
    EmotionTypeController,
    EmotionTypeGroupController
  ]
})
export class MarkModule {}