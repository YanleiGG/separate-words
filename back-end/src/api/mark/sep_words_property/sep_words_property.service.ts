import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SepWordsProperty } from '../../../database/sep_words_property/sep_words_property.entity';

@Injectable()
export class SepWordsPropertyService {
  constructor(
    @Inject('SepWordsPropertyRepositoryToken')
    private readonly SepWordsPropertyRepository: Repository<SepWordsProperty>,
  ) {}

  async find(offset: number, pageSize: number) {
    let sep_words_propertys =  await this.SepWordsPropertyRepository.find();
    let data = sep_words_propertys.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      sep_words_propertys: data
    }
  }

  async findOne (id: number) {
    let sep_words_property =  await this.SepWordsPropertyRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      sep_words_property
    }
  }

  async create (args) {
    let sep_words_property = new SepWordsProperty()
    sep_words_property.separateWords = args.separateWords
    sep_words_property.separateWordsProperty = args.separateWordsProperty
    await this.SepWordsPropertyRepository.save(sep_words_property)
    return {
      code: 0,
      msg: 'create successed!',
      sep_words_property
    }
  }

  async update (args) {
    let sep_words_property = await this.SepWordsPropertyRepository.findOne({ id: args.id })
    sep_words_property.separateWords = args.separateWords
    sep_words_property.separateWordsProperty = args.separateWordsProperty
    await this.SepWordsPropertyRepository.save(sep_words_property)
    return {
      code: 0,
      msg: 'update successed!',
      sep_words_property
    }
  }

  async delete ( id: number ) {
    let sep_words_property = await this.SepWordsPropertyRepository.findOne({ id })
    await this.SepWordsPropertyRepository.delete(sep_words_property)
    return {
      code: 0,
      msg: 'delete successed!',
      sep_words_property
    }
  }
}