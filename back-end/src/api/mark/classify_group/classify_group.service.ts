import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClassifyGroup } from '../../../database/classify_group/classify_group.entity';

@Injectable()
export class ClassifyGroupService {
  constructor(
    @Inject('ClassifyGroupRepositoryToken')
    private readonly ClassifyRepository: Repository<ClassifyGroup>,
  ) {}

  async find(offset: number, pageSize: number) {
    let classify_groups =  await this.ClassifyRepository.find();
    let totalCount = classify_groups.length
    let data = classify_groups.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      classify_groups: data
    }
  }

  async findOne (id: number) {
    let classify_group =  await this.ClassifyRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      classify_group
    }
  }

  async create (args) {
    let classify_group = new ClassifyGroup()
    classify_group.name = args.name
    await this.ClassifyRepository.save(classify_group)
    return {
      code: 0,
      msg: 'create successed!',
      classify_group
    }
  }

  async update (args) {
    let classify_group = await this.ClassifyRepository.findOne({ id: args.id })
    classify_group.name = args.name
    await this.ClassifyRepository.save(classify_group)
    return {
      code: 0,
      msg: 'update successed!',
      classify_group
    }
  }

  async delete ( id: number ) {
    let classify_group = await this.ClassifyRepository.findOne({ id })
    await this.ClassifyRepository.delete(classify_group)
    return {
      code: 0,
      msg: 'delete successed!',
      classify_group
    }
  }
}