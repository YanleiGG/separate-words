import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Class } from '../../database/Class/class.entity';
import { appendChild } from '../../tools'

@Injectable()
export class ClassService {
  constructor(
    @Inject('ClassRepositoryToken')
    private readonly ClassRepository: Repository<Class>
  ) {}

  async findOne (id: number) {
    return this.ClassRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.ClassRepository.find()
    let res = []
    data.forEach(item => {
      if (item.parentId == 0) {
        res.push({ ...item, added: true, deleted: false, child: [] })
      } else {
        appendChild(res, { ...item, added: true, deleted: true, child: [] })
      } 
    })
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
  
  async create (content: string, parentId: number) {
    let item = new Class()
    item.content = content
    item.parentId = parentId
    let res = await this.ClassRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async update (id: number, content: string, parentId: number) {
    let item = await this.ClassRepository.findOne({ id })
    item.content = content
    item.parentId = parentId
    let res = await this.ClassRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.ClassRepository.findOne({ id })
    let res = await this.ClassRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}