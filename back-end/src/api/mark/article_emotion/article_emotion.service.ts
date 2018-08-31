import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ArticleEmotion } from '../../../database/article_emotion/article_emotion.entity';

@Injectable()
export class ArticleEmotionService {
  constructor(
    @Inject('ArticleEmotionRepositoryToken')
    private readonly ArticleEmotionRepository: Repository<ArticleEmotion>,
  ) {}

  async find(offset: number, pageSize: number) {
    let articleEmotoins =  await this.ArticleEmotionRepository.find();
    let data = articleEmotoins.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      articleEmotoins: data
    }
  }

  async findOne (id: number) {
    let articleEmotoin =  await this.ArticleEmotionRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      articleEmotoin
    }
  }

  async create (args) {
    let articleEmotion = new ArticleEmotion()
    articleEmotion.perspective = args.perspective
    articleEmotion.attitude = args.attitude
    articleEmotion.degree = args.degree
    articleEmotion.emotion = args.emotion
    await this.ArticleEmotionRepository.save(articleEmotion)
    return {
      code: 0,
      msg: 'create successed!',
      articleEmotion
    }
  }

  async update (args) {
    let articleEmotion = await this.ArticleEmotionRepository.findOne({ id: args.id })
    articleEmotion.perspective = args.perspective
    articleEmotion.attitude = args.attitude
    articleEmotion.degree = args.degree
    articleEmotion.emotion = args.emotion
    await this.ArticleEmotionRepository.save(articleEmotion)
    return {
      code: 0,
      msg: 'update successed!',
      articleEmotion
    }
  }

  async delete ( id: number ) {
    let articleEmotion = await this.ArticleEmotionRepository.findOne({ id })
    await this.ArticleEmotionRepository.delete(articleEmotion)
    return {
      code: 0,
      msg: 'delete successed!',
      articleEmotion
    }
  }
}