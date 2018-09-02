import { Connection } from 'typeorm';
import { Emotion } from './emotion.entity';

export const emotionProviders = [
  {
    provide: 'EmotionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Emotion),
    inject: ['DbConnectionToken'],
  },
];