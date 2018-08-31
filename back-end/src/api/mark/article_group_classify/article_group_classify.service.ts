import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleGroupClassify } from '../../../database/article_group_classify/article_group_classify.entity';

@Injectable()
export class ArticleGroupClassifyService {
  constructor(
    @Inject('ArticleGroupClassifyRepositoryToken')
    private readonly ArticleGroupClassifyRepository: Repository<ArticleGroupClassify>,
  ) {}

  async find(offset: number, pageSize: number) {
    let article_group_classifys =  await this.ArticleGroupClassifyRepository.find();
    let totalCount = article_group_classifys.length
    let data = article_group_classifys.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      totalCount,
      article_group_classifys: data
    }
  }

  async findOne (id: number) {
    let article_group_classify =  await this.ArticleGroupClassifyRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      article_group_classify
    }
  }

  async create (args) {
    let article_group_classify = new ArticleGroupClassify()
    article_group_classify.name = args.name
    await this.ArticleGroupClassifyRepository.save(article_group_classify)
    return {
      code: 0,
      msg: 'create successed!',
      article_group_classify
    }
  }

  async update (args) {
    let article_group_classify = await this.ArticleGroupClassifyRepository.findOne({ id: args.id })
    article_group_classify.name = args.name
    await this.ArticleGroupClassifyRepository.save(article_group_classify)
    return {
      code: 0,
      msg: 'update successed!',
      article_group_classify
    }
  }

  async delete ( id: number ) {
    let article = await this.ArticleGroupClassifyRepository.findOne({ id })
    await this.ArticleGroupClassifyRepository.delete(article)
    return {
      code: 0,
      msg: 'delete successed!',
      article
    }
  }
}