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
    let emotions =  await this.EmotionRepository.find({
      relations: ['article'],
      skip: offset,
      take: pageSize
    });
    let totalCount = emotions.length
    return {
      code: 0,
      msg: 'find successed!',
      emotions,
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
    let article = await this.ArticleRepository.findOne({ 
      where: {id: args.id},
      relations: ['emotion']
    })
    if(article.emotion) return this.update({...args, id: article.emotion.id})
    let emotion = new Emotion()
    emotion = args.emotion
    emotion.article = article
    await this.ArticleRepository.save(article)  
    await this.EmotionRepository.save(emotion)  // 关系拥有者后创建
    return {
      code: 0,
      msg: 'create successed!',
      data: emotion
    }
  }

  async update (args) {
    let emotion = await this.EmotionRepository.findOne({ id: args.id })
    emotion = args.emotion
    await this.EmotionRepository.save(emotion)
    return {
      code: 0,
      msg: 'update successed!',
      data: emotion
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