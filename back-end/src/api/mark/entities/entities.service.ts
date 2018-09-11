import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Entities } from '../../../database/entities/entities.entity';

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
      data = entities
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
    let sameName = await this.EntitiesRepository.find({ name })
    let sameSymbol = await this.EntitiesRepository.find({ symbol })
    if (sameName.length > 0 || sameSymbol.length > 0) {
      return {
        code: 10001,
        msg: '标签名称或代号已存在!',
        data: null        
      }
    }

    let entities = new Entities()
    entities.name = args.name
    entities.symbol = args.symbol
    await this.EntitiesRepository.save(entities)
    return {
      code: 0,
      msg: 'create successed!',
      entities
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