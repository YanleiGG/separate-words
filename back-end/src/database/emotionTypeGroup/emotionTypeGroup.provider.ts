import { Connection } from 'typeorm';
import { EmotionTypeGroup } from './emotionTypeGroup.entity';

export const emotionTypeGroupProviders = [
  {
    provide: 'EmotionTypeGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(EmotionTypeGroup),
    inject: ['DbConnectionToken']
  }
];