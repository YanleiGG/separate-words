import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Entities } from '../../../database/entities/entities.entity';
import { insert } from 'tools/sql';

@Injectable()
export class EntitiesService {
  constructor(
    @Inject('EntitiesRepositoryToken')
    private readonly EntitiesRepository: Repository<Entities>,
  ) {}

  async find(offset: number, pageSize: number) {
    let entities =  await this.EntitiesRepository.find();
    let totalCount = entities.length
    let data = []
    if (offset != undefined) {
      data = entities.reverse().splice(offset, pageSize)
    } else {
      data = entities.reverse()
    }
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      data
    }
  }

  async findOne (id: number) {
    let entities =  await this.EntitiesRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      entities
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
      let sameName = await this.EntitiesRepository.find({ name: names[i] })
      let sameSymbol = await this.EntitiesRepository.find({ symbol: symbols[i] })
      if (sameName.length == 0 || sameSymbol.length == 0) {
        await insert('entities', [
          { key: 'name', value: names[i] },
          { key: 'symbols', value: symbols[i] },
        ])
      }
    }
    return {
      code: 0,
      msg: 'successed!',
    }
  }

  async update (args) {
    let entities = await this.EntitiesRepository.findOne({ id: args.id })
    entities.name = args.name
    entities.symbol = args.symbol
    await this.EntitiesRepository.save(entities)
    return {
      code: 0,
      msg: 'update successed!',
      entities
    }
  }

  async delete ( id: number ) {
    let entities = await this.EntitiesRepository.findOne({ id })
    await this.EntitiesRepository.delete(entities)
    return {
      code: 0,
      msg: 'delete successed!',
      entities
    }
  }
}