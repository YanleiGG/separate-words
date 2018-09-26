import { Connection, Repository } from 'typeorm';
import { Role } from './role.entity';

export const roleProviders = [
  {
    provide: 'RoleRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Role),
    inject: ['DbConnectionToken'],
  },
];