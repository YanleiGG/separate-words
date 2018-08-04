import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('UserRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
  ) {}

  async find(offset: number, pageSize: number) {
    let articles =  await this.ArticleRepository.find();
    let totalCount = articles.length
    let data = articles.splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      articles: data
    }
  }

  async findOne (id: number) {
    let article =  await this.ArticleRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      article
    }
  }

  async create (args) {
    let article = new Article()
    article.title = args.title
    article.content = args.content
    article.separateWords = args.separateWords
    article.separateWordsProperty = args.separateWordsProperty
    article.markEntity = args.markEntity
    await this.ArticleRepository.save(article)
    return {
      code: 0,
      msg: 'create successed!',
      article
    }
  }

  async update (args) {
    let article = await this.ArticleRepository.findOne({ id: args.id })
    article.title = args.title
    article.content = args.content
    article.separateWords = args.separateWords
    article.separateWordsProperty = args.separateWordsProperty
    article.markEntity = args.markEntity
    await this.ArticleRepository.save(article)
    return {
      code: 0,
      msg: 'update successed!',
      article
    }
  }

  async delete ( id: number ) {
    let article = await this.ArticleRepository.findOne({ id })
    await this.ArticleRepository.delete(article)
    return {
      code: 0,
      msg: 'delete successed!',
      article
    }
  }
}