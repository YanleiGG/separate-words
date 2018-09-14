import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Article } from '../../../database/article/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @Inject('ArticleRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
  ) {}

  async find(offset: number, pageSize: number) {
    let articles =  await this.ArticleRepository.find();
    let totalCount = articles.length
    let data = articles.reverse().splice(offset, pageSize)
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
    article.text = args.text
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
    article.text = args.text
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