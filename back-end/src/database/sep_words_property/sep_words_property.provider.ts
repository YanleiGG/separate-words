import { Connection } from 'typeorm';
import { SepWordsProperty } from './sep_words_property.entity';

export const sepWordsPropertyProviders = [
  {
    provide: 'SepWordsPropertyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(SepWordsProperty),
    inject: ['DbConnectionToken'],
  },
];