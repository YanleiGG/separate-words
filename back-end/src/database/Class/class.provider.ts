import { Connection } from 'typeorm';
import { Class } from './class.entity';

export const ClassProviders = [
  {
    provide: 'ClassRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Class),
    inject: ['DbConnectionToken']
  }
];