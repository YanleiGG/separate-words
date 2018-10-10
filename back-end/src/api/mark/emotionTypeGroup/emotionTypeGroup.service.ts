import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmotionTypeGroup } from '../../../database/emotionTypeGroup/emotionTypeGroup.entity';
import { EmotionType } from '../../../database/emotionType/emotionType.entity'
import { Type } from '../../../database/type/type.entity'

@Injectable()
export class EmotionTypeGroupService {
  constructor(
    @Inject('EmotionTypeGroupRepositoryToken')
    private readonly EmotionTypeGroupRepository: Repository<EmotionTypeGroup>,
    @Inject('EmotionTypeRepositoryToken')
    private readonly EmotionTypeRepository: Repository<EmotionType>,
    @Inject('TypeRepositoryToken')
    private readonly TypeRepository: Repository<Type>,
  ) {}

  async findOne (id: number) {
    return this.EmotionTypeGroupRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.EmotionTypeGroupRepository.find({relations: ["emotionTypes"]})
    return {
      code: 0,
      msg: 'successed!',
      data
    }
  }
  
  async create (args) {
    let { name } = args
    let sameName = await this.EmotionTypeGroupRepository.find({ name })
    if (sameName.length > 0) {
      return {
        code: 10001,
        msg: '标签集合名称已存在!',
        data: null        
      }
    }

    let wordsPropertyGroup = new EmotionTypeGroup(), 
        {labels} = args
    let type = await this.TypeRepository.findOne({ symbol: 'separateWordsProperty' })
    wordsPropertyGroup.name = name
    wordsPropertyGroup.emotionTypes = []
    let res = await this.EmotionTypeGroupRepository.save(wordsPropertyGroup)
    for (let i = 0; i < labels.length; i++) {
      wordsPropertyGroup.emotionTypes.push(await this.EmotionTypeRepository.findOne({ name: labels[i] }))
    }
    await this.EmotionTypeGroupRepository.save(wordsPropertyGroup)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async update (args) {
    let item = await this.EmotionTypeGroupRepository.findOne({ id: args.id })
    item.name = args.name
    let res = await this.EmotionTypeGroupRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.EmotionTypeGroupRepository.findOne({ id })
    let res = await this.EmotionTypeGroupRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}