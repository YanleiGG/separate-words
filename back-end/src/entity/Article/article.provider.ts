import { Connection, Repository } from 'typeorm';
import { Article } from './article.entity';

export const ArticleProviders = [
  {
    provide: 'UserRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Article),
    inject: ['DbConnectionToken'],
  },
];