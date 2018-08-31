import { Connection } from 'typeorm';
import { ArticleEmotion } from './article_emotion.entity';

export const articleEmotionProviders = [
  {
    provide: 'ArticleEmotionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ArticleEmotion),
    inject: ['DbConnectionToken'],
  },
];