import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EmotionType } from '../../../database/emotionType/emotionType.entity';

@Injectable()
export class EmotionTypeService {
  constructor(
    @Inject('EmotionTypeRepositoryToken')
    private readonly EmotionTypeRepository: Repository<EmotionType>
  ) {}

  async findOne (id: number) {
    return this.EmotionTypeRepository.findOne({ id })
  }

  async find (offset: number, pageSize: number) {
    let data = await this.EmotionTypeRepository.find()
    let totalCount = data.length
    if (offset != undefined) {
      data = data.reverse().splice(offset, pageSize)
    }
    return {
      code: 0,
      msg: 'successed!',
      data: data.reverse(),
      totalCount
    }
  }
  
  async create (args) {
    let { name, symbol } = args
    let sameName = await this.EmotionTypeRepository.find({ name })
    let sameSymbol = await this.EmotionTypeRepository.find({ symbol })
    if (sameName.length > 0 || sameSymbol.length > 0) {
      return {
        code: 10001,
        msg: '标签名称或代号已存在!',
        data: null        
      }
    }

    let item = new EmotionType()
    item.name = name
    item.symbol = symbol
    let wordsProperty = await this.EmotionTypeRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: wordsProperty
    }
  }

  async update (args) {
    let item = await this.EmotionTypeRepository.findOne({ id: args.id })
    item.name = args.name
    item.symbol = args.symbol
    let res = await this.EmotionTypeRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.EmotionTypeRepository.findOne({ id })
    let res = await this.EmotionTypeRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}