import { Connection } from 'typeorm';
import { ArticleGroupClassify } from './article_group_classify.entity';

export const ArticleGroupClassifyProviders = [
  {
    provide: 'ArticleGroupClassifyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ArticleGroupClassify),
    inject: ['DbConnectionToken'],
  },
];