import { Module, Inject } from '@nestjs/common';
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

import { contentLabelGroupProviders } from '../../database/contentLabelGroup/contentLabelGroup.provider'
import { ContentLabelGroupService } from './contentLabelGroup/contentLabelGroup.service'
import { ContentLabelGroupController } from './contentLabelGroup/contentLabelGroup.controller'

import { contentLabelProviders } from '../../database/contentLabel/contentLabel.provider'
import { ContentLabelService } from './contentLabel/contentLabel.service'
import { ContentLabelController } from './contentLabel/contentLabel.controller'

import { UploadService } from './upload/upload.service'
import { UploadController } from './upload/upload.controller'

import { typeProviders } from '../../database/type/type.provider'

import { userProviders } from '../../database/user/user.provider'

import { DocsProviders } from 'database/docs/docs.provider';
import { DocsService } from './docs/docs.service';
import { DocsController } from './docs/docs.controller';
import { Repository } from 'typeorm';
import { Type } from 'database/type/type.entity';
import { EmotionTypeGroup } from 'database/emotionTypeGroup/emotionTypeGroup.entity';
import { WordsProperty } from 'database/words_property/words_property.entity';
import { Entities } from 'database/entities/entities.entity';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...taskProviders,
    ...articleProviders,
    ...wordsPropertyProviders,
    ...emotionProviders,
    ...wordsPropertyGroupProviders,
    ...entitiesProviders,
    ...entitiesGroupProviders,
    ...markEntityProviders,
    ...sepWordsPropertyProviders,
    ...typeProviders,
    ...userProviders,
    ...emotionTypeProviders,
    ...emotionTypeGroupProviders,
    ...contentLabelGroupProviders,
    ...contentLabelProviders,
    ...DocsProviders,
    ArticleService,
    WordsPropertyService,
    EmotionService,
    WordsPropertyGroupService,
    EntitiesService,
    EntitiesGroupService,
    MarkEntityService,
    SepWordsPropertyService,
    TaskService,
    UploadService,
    EmotionTypeService,
    EmotionTypeGroupService,
    ContentLabelGroupService,
    ContentLabelService,
    DocsService
  ],
  controllers: [
    ArticleController,
    WordsPropertyController,
    EmotionController,
    WordsPropertyGroupController,
    EntitiesController,
    EntitiesGroupController,
    MarkEntityController,
    SepWordsPropertyController,
    TaskController,
    UploadController,
    EmotionTypeController,
    EmotionTypeGroupController,
    ContentLabelGroupController,
    ContentLabelController,
    DocsController
  ]
})
export class MarkModule {
  constructor(
    @Inject('TypeRepositoryToken')
    private readonly TypeRepository: Repository<Type>,
    @Inject('EmotionTypeGroupRepositoryToken')
    private readonly EmotionTypeGroupRepository: Repository<EmotionTypeGroup>,
    @Inject('WordsPropertyRepositoryToken')
    private readonly WordsPropertyRepository: Repository<WordsProperty>,
    @Inject('EntitiesRepositoryToken')
    private readonly EntitiesRepository: Repository<Entities>,
  ) {
    this.TypeRepository.find().then(async types => {
      if (types.length === 0) {
        let separateWordsProperty = new Type()
        let contentType = new Type()
        let emotion = new Type()
        let markEntity = new Type()
        separateWordsProperty.symbol = 'separateWordsProperty'
        separateWordsProperty.name = '分词与词性标注'
        contentType.symbol = 'contentType'
        contentType.name = '文本内容分类标注'
        emotion.symbol = 'emotion'
        emotion.name = '情感标注'
        markEntity.symbol = 'markEntity'
        markEntity.name = '实体标注'
        await this.TypeRepository.save([separateWordsProperty, contentType, emotion, markEntity])
      }
    })
    this.EmotionTypeGroupRepository.find().then(async emotionTypeGroups => {
      if (emotionTypeGroups.length === 0) {
        let emotionTypeGroup = new EmotionTypeGroup()
        emotionTypeGroup.name = '默认'
        await this.EmotionTypeGroupRepository.save(emotionTypeGroup)
      }
    })
    this.WordsPropertyRepository.find().then(async WordsPropertys => {
      if (WordsPropertys.length === 0) {
        words_propertys.map(async item => {
          let wordsProperty = new WordsProperty()
          wordsProperty.name = item.name
          wordsProperty.symbol = item.symbol
          await this.WordsPropertyRepository.save(wordsProperty)
        })
      }
    })
    this.EntitiesRepository.find().then(async entitys => {
      if (entitys.length === 0) {
        entities.map(async item => {
          let entity = new Entities()
          entity.name = item.name
          entity.symbol = item.symbol
          await this.EntitiesRepository.save(entity)
        })
      }
    })
  }
}

const entities = [
  { name: '人名', symbol: 'pers' },
  { name: '地名', symbol: 'rgn' },
  { name: '组织机构名', symbol: 'org' },
]

const words_propertys = [
  { name: '形容词', symbol: 'a' },
  { name: '副形词', symbol: 'ad' },
  { name: '形语素', symbol: 'ag' },
  { name: '名形词', symbol: 'an' },
  { name: '区别词', symbol: 'b' },
  { name: '连词', symbol: 'c' },
  { name: '副词', symbol: 'd' },
  { name: '副语素', symbol: 'dg' },
  { name: '叹词', symbol: 'e' },
  { name: '方位词', symbol: 'f' },
  { name: '语素', symbol: 'g' },
  { name: '前接成分', symbol: 'h' },
  { name: '成语', symbol: 'i' },
  { name: '简称略语', symbol: 'j' },
  { name: '后接成分', symbol: 'k' },
  { name: '习用语', symbol: 'l' },
  { name: '名词', symbol: 'n' },
  { name: '名语素', symbol: 'ng' },
  { name: '人名', symbol: 'nr' },
  { name: '地名', symbol: 'ns' },
  { name: '机构团体', symbol: 'nt' },
  { name: '字母专名', symbol: 'nx' },
  { name: '其它专名', symbol: 'nz' },
  { name: '拟声词', symbol: 'o' },
  { name: '介词', symbol: 'p' },
  { name: '量词', symbol: 'q' },
  { name: '代词', symbol: 'r' },
  { name: '处所词', symbol: 's' },
  { name: '时间词', symbol: 't' },
  { name: '时语素', symbol: 'tg' },
  { name: '助词', symbol: 'u' },
  { name: '结构助词', symbol: 'ud' },
  { name: '时态助词', symbol: 'ug' },
  { name: '结构助词的', symbol: 'uj' },
  { name: '时态助词了', symbol: 'ul' },
  { name: '结构助词地', symbol: 'uv' },
  { name: '时态助词着', symbol: 'uz' },
  { name: '动词', symbol: 'v' },
  { name: '副动词', symbol: 'vd' },
  { name: '动语素', symbol: 'vg' },
  { name: '名动词', symbol: 'vn' },
  { name: '标点符号', symbol: 'w' },
  { name: '非语素词', symbol: 'x' },
  { name: '语气词', symbol: 'y' },
  { name: '状态词', symbol: 'z' }
]