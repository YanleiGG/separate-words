import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WordsPropertyGroup } from '../../../database/words_property_group/words_property_group.entity';
import { WordsProperty } from '../../../database/words_property/words_property.entity'

@Injectable()
export class WordsPropertyGroupService {
  constructor(
    @Inject('WordsPropertyGroupRepositoryToken')
    private readonly WordsPropertyGroupRepository: Repository<WordsPropertyGroup>,
    @Inject('WordsPropertyRepositoryToken')
    private readonly WordsPropertyRepository: Repository<WordsProperty>
  ) {}

  async findOne (id: number) {
    return this.WordsPropertyGroupRepository.findOne({ id })
  }

  async findAll () {
    let data = await this.WordsPropertyGroupRepository.find({relations: ["words_propertys"]})
    return {
      code: 0,
      msg: 'successed!',
      data
    }
  }
  
  async create (args) {
    let { name } = args
    let sameName = await this.WordsPropertyGroupRepository.find({ name })
    if (sameName.length > 0) {
      return {
        code: 10001,
        msg: '标签集合名称已存在!',
        data: null        
      }
    }

    let wordsPropertyGroup = new WordsPropertyGroup(), 
        {labels} = args
    wordsPropertyGroup.name = name
    wordsPropertyGroup.words_propertys = []
    let res = await this.WordsPropertyGroupRepository.save(wordsPropertyGroup)
    for (let i = 0; i < labels.length; i++) {
      wordsPropertyGroup.words_propertys.push(await this.WordsPropertyRepository.findOne({ name: labels[i] }))
    }
    await this.WordsPropertyGroupRepository.save(wordsPropertyGroup)
    // console.log(await this.WordsPropertyGroupRepository.find({ relations: ["words_propertys"] }))
    return {
      code: 0,
      msg: 'successed!',
      data: res
    }
  }

  async update (args) {
    let item = await this.WordsPropertyGroupRepository.findOne({ id: args.id })
    item.name = args.name
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