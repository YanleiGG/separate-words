import { Connection } from 'typeorm';
import { ContentLabel } from './contentLabel.entity';

export const contentLabelProviders = [
  {
    provide: 'ContentLabelRepositoryToken',
    useFactory: (connection: Connection) => connection.getRepository(ContentLabel),
    inject: ['DbConnectionToken']
  }
];