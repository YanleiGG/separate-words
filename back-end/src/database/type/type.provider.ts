import { Connection } from 'typeorm';
import { Type } from './type.entity';

export const typeProviders = [
  {
    provide: 'TypeRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Type),
    inject: ['DbConnectionToken'],
  },
];