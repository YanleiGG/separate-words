import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleGroupWordsProperty } from '../../../database/article_group_words_property/article_group_words_property.entity';

@Injectable()
export class ArticleGroupWordsPropertyService {
  constructor(
    @Inject('ArticleGroupWordsPropertyRepositoryToken')
    private readonly ArticleGroupWordsPropertyRepository: Repository<ArticleGroupWordsProperty>,
  ) {}

  async find(offset: number, pageSize: number) {
    let article_group_words_propertys =  await this.ArticleGroupWordsPropertyRepository.find();
    let totalCount = article_group_words_propertys.length
    let data = article_group_words_propertys.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      article_group_words_propertys: data
    }
  }

  async findOne (id: number) {
    let article_group_words_property =  await this.ArticleGroupWordsPropertyRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      article_group_words_property
    }
  }

  async create (args) {
    let article_group_words_property = new ArticleGroupWordsProperty()
    article_group_words_property.name = args.name
    await this.ArticleGroupWordsPropertyRepository.save(article_group_words_property)
    return {
      code: 0,
      msg: 'create successed!',
      article_group_words_property
    }
  }

  async update (args) {
    let article_group_words_property = await this.ArticleGroupWordsPropertyRepository.findOne({ id: args.id })
    article_group_words_property.name = args.name
    await this.ArticleGroupWordsPropertyRepository.save(article_group_words_property)
    return {
      code: 0,
      msg: 'update successed!',
      article_group_words_property
    }
  }

  async delete ( id: number ) {
    let article = await this.ArticleGroupWordsPropertyRepository.findOne({ id })
    await this.ArticleGroupWordsPropertyRepository.delete(article)
    return {
      code: 0,
      msg: 'delete successed!',
      article
    }
  }
}