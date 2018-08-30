import { Connection } from 'typeorm';
import { Article } from './article.entity';

export const ArticleProviders = [
  {
    provide: 'ArticleRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Article),
    inject: ['DbConnectionToken'],
  },
];