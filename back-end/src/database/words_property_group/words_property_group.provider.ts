import { Connection } from 'typeorm';
import { WordsPropertyGroup } from './words_property_group.entity';

export const WordsPropertyGroupProviders = [
  {
    provide: 'WordsPropertyGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(WordsPropertyGroup),
    inject: ['DbConnectionToken']
  }
];