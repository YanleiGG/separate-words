import { Connection } from 'typeorm';
import { ArticleGroupWordsProperty } from './article_group_words_property.entity';

export const articleGroupWordsPropertyProviders = [
  {
    provide: 'ArticleGroupWordsPropertyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ArticleGroupWordsProperty),
    inject: ['DbConnectionToken'],
  },
];