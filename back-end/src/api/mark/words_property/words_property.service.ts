import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WordsProperty } from '../../../database/words_property/words_property.entity';
import { appendChild } from '../../../tools'

@Injectable()
export class WordsPropertyService {
  constructor(
    @Inject('WordsPropertyRepositoryToken')
    private readonly WordsPropertyRepository: Repository<WordsProperty>
  ) {}

  async findOne (id: number) {
    return this.WordsPropertyRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.WordsPropertyRepository.find()
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
    let item = new WordsProperty()
    item.content = content
    item.parentId = parentId
    let res = await this.WordsPropertyRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async update (id: number, content: string, parentId: number) {
    let item = await this.WordsPropertyRepository.findOne({ id })
    item.content = content
    item.parentId = parentId
    let res = await this.WordsPropertyRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.WordsPropertyRepository.findOne({ id })
    let res = await this.WordsPropertyRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}