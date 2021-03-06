import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MarkEntity } from '../../../database/mark_entity/mark_entity.entity';
import { Article } from '../../../database/article/article.entity'
import { insert } from 'tools/sql';

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
    let article = await this.ArticleRepository.findOne({ 
      where: {id: args.articleId},
      relations: ['mark_entity']
    })
    if(article.mark_entity) return this.update({...args, id: article.mark_entity.id})
    const insertRes = await insert('mark_entity', [
      { key: 'markEntity', value: args.markEntity || '' }
    ])
    let mark_entity = await this.MarkEntityRepository.findOne({ id: insertRes.insertId })
    mark_entity.markEntity = args.markEntity || null
    mark_entity.article = article
    await this.ArticleRepository.save(article)
    await this.MarkEntityRepository.save(mark_entity)
    return {
      code: 0,
      msg: 'create successed!',
      data: mark_entity
    }
  }

  async update (args) {
    let mark_entity = await this.MarkEntityRepository.findOne({ id: args.id })
    mark_entity.markEntity = args.markEntity || null
    await this.MarkEntityRepository.save(mark_entity)
    return {
      code: 0,
      msg: 'update successed!',
      data: mark_entity
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