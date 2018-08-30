import { Connection } from 'typeorm';
import { ClassifyGroup } from './classify_group.entity';

export const ClassifyGroupProviders = [
  {
    provide: 'ClassifyGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ClassifyGroup),
    inject: ['DbConnectionToken'],
  },
];