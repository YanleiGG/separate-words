import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MarkEntity } from '../../../database/mark_entity/mark_entity.entity';
import { Article } from '../../../database/article/article.entity'

@Injectable()
export class MarkEntityService {
  constructor(
    @Inject('MarkEntityRepositoryToken')
    private readonly MarkEntityRepository: Repository<MarkEntity>,
    @Inject('ArticleRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
  ) {}

  async find(offset: number, pageSize: number) {
    let mark_entities =  await this.MarkEntityRepository.find();
    let data = mark_entities.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      mark_entities: data
    }
  }

  async findOne (id: number) {
    let emotion =  await this.MarkEntityRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      emotion
    }
  }

  async create (args) {
    let mark_entity = new MarkEntity()
    let article = new Article()
    article.text = args.text
    article.title = args.title
    mark_entity.markEntity = args.markEntity || null
    mark_entity.article = article
    await this.ArticleRepository.save(article)
    await this.MarkEntityRepository.save(mark_entity)
    return {
      code: 0,
      msg: 'create successed!',
      mark_entity
    }
  }

  async update (args) {
    let mark_entity = await this.MarkEntityRepository.findOne({ id: args.id })
    mark_entity.markEntity = args.markEntity
    await this.MarkEntityRepository.save(mark_entity)
    return {
      code: 0,
      msg: 'update successed!',
      mark_entity
    }
  }

  async delete ( id: number ) {
    let mark_entity = await this.MarkEntityRepository.findOne({ id })
    await this.MarkEntityRepository.delete(mark_entity)
    return {
      code: 0,
      msg: 'delete successed!',
      mark_entity
    }
  }
}