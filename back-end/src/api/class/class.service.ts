import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Class } from '../../database/Class/class.entity';
  
@Injectable()
export class ClassService {
  constructor(
    @Inject('ClassRepositoryToken')
    private readonly ClassRepository: Repository<Class>
  ) {}

  async find (id: number) {
    let classType = await this.ClassRepository.findOne({ id })
    return {
      code: 0,
      msg: 'successed!',
      data: classType
    }
  }

  async create (single: string, double: string, much: string) {
    let classType = new Class()
    classType.single = JSON.stringify(single)
    classType.double = JSON.stringify(double)
    classType.much = JSON.stringify(much)
    await this.ClassRepository.save(classType)
    return {
      code: 0,
      msg: 'create successed!',
      data: classType
    }
  }

  async update (id: number, single: string, double: string, much: string) {
    let classType = await this.ClassRepository.findOne({ id })
    classType.single = JSON.stringify(single)
    classType.double = JSON.stringify(double)
    classType.much = JSON.stringify(much)
    await this.ClassRepository.save(classType)
    return {
      code: 0,
      msg: 'update successed!',
      data: classType
    }
  }

  async delete (id: number) {
    let classType = await this.ClassRepository.findOne({ id })
    await this.ClassRepository.delete(classType)
    return {
      code: 0,
      msg: 'delete successed!',
      data: classType
    }
  }
}