import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SepWordsProperty } from '../../../database/sep_words_property/sep_words_property.entity';
import { Article } from '../../../database/article/article.entity'

@Injectable()
export class SepWordsPropertyService {
  constructor(
    @Inject('SepWordsPropertyRepositoryToken')
    private readonly SepWordsPropertyRepository: Repository<SepWordsProperty>,
    @Inject('ArticleRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
  ) {}

  async find(offset: number, pageSize: number) {
    let sep_words_propertys =  await this.SepWordsPropertyRepository.find({relations: ['article']});
    let totalCount = sep_words_propertys.length
    let data = sep_words_propertys.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      sep_words_propertys: data,
      totalCount
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
    let article = await this.ArticleRepository.findOne({ id: args.articleId })
    sep_words_property.separateWords = args.separateWords || null
    sep_words_property.separateWordsProperty = args.separateWordsProperty || null
    sep_words_property.article = article
    await this.ArticleRepository.save(article)
    await this.SepWordsPropertyRepository.save(sep_words_property)
    return {
      code: 0,
      msg: 'create successed!',
      data: sep_words_property
    }
  }

  async update (args) {
    let sep_words_property = await this.SepWordsPropertyRepository.findOne({ id: args.id })
    sep_words_property.separateWords = args.separateWords || null
    sep_words_property.separateWordsProperty = args.separateWordsProperty || null
    await this.SepWordsPropertyRepository.save(sep_words_property)
    return {
      code: 0,
      msg: 'update successed!',
      data: sep_words_property
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