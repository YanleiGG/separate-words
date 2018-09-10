import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Emotion } from '../../../database/emotion/emotion.entity';
import { Article } from 'database/Article/article.entity';

@Injectable()
export class EmotionService {
  constructor(
    @Inject('EmotionRepositoryToken')
    private readonly EmotionRepository: Repository<Emotion>,
    @Inject('ArticleRepositoryToken')
    private readonly ArticleRepository: Repository<Article>,
  ) {}
  
  async find(offset: number, pageSize: number) {
    let emotions =  await this.EmotionRepository.find({relations: ['article']});
    let totalCount = emotions.length
    let data = emotions.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      emotions: data,
      totalCount
    }
  }

  async findOne (id: number) {
    let emotion =  await this.EmotionRepository.findOne({ id });
    return {
      code: 0,
      msg: 'find successed!',
      emotion
    }
  }

  async create (args) {
    let emotion = new Emotion()
    let article = new Article()
    article.content = args.content
    article.title = args.title
    emotion.perspective = args.perspective || null
    emotion.attitude = args.attitude || null
    emotion.degree = args.degree || null
    emotion.emotion = args.emotion || null
    emotion.article = article
    await this.ArticleRepository.save(article)  
    await this.EmotionRepository.save(emotion)  // 关系拥有者后创建
    return {
      code: 0,
      msg: 'create successed!',
      emotion
    }
  }

  async update (args) {
    let emotion = await this.EmotionRepository.findOne({ id: args.id })
    emotion.perspective = args.perspective || null
    emotion.attitude = args.attitude || null
    emotion.degree = args.degree || null
    emotion.emotion = args.emotion || null
    await this.EmotionRepository.save(emotion)
    return {
      code: 0,
      msg: 'update successed!',
      emotion
    }
  }

  async delete ( id: number ) {
    let emotion = await this.EmotionRepository.findOne({ id })
    await this.EmotionRepository.delete(emotion)
    return {
      code: 0,
      msg: 'delete successed!',
      emotion
    }
  }
}