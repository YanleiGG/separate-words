import { Connection } from 'typeorm';
import { SepWordsProperty } from './sep_words_property.entity';

export const articleEmotionProviders = [
  {
    provide: 'ArticleEmotionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(SepWordsProperty),
    inject: ['DbConnectionToken'],
  },
];