import { Connection } from 'typeorm';
import { Entities } from './entities.entity';

export const entitiesProviders = [
  {
    provide: 'EntitiesRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Entities),
    inject: ['DbConnectionToken'],
  },
];