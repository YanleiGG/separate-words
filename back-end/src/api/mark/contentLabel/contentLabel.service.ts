import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContentLabel } from '../../../database/ContentLabel/ContentLabel.entity';

@Injectable()
export class ContentLabelService {
  constructor(
    @Inject('ContentLabelRepositoryToken')
    private readonly ContentLabelRepository: Repository<ContentLabel>
  ) {}

  async findOne (id: number) {
    return this.ContentLabelRepository.findOne({ id })
  }

  async find (offset: number, pageSize: number) {
    let data = await this.ContentLabelRepository.find()
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
    let sameName = await this.ContentLabelRepository.find({ name })
    let sameSymbol = await this.ContentLabelRepository.find({ symbol })
    if (sameName.length > 0 || sameSymbol.length > 0) {
      return {
        code: 10001,
        msg: '标签名称或代号已存在!',
        data: null        
      }
    }

    let item = new ContentLabel()
    item.name = name
    item.symbol = symbol
    let wordsProperty = await this.ContentLabelRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: wordsProperty
    }
  }

  async update (args) {
    let item = await this.ContentLabelRepository.findOne({ id: args.id })
    item.name = args.name
    item.symbol = args.symbol
    let res = await this.ContentLabelRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.ContentLabelRepository.findOne({ id })
    let res = await this.ContentLabelRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}