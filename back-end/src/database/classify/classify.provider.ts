import { Connection } from 'typeorm';
import { Classify } from './classify.entity';

export const ClassifyProviders = [
  {
    provide: 'ClassifyRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Classify),
    inject: ['DbConnectionToken'],
  },
];