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
    let data = entities.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      entities: data
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
    let entities = new Entities()
    entities.name = args.name
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