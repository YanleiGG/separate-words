import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WordsProperty } from '../../../database/words_property/words_property.entity';
import { insert } from 'tools/sql';

@Injectable()
export class WordsPropertyService {
  constructor(
    @Inject('WordsPropertyRepositoryToken')
    private readonly WordsPropertyRepository: Repository<WordsProperty>
  ) {}

  async findOne (id: number) {
    return this.WordsPropertyRepository.findOne({ id })
  }

  async find (offset: number, pageSize: number) {
    let data = await this.WordsPropertyRepository.find()
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
      let sameName = await this.WordsPropertyRepository.find({ name: names[i] })
      let sameSymbol = await this.WordsPropertyRepository.find({ symbol: symbols[i] })
      if (sameName.length == 0 || sameSymbol.length == 0) {
        const insertRes = await insert('words_property')
        let item = await this.WordsPropertyRepository.findOne({ id: insertRes.insertId })
        item.name = names[i]
        item.symbol = symbols[i]
        await this.WordsPropertyRepository.save(item) 
      }
    }
    return {
      code: 0,
      msg: 'successed!',
    }
  }

  async update (args) {
    let item = await this.WordsPropertyRepository.findOne({ id: args.id })
    item.name = args.name
    item.symbol = args.symbol
    let res = await this.WordsPropertyRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.WordsPropertyRepository.findOne({ id })
    let res = await this.WordsPropertyRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}