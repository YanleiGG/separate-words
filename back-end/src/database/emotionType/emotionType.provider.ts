import { Connection } from 'typeorm';
import { EmotionType } from './emotionType.entity';

export const emotionTypeProviders = [
  {
    provide: 'EmotionTypeRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(EmotionType),
    inject: ['DbConnectionToken']
  }
];