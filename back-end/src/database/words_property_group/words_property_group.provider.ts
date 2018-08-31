import { Connection } from 'typeorm';
import { WordsPropertyGroup } from './words_property_group.entity';

export const wordsPropertyGroupProviders = [
  {
    provide: 'WordsPropertyGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(WordsPropertyGroup),
    inject: ['DbConnectionToken']
  }
];