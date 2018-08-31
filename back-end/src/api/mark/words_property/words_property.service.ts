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
  
  async create (args) {
    let item = new WordsProperty()
    item.name = args.name
    item.parentId = args.parentId || null
    let res = await this.WordsPropertyRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async update (args) {
    let item = await this.WordsPropertyRepository.findOne({ id: args.id })
    item.name = args.name
    item.parentId = args.parentId || null
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