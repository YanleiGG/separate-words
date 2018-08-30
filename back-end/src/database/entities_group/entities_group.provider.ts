import { Connection } from 'typeorm';
import { EntitiesGroup } from './entities_group.entity';

export const EntitiesGroupProviders = [
  {
    provide: 'EntitiesGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(EntitiesGroup),
    inject: ['DbConnectionToken'],
  },
];