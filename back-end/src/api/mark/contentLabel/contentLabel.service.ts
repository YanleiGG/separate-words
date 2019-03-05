import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContentLabel } from '../../../database/ContentLabel/ContentLabel.entity';
import { insert } from 'tools/sql';

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
    let { name, mainId } = args
    let sameName = await this.ContentLabelRepository.find({ name })
    let sameSymbol = await this.ContentLabelRepository.find({ mainId })
    if (sameName.length > 0 || sameSymbol.length > 0) {
      return {
        code: 10001,
        msg: '标签名称或代号已存在!',
        data: null        
      }
    }

    const insertRes = await insert('contentLabel', [
      { key: 'name', value: name },
      { key: 'mainId', value: mainId }
    ])
    const contentLabel = await this.ContentLabelRepository.findOne({ id: insertRes.insertId })
    return {
      code: 0,
      msg: 'successed!',
      data: contentLabel
    }
  }

  async update (args) {
    let item = await this.ContentLabelRepository.findOne({ id: args.id })
    item.name = args.name
    item.mainId = args.symbol
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