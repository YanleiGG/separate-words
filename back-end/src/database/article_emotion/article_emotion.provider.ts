import { Connection } from 'typeorm';
import { ArticleEmotion } from './article_emotion.entity';

export const ArticleEmotionProviders = [
  {
    provide: 'ArticleEmotionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ArticleEmotion),
    inject: ['DbConnectionToken'],
  },
];