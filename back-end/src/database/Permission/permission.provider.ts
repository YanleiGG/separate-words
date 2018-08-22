import { Connection, Repository } from 'typeorm';
import { Permission } from './permission.entity';

export const PermissionProviders = [
  {
    provide: 'PermissionRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Permission),
    inject: ['DbConnectionToken'],
  },
];