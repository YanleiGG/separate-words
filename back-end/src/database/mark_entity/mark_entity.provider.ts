import { Connection } from 'typeorm';
import { MarkEntity } from './mark_entity.entity';

export const markEntityProviders = [
  {
    provide: 'MarkEntityRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(MarkEntity),
    inject: ['DbConnectionToken'],
  },
];