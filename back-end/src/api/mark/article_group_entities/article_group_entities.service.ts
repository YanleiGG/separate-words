import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleGroupEntities } from '../../../database/article_group_entities/article_group_entities.entity';

@Injectable()
export class ArticleGroupEntitiesService {
  constructor(
    @Inject('ArticleGroupEntitiesRepositoryToken')
    private readonly ArticleGroupEntitiesRepository: Repository<ArticleGroupEntities>,
  ) {}

  async find(offset: number, pageSize: number) {
    let article_group_classifys =  await this.ArticleGroupEntitiesRepository.find();
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
    let article_group_classify =  await this.ArticleGroupEntitiesRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      article_group_classify
    }
  }

  async create (args) {
    let article_group_classify = new ArticleGroupEntities()
    article_group_classify.name = args.name
    await this.ArticleGroupEntitiesRepository.save(article_group_classify)
    return {
      code: 0,
      msg: 'create successed!',
      article_group_classify
    }
  }

  async update (args) {
    let article_group_classify = await this.ArticleGroupEntitiesRepository.findOne({ id: args.id })
    article_group_classify.name = args.name
    await this.ArticleGroupEntitiesRepository.save(article_group_classify)
    return {
      code: 0,
      msg: 'update successed!',
      article_group_classify
    }
  }

  async delete ( id: number ) {
    let article = await this.ArticleGroupEntitiesRepository.findOne({ id })
    await this.ArticleGroupEntitiesRepository.delete(article)
    return {
      code: 0,
      msg: 'delete successed!',
      article
    }
  }
}