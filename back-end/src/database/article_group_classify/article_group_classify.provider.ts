import { Connection } from 'typeorm';
import { ArticleGroupClassify } from './article_group_classify.entity';

export const articleGroupClassifyProviders = [
  {
    provide: 'ArticleGroupClassifyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ArticleGroupClassify),
    inject: ['DbConnectionToken'],
  },
];