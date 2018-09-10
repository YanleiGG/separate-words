import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Classify } from '../../../database/classify/classify.entity';

@Injectable()
export class ClassifyService {
  constructor(
    @Inject('ClassifyRepositoryToken')
    private readonly ClassifyRepository: Repository<Classify>,
  ) {}

  async find(offset: number, pageSize: number) {
    let classifys =  await this.ClassifyRepository.find();
    let totalCount = classifys.length
    let data = classifys.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      classifys: data
    }
  }

  async findOne (id: number) {
    let classify =  await this.ClassifyRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      classify
    }
  }

  async create (args) {
    let classify = new Classify()
    classify.name = args.name
    classify.value = args.value
    await this.ClassifyRepository.save(classify)
    return {
      code: 0,
      msg: 'create successed!',
      classify
    }
  }

  async update (args) {
    let classify = await this.ClassifyRepository.findOne({ id: args.id })
    classify.name = args.name
    classify.value = args.value
    await this.ClassifyRepository.save(classify)
    return {
      code: 0,
      msg: 'update successed!',
      classify
    }
  }

  async delete ( id: number ) {
    let classify = await this.ClassifyRepository.findOne({ id })
    await this.ClassifyRepository.delete(classify)
    return {
      code: 0,
      msg: 'delete successed!',
      classify
    }
  }
}