import { Connection } from 'typeorm';
import { MarkEntity } from './mark_entity.entity';

export const articleEmotionProviders = [
  {
    provide: 'ArticleEmotionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(MarkEntity),
    inject: ['DbConnectionToken'],
  },
];