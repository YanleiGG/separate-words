import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Emotion } from '../../../database/emotion/emotion.entity';

@Injectable()
export class EmotionService {
  constructor(
    @Inject('EmotionRepositoryToken')
    private readonly EmotionRepository: Repository<Emotion>,
  ) {}

  async find(offset: number, pageSize: number) {
    let emotions =  await this.EmotionRepository.find();
    let data = emotions.reverse().splice(offset, pageSize)
    return {
      code: 0,
      msg: 'find successed!',
      emotions: data
    }
  }

  async findOne (id: number) {
    let emotion =  await this.EmotionRepository.findOne({ id });
    return {
      code: 0,
      msg: 'update successed!',
      emotion
    }
  }

  async create (args) {
    let emotion = new Emotion()
    emotion.perspective = args.perspective
    emotion.attitude = args.attitude
    emotion.degree = args.degree
    emotion.emotion = args.emotion
    await this.EmotionRepository.save(emotion)
    return {
      code: 0,
      msg: 'create successed!',
      emotion
    }
  }

  async update (args) {
    let emotion = await this.EmotionRepository.findOne({ id: args.id })
    emotion.perspective = args.perspective
    emotion.attitude = args.attitude
    emotion.degree = args.degree
    emotion.emotion = args.emotion
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