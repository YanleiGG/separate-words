import { Connection } from 'typeorm';
import { Classify } from './classify.entity';

export const classifyProviders = [
  {
    provide: 'ClassifyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Classify),
    inject: ['DbConnectionToken'],
  },
];