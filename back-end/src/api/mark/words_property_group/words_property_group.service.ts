import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WordsPropertyGroup } from '../../../database/words_property_group/words_property_group.entity';
import { appendChild } from '../../../tools'

@Injectable()
export class WordsPropertyGroupService {
  constructor(
    @Inject('WordsPropertyGroupRepositoryToken')
    private readonly WordsPropertyGroupRepository: Repository<WordsPropertyGroup>
  ) {}

  async findOne (id: number) {
    return this.WordsPropertyGroupRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.WordsPropertyGroupRepository.find()
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
    let item = new WordsPropertyGroup()
    item.name = args.name
    item.parentId = args.parentId
    let res = await this.WordsPropertyGroupRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async update (args) {
    let item = await this.WordsPropertyGroupRepository.findOne({ id: args.id })
    item.name = args.name
    item.parentId = args.parentId
    let res = await this.WordsPropertyGroupRepository.save(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async delete (id: number) {
    let item = await this.WordsPropertyGroupRepository.findOne({ id })
    let res = await this.WordsPropertyGroupRepository.delete(item)
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }
}