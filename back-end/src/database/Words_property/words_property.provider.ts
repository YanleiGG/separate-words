import { Connection } from 'typeorm';
import { WordsProperty } from './words_property.entity';

export const wordsPropertyProviders = [
  {
    provide: 'WordsPropertyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(WordsProperty),
    inject: ['DbConnectionToken']
  }
];