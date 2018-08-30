import { Connection } from 'typeorm';
import { ArticleGroupEntities } from './article_group_entities.entity';

export const ArticleGroupClassifyProviders = [
  {
    provide: 'ArticleGroupEntitiesRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ArticleGroupEntities),
    inject: ['DbConnectionToken'],
  },
];