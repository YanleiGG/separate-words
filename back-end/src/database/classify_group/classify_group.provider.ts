import { Connection } from 'typeorm';
import { ClassifyGroup } from './classify_group.entity';

export const classifyGroupProviders = [
  {
    provide: 'ClassifyGroupRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ClassifyGroup),
    inject: ['DbConnectionToken'],
  },
];