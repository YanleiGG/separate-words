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
    let data = await this.EmotionTypeRepository.find({
      skip: offset,
      take: pageSize
    })
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
    let names = name.split(';')
    let symbols = symbol.split(';')
    if (names.length !== symbols.length) {
      return {
        code: 10001,
        msg: '创建失败，标签数量与代号数量不一致!',
        data: null        
      }
    }
    for (let i = 0;i < names.length;i++) {
      if (name[i]==='' || symbol[i] === '') continue;  // 过滤为''的标签
      let sameName = await this.EmotionTypeRepository.find({ name: names[i] })
      let sameSymbol = await this.EmotionTypeRepository.find({ symbol: symbols[i] })
      if (sameName.length == 0 || sameSymbol.length == 0) {
        let item = new EmotionType()
        item.name = names[i]
        item.symbol = symbols[i]
        await this.EmotionTypeRepository.save(item) 
      }
    }
    return {
      code: 0,
      msg: 'successed!',
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