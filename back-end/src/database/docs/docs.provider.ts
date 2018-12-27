import { Connection } from 'typeorm';
import { Docs } from './docs.entity';

export const DocsProviders = [
  {
    provide: 'DocsRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(Docs),
    inject: ['DbConnectionToken']
  }
];