import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WordsProperty } from '../../../database/words_property/words_property.entity';
import { appendChild } from '../../../tools'

@Injectable()
export class WordsPropertyService {
  constructor(
    @Inject('WordsPropertyRepositoryToken')
    private readonly WordsPropertyRepository: Repository<WordsProperty>
  ) {}

  async findOne (id: number) {
    return this.WordsPropertyRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.WordsPropertyRepository.find()
    return {
      code: 0,
      msg: 'successed!',
      data
    }
  }
  
  async create (args) {
    let { name, symbol } = args
    let sameName = await this.WordsPropertyRepository.find({ name })
    let sameSymbol = await this.WordsPropertyRepository.find({ symbol })
    if (sameName.length > 0 || sameSymbol.length > 0) {
      return {
        code: 10001,
        msg: '标签名称或代号已存在!',
        data: null        
      }
    }

    let item = new WordsProperty()
    item.name = name
    item.symbol = symbol
    let wordsProperty = await this.WordsPropertyRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: wordsProperty
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