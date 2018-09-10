import { Connection, Repository } from 'typeorm';
import { Task } from './task.entity';

export const taskProviders = [
  {
    provide: 'TaskRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Task),
    inject: ['DbConnectionToken'],
  },
];