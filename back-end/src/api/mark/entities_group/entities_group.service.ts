import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EntitiesGroup } from '../../../database/entities_group/entities_group.entity';
import { Entities } from '../../../database/entities/entities.entity'

@Injectable()
export class EntitiesGroupService {
  constructor(
    @Inject('EntitiesGroupRepositoryToken')
    private readonly EntitiesGroupRepository: Repository<EntitiesGroup>,
    @Inject('EntitiesRepositoryToken')
    private readonly EntitiesRepository: Repository<Entities>,
  ) {}

  async find(offset: number, pageSize: number) {
    let entities_groups =  await this.EntitiesGroupRepository.find();
    let totalCount = entities_groups.length
    let data = entities_groups.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      entities_groups: data
    }
  }

  async findOne (id: number) {
    let entities_group =  await this.EntitiesGroupRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      entities_group
    }
  }

  async create (args) {
    let { name } = args
    let sameName = await this.EntitiesRepository.find({ name })
    if (sameName.length > 0) {
      return {
        code: 10001,
        msg: '标签集合名称已存在!',
        data: null        
      }
    }

    let entitiesGroup = new EntitiesGroup(), 
        {labels} = args
    entitiesGroup.name = name
    entitiesGroup.entities = []
    for (let i = 0; i < labels.length; i++) {
      entitiesGroup.entities.push(await this.EntitiesRepository.findOne({ name: labels[i] }))
    }
    await this.EntitiesGroupRepository.save(entitiesGroup)
    console.log(await this.EntitiesGroupRepository.find({ relations: ["entities"] }))
    return {
      code: 0,
      msg: 'create successed!',
      data: entitiesGroup
    }
  }

  async update (args) {
    let entities_group = await this.EntitiesGroupRepository.findOne({ id: args.id })
    entities_group.name = args.name
    await this.EntitiesGroupRepository.save(entities_group)
    return {
      code: 0,
      msg: 'update successed!',
      entities_group
    }
  }

  async delete ( id: number ) {
    let entities_group = await this.EntitiesGroupRepository.findOne({ id })
    await this.EntitiesGroupRepository.delete(entities_group)
    return {
      code: 0,
      msg: 'delete successed!',
      entities_group
    }
  }
}